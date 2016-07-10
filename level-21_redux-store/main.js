const { createStore, combineReducers } = Redux;
const { TodoApp, reducers } = window.App;

const composedReducer = combineReducers(reducers);
const store = createStore(composedReducer);

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);
