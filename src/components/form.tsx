import * as React from 'react'
import { todoForm } from '../types/index'

interface todoFormProps {
  form: todoForm
  handleChangeValue: (name: string, value: string) => void
}

export default class TodoForm extends React.Component<todoFormProps> {
  render() {
    const { userId, todoId } = this.props.form
    const handleChangeValue = this.props.handleChangeValue
    return (
      <React.Fragment>
        <form className="form-inline">
          <div className="form-group mb-2">
            <label className="sr-only">UserId</label>
            <input 
              type="text" 
              className="form-control" 
              value={userId}
              onChange={e => handleChangeValue('userId', e.target.value)}
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label className="sr-only">TodoId</label>
            <input 
              type="text" 
              className="form-control" 
              value={todoId}
              onChange={e => handleChangeValue('todoId', e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Search</button>
        </form>
      </React.Fragment>
    )
  }
}