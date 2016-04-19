const { createStore, combineReducers } = Redux;
const { Provider } = ReactRedux;
const { TodoApp, reducers } = window.App;

const composedReducer = combineReducers(reducers);
const store = createStore(composedReducer);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
