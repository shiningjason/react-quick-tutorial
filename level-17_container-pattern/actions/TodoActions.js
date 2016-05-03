const {
  ActionTypes,
  AppDispatcher
} = window.App;

window.App.TodoActions = {
  loadTodos() {
    fetch('./todos.json')
      .then((response) => response.json())
      .then((todos) => AppDispatcher.dispatch({
        type: ActionTypes.LOAD_TODOS_SUCCESS,
        todos
      }));
  },
  createTodo(title) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_TODO,
      title
    });
  },
  updateTodo(id, title) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TODO,
      id,
      title
    });
  },
  toggleTodo(id, completed) {
    AppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_TODO,
      id,
      completed
    });
  },
  deleteTodo(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_TODO,
      id
    });
  }
};
