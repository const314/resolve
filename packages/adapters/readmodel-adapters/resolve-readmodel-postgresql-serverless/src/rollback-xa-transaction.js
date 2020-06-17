import debugLevels from 'resolve-debug-levels'
import { XaTransactionNotFoundError } from 'resolve-readmodel-base'

const log = debugLevels(
  'resolve:resolve-readmodel-postgresql-serverless:rollback-xa-transaction'
)

const rollbackXATransaction = async (
  pool,
  readModelName,
  { xaTransactionId }
) => {
  try {
    log.verbose('Rollback XA-transaction to postgresql database started')
    await pool.rdsDataService.rollbackTransaction({
      resourceArn: pool.dbClusterOrInstanceArn,
      secretArn: pool.awsSecretStoreArn,
      transactionId: xaTransactionId
    })

    log.verbose('Rollback XA-transaction to postgresql database succeed')
  } catch (error) {
    if (error != null && /Transaction .*? Is Not Found/i.test(error.message)) {
      try {
        const xaResult = await pool.rdsDataService.executeStatement({
          resourceArn: pool.dbClusterOrInstanceArn,
          secretArn: pool.awsSecretStoreArn,
          database: 'postgres',
          continueAfterTimeout: false,
          includeResultMetadata: false,
          sql: `
            WITH "cte" AS (
              DELETE FROM ${pool.escapeId(pool.schemaName)}.${pool.escapeId(
            `__${pool.schemaName}__XA__`
          )}
              WHERE "timestamp" < CAST(extract(epoch from clock_timestamp()) * 1000 AS BIGINT) - 86400000
            )
            SELECT 'ok' AS "ok"
            FROM ${pool.escapeId(pool.schemaName)}.${pool.escapeId(
            `__${pool.schemaName}__XA__`
          )}
            WHERE "xa_key" = ${pool.escape(
              pool.hash512(`${xaTransactionId}${readModelName}`)
            )}
          `
        })
        if (xaResult[0].ok === 'ok') {
          throw new Error('Re-throwing')
        }

        log.verbose('Rollback XA-transaction to postgresql database succeed')
      } catch (err) {
        log.verbose(
          'Rollback XA-transaction to postgresql database failed',
          error
        )
        throw new XaTransactionNotFoundError(xaTransactionId)
      }
    }

    log.verbose('Rollback XA-transaction to postgresql database failed', error)
    throw error
  }
}

export default rollbackXATransaction
