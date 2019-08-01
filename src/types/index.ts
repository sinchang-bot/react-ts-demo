export interface ITodoForm {
  userId?: string
  todoId?: string
}

export interface ITodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface ITodoState {
  todoList: ITodoListItem[]
  todoForm: ITodoForm
}