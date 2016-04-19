const {
  ActionTypes,
  AppDispatcher
} = window.App;

const CHANGE_EVENT = 'CHANGE';

const _emitter = new EventEmitter();

const _todos = [
  {
    id: 0,
    title: 'Item 1',
    completed: false
  },
  {
    id: 1,
    title: 'Item 2',
    completed: false
  },
  {
    id: 2,
    title: 'Item 3',
    completed: false
  }
];

const _createTodo = (todos, title) => {
  todos.push({
    id: todos[todos.length - 1].id + 1,
    title,
    completed: false
  });
  return todos;
};

const _updateTodo = (todos, id, title) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.title = title;
  return todos;
};

const _toggleTodo = (todos, id, completed) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.completed = completed;
  return todos;
};

const _deleteTodo = (todos, id) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx !== -1) todos.splice(idx, 1);
  return todos;
};

window.App.TodoStore = {
  getAll() {
    return _todos;
  },
  addChangeListener(callback) {
    _emitter.on(CHANGE_EVENT, callback);
    return () => _emitter.removeListener(CHANGE_EVENT, callback);
  },
  dispatchToken: AppDispatcher.register((action) => {
    switch (action.type) {
      case ActionTypes.CREATE_TODO:
        _createTodo(_todos, action.title);
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.UPDATE_TODO:
        _updateTodo(_todos, action.id, action.title);
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.TOGGLE_TODO:
        _toggleTodo(_todos, action.id, action.completed);
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.DELETE_TODO:
        _deleteTodo(_todos, action.id);
        _emitter.emit(CHANGE_EVENT);
        break;
    }
  })
};
