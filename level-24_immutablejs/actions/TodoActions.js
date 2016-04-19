const { ActionTypes } = window.App;

window.App.TodoActions = {
  createTodo(title) {
    return {
      type: ActionTypes.CREATE_TODO,
      title
    };
  },
  updateTodo(id, title) {
    return {
      type: ActionTypes.UPDATE_TODO,
      id,
      title
    };
  },
  toggleTodo(id, completed) {
    return {
      type: ActionTypes.TOGGLE_TODO,
      id,
      completed
    };
  },
  deleteTodo(id) {
    return {
      type: ActionTypes.DELETE_TODO,
      id
    };
  }
};
