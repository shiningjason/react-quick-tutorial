const {
  ActionTypes,
  AppDispatcher
} = window.App;

window.App.TodoActions = {
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

window.App.TodoReduxActions = {
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
