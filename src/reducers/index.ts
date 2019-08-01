import { createAction, createReducer, Reducer } from 'react-act'
import { produce } from 'immer'
import { ITodoForm, ITodoState } from '../types/index'

const defaultTodoForm = (): ITodoForm => {
  return {
    userId: '',
    todoId: ''
  }
}

const defaultTodoList = () => []

const defaultTodoState = (): ITodoState => {
  return {
    todoList: defaultTodoList(),
    todoForm: defaultTodoForm()
  }
}

export const todoListAction = {
  Fetch: {
    Start: createAction(
      '[Todo][ListAction][Fetch][Start]'
      // (payload: Partial<IGetAttributeListPayload>) => payload
    ),
    Done: createAction(
      '[Todo][ListAction][Fetch][Done]'
      // (response: IAttributeListResponse) => response
    ),
    Error: createAction('[Todo][ListAction][Fetch][Error]')
  },
  HandleUserIdChange: createAction(
    '[Todo][ListAction][HandleUserIdChange]',
    (userId: string) => userId
  ),
  HandleTodoIdChange: createAction(
    '[Todo][ListAction][HandleTodoIdChange]',
    (todoId: string) => todoId
  )
}

export const todoState: ITodoState = defaultTodoState()

export const todoReducer: Reducer<ITodoState> = createReducer({
  [todoListAction.Fetch.Start.getType()]: state =>
    produce<ITodoState>(state, draft => {
      draft.todoList = []
    }),
  [todoListAction.Fetch.Done.getType()]: (state, payload) => // todo: payload type
    produce<ITodoState>(state, draft => {
      draft.todoList = payload
    }),
  [todoListAction.HandleUserIdChange.getType()]: (state, payload: string) =>
    produce<ITodoState>(state, draft => {
      draft.todoForm.userId = payload
    }),
  [todoListAction.HandleTodoIdChange.getType()]: (state, payload: string) =>
    produce<ITodoState>(state, draft => {
      draft.todoForm.todoId = payload
    }),
  todoState
})
