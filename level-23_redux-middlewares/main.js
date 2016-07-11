const { createStore, combineReducers, applyMiddleware } = Redux;
const { TodoApp, reducers } = window.App;

const thunkMiddleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
};

const composedReducer = combineReducers(reducers);
const store = createStore(
  composedReducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);
