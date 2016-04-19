const { List, Record } = Immutable;

const { ActionTypes } = window.App;

const TodoRecord = Record({
  id: undefined,
  title: undefined,
  completed: false
});

const DEFAULT_TODOS = List.of(
  new TodoRecord({ id: 0, title: 'Item 1' }),
  new TodoRecord({ id: 1, title: 'Item 2' }),
  new TodoRecord({ id: 2, title: 'Item 3' })
);

const _findIdxById = (todos, id) => todos.findIndex((todo) => todo.id === id);

const _createTodo = (todos, title) =>
  todos.push(new TodoRecord({
    id: todos.last().id + 1,
    title,
    completed: false
  }));

const _updateTodo = (todos, id, title) =>
  todos.setIn([ _findIdxById(todos, id), 'title' ], title);

const _toggleTodo = (todos, id, completed) =>
  todos.setIn([ _findIdxById(todos, id), 'completed' ], completed);

const _deleteTodo = (todos, id) =>
  todos.delete(_findIdxById(todos, id));

window.App.reducers.todos = (state = DEFAULT_TODOS, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_TODO:
      return _createTodo(state, action.title);
    case ActionTypes.UPDATE_TODO:
      return _updateTodo(state, action.id, action.title);
    case ActionTypes.TOGGLE_TODO:
      return _toggleTodo(state, action.id, action.completed);
    case ActionTypes.DELETE_TODO:
      return _deleteTodo(state, action.id);
    default:
      return state;
  }
};
