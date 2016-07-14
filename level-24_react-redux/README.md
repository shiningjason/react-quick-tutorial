# Level 24. 讓 React 應用連結 Redux 系統

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 24 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：加入 react-redux，讓 TodoApp 與 Redux 的狀態容器互動
2. 獲得新技能：
  1. [Redux] 了解 react-redux 的使用方法
  2. [React Pattern] 了解 Higher-order Component 的用意和使用時機


## :triangular_flag_on_post: 主線任務

### 1. 引入 react-redux

從 cdnjs 中，複製 [react-redux](https://cdnjs.com/libraries/react-redux) 最新版本的連結，並貼到 index.html 中。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.4.5/react-redux.js"></script>
```

### 2. 使用 Provider 元件

react-redux 提供 Provider 元件，讓 TodoApp 及其子元件可以連接 Store：

```js
/** main.js */

const { Provider } = ReactRedux;

// ...

// 使用 Provider 元件包覆 TodoApp，並傳遞 store 實例進去
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
```

### 3. 使用 connect()

react-redux 提供 connect()，讓 Container 元件可以從 Redux 的狀態容器取得資料，並讓元件可以調用 dispatch 將 action 傳遞到 Store 中；所以，我們修改所有 Container 元件：

```js
/** CreateTodoFieldContainer.js */

// 1. 從 ReactRedux 中引用 connect
const { connect } = ReactRedux;

class CreateTodoFieldContainer extends React.Component {
  render() {
    return (
      <InputField
        placeholder="新增待辦清單"
        // 2. createTodo 函數改由父元件來
        onSubmitEditing={this.props.createTodo}
      />
    );
  }
}

// 3. 使用 connect() 回傳的函數讓 Container 轉成另外一新元件（見學習筆記 1），而 connect() 的：
//    第一個參數是 mapStateToProps，這裡不需要從 Store 中取資料所以給 undefined。
//    第二個參數是 mapDispatchToProps，可以直接給 Action Creator 函數名稱，並定義鍵值為 props 的屬性名稱；
//    它會幫你將 createTodo 轉成 (...args) => store.dispatch(createTodo(...args))，
//    讓你調用該函數同時做兩件事，調用 Action Creator 和 dispatch action 物件。
window.App.CreateTodoFieldContainer = connect(undefined, {
  createTodo: TodoActions.createTodo
})(CreateTodoFieldContainer);

/** TodoApp.js */
// 4. 讓 TodoApp 連結 Store

class TodoApp extends React.Component {
  componentDidMount() {
    this.props.loadTodos();
  }
  // ...
}

window.App.TodoApp = connect(undefined, {
  loadTodos: TodoActions.loadTodos
})(TodoApp);

/** TodoHeaderContainer */
// 5. 讓 TodoHeaderContainer 連結 Store

class TodoHeaderContainer extends React.Component {
  render() {
    return (
      <TodoHeader
        ...
        todoCount={this.props.todos.filter((todo) => !todo.completed).length}
      />
    );
  }
}

window.App.TodoHeaderContainer = connect(
  (state) => ({ todos: state.todos })
)(TodoHeaderContainer);

/** TodoListContainer.js */
// 6. 讓 TodoListContainer 連結 Store

class TodoListContainer extends React.Component {
  render() {
    const {
      todos,
      updateTodo,
      toggleTodo,
      deleteTodo
    } = this.props;
    return (
      <TodoList
        todos={todos}
        onUpdateTodo={updateTodo}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    );
  }
}

window.App.TodoListContainer = connect(
  (state) => ({ todos: state.todos }),
  {
    updateTodo: TodoActions.updateTodo,
    toggleTodo: TodoActions.toggleTodo,
    deleteTodo: TodoActions.deleteTodo
  }
)(TodoListContainer);
```

### 4. 重構程式

將 Flux 的 code 刪除：

1. ./actions/TodoActions.js 中 Flux 的 TodoActions 替代成 Redux 的
2. 將 ./dispatcher 移除
3. 將 ./stores 移除
4. 修改 index.html 的連結


## :book: 閱讀筆記

### 1. [Redux] 了解 react-redux 的使用方法

react-redux 提供兩個 API：

###### 1. Provider 的使用方法

```js
<Provider store={store}>
  <App />
</Provider>
```

###### 2. connect 的使用方法

```js
const mapStateToProps = (state) => ({ todos: state.todos });

// mapDispatchToProps 有兩種方法：
// 1. 函數形式：
const mapDispatchToProps = (dispatch) => ({
  create: (...args) => dispatch(Actions.create(...args))
});
// 2. 物件形式：
const mapDispatchToProps = { create: Actions.create };

const Component = connect(mapStateToProps, mapDispatchToProps)(Component);
```

PS. connect() 回傳的函數是一個 Higher-order Component，見學習筆記 2。

###### 參考連結

- [react-redux API](https://github.com/reactjs/react-redux/blob/master/docs/api.md)

### 2. [React Pattern] 了解 Higher-order Component 的用意和使用時機

***HOC 是一個函數，接收一個已存在的元件為參數，然後返回一個包覆該元件的新元件。***

###### 以程式看

```js
const hoc = (component) => component'
```

###### 使用時機

1. 當你需要加強該元件的功能，但是這功能也會出現在其他元件中，因此程式需要重複使用時
2. 當你需要改變原本元件渲染的邏輯時
3. 當你需要維護資料狀態，卻不想污染該元件時
4. 當你需要處理上層元件傳遞的參數，再往該元件傳遞時

###### 參考連結

- [Higher-order Components | gist](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775)
- [Mixins Are Dead. Long Live Composition | Medium](https://medium.com/p/94a0d2f9e750)
- [React Higher Order Components in depth | Medium](https://medium.com/p/cf9032ee6c3e)


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-23_redux-middlewares) ｜ [下一關. 整合 ImmutableJS](../level-25_immutablejs) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-24_react-redux?pixel)
