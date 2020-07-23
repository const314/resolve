import getHash from '../get-hash'
import setEntry from 'lodash.set'
import unsetEntry from 'lodash.unset'
import getByPath from 'lodash.get'

import {
  QUERY_READMODEL_REQUEST,
  QUERY_READMODEL_SUCCESS,
  QUERY_READMODEL_FAILURE,
  DROP_READMODEL_STATE
} from '../action-types'
import {
  DropReadModelResultAction,
  QueryReadModelFailureAction,
  QueryReadModelRequestAction,
  QueryReadModelSuccessAction
} from './actions'
import {
  ReadModelResultEntry,
  ReadModelResultMapByName,
  ReadModelResultState,
  ReduxState
} from '../types'

export type ReadModelResultEntrySelector = {
  readModelName: string
  resolverName: string
  resolverArgs: any
}

const getSelector = (
  action:
    | QueryReadModelRequestAction
    | QueryReadModelSuccessAction
    | QueryReadModelFailureAction
    | DropReadModelResultAction
): ReadModelResultEntrySelector | string => action.selectorId || action

export const getEntryPath = (
  selector: ReadModelResultEntrySelector | string
): string => {
  if (typeof selector === 'string') {
    return `@@resolve/namedSelectors.${getHash(selector)}`
  }
  const { readModelName, resolverName, resolverArgs } = selector
  return `${getHash(readModelName)}.${getHash(resolverName)}.${getHash(
    resolverArgs
  )}`
}

export const getEntry = (
  state: ReadModelResultMapByName | undefined,
  selector: ReadModelResultEntrySelector | string,
  placeholder?: ReadModelResultEntry
): ReadModelResultEntry =>
  getByPath(state, getEntryPath(selector), placeholder) as ReadModelResultEntry

export const create = (): any => {
  const handlers: { [key: string]: any } = {}

  handlers[QUERY_READMODEL_REQUEST] = (
    state: ReduxState,
    action: QueryReadModelRequestAction
  ): ReduxState =>
    setEntry(
      {
        ...state
      },
      getEntryPath(getSelector(action)),
      {
        state: ReadModelResultState.Requested
      }
    )

  handlers[QUERY_READMODEL_SUCCESS] = (
    state: ReduxState,
    action: QueryReadModelSuccessAction
  ): ReduxState =>
    setEntry(
      {
        ...state
      },
      getEntryPath(getSelector(action)),
      {
        state: ReadModelResultState.Ready,
        data: action.result,
        timestamp: action.timestamp
      }
    )

  handlers[QUERY_READMODEL_FAILURE] = (
    state: ReduxState,
    action: QueryReadModelFailureAction
  ): ReduxState =>
    setEntry(
      {
        ...state
      },
      getEntryPath(getSelector(action)),
      {
        state: ReadModelResultState.Failed,
        data: null,
        error: action.error
      }
    )

  handlers[DROP_READMODEL_STATE] = (
    state: ReduxState,
    action: DropReadModelResultAction
  ): ReduxState => {
    const newState = {
      ...state
    }
    unsetEntry(newState, getEntryPath(getSelector(action)))
    return newState
  }

  return (state: ReduxState = {}, action: any): ReduxState => {
    const eventHandler = handlers[action.type]
    if (eventHandler) {
      return eventHandler(state, action)
    }
    return state
  }
}
