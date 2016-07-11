const { ActionTypes } = window.App;

window.App.TodoActions = {
  loadTodos() {
    return (dispatch) => {
      fetch('./todos.json')
        .then((response) => response.json())
        .then((todos) => dispatch({
          type: ActionTypes.LOAD_TODOS_SUCCESS,
          todos
        }));
    };
  },
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
