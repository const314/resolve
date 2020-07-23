import React, { useEffect } from 'react'
import { Button, ControlLabel, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useReduxCommand, useReduxReadModel } from 'resolve-redux'
import { useSelector } from 'react-redux'

export default () => {
  const { request: getLists, selector: myLists } = useReduxReadModel(
    {
      name: 'ShoppingLists',
      resolver: 'all',
      args: {}
    },
    {
      selectorId: 'all-user-lists'
    }
  )
  const { execute: removeShoppingList } = useReduxCommand(({ id }) => ({
    aggregateName: 'ShoppingList',
    type: 'renameShoppingList',
    aggregateId: id,
    payload: {}
  }))
  const item = useSelector(myLists) || { data: [] }
  const lists = item.data || []

  useEffect(() => {
    getLists()
  }, [])

  return (
    <div>
      <ControlLabel>My shopping lists</ControlLabel>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Shopping List</th>
            <th className="example-table-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(({ id, name }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/${id}`}>{name}</Link>
              </td>
              <td className="example-table-action">
                <Button
                  onClick={() => {
                    removeShoppingList({ id })
                  }}
                >
                  <i className="far fa-trash-alt" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
