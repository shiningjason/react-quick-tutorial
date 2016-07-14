# Level 16. 完成 Controller View：讓元件同步資料狀態

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 16 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：讓 TodoApp 同步 TodoStore 中的待辦資料，並讓所有使用者操作調用 TodoActions
2. 習得心法：
  1. [Flux] 了解 View 是什麼，以及它的職責是什麼


## :triangular_flag_on_post: 主線任務

### 1. 了解這一關卡要實作的 View 是什麼

> :bowtie:：建議你先閱讀 [秘笈 - 深入淺出 Flux](https://medium.com/p/44a48c320e11) 或是 [學習筆記 1]，再進行下去～！

### 2. 修改 components/TodoApp.js

接下來，我們要讓 View 接上 TodoStore，因此從原本放待辦資料的 TodoApp 下手；我們要讓該元件實作：

1. 向 TodoStore 註冊及註銷資料改變的傾聽器
2. 當 TodoStore 的資料更新，便將待辦資料同步在自身的 state 中
3. 將所有改變資料的動作都改為調用 TodoActions

```js
const {
  // 1. 引入 TodoActions 和 TodoStore
  TodoActions,
  TodoStore,
  ...
} = window.App;

// 2. 在上一個關卡中，我們已經把下面這些業務邏輯複製到 TodoStore 中放置，
//    所以這些程式可以從 TodoApp 中移掉
const _createTodo = ...
const _updateTodo = ...
const _toggleTodo = ...
const _deleteTodo = ...

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // 3. 初始資料改為從 TodoStore 中拿取
      todos: TodoStore.getAll()
    };
  }

  componentDidMount() {
    // 4. 向 Server 請求資料改為調用 TodoActions
    TodoActions.loadTodos();
    // 5. 向 TodoStore 註冊監聽器：
    //    當監聽器被觸發，便讓 state 與 TodoStore 資料同步
    this._removeChangeListener = TodoStore.addChangeListener(
      () => this.setState({ todos: TodoStore.getAll() })
    );
  }

  componentWillUnmount() {
    // 6. 向 TodoStore 註銷監聽器
    this._removeChangeListener();
  }

  // 7. 所有渲染的資料從 state 中取，這份 state 與 TodoStore 是同步的；
  //    所有改變資料的操作都改為調用 TodoActions
  render() {
    const { todos } = this.state;
    return (
      <div>
        <TodoHeader
          title="我的待辦清單"
          username="Jason"
          todoCount={todos.filter((todo) => !todo.completed).length}
        />
        <InputField
          placeholder="新增待辦清單"
          onSubmitEditing={TodoActions.createTodo}
        />
        <TodoList
          todos={todos}
          onUpdateTodo={TodoActions.updateTodo}
          onToggleTodo={TodoActions.toggleTodo}
          onDeleteTodo={TodoActions.deleteTodo}
        />
      </div>
    );
  }
};

window.App.TodoApp = TodoApp;
```

> :bowtie:：像 TodoApp 與 Store 同步資料的 View，我們稱 Controller View；而 TodoList, TodoHeader 等 View 只單純的負責接收父元件傳遞的 props，並將它們顯示出來！


## :book: 學習筆記

### 1. [Flux] 了解 View 是什麼，以及它的職責是什麼

###### a. 還記得 View 是什麼嗎？

View 根據資料渲染 UI 和傾聽使用者的操作事件。

###### b. 還記得 View 的職責是什麼嗎？

在實務中，View 可以再區分為兩個角色 Controller View 和 View：

1. Controller View 負責與 Store 同步資料，並將資料傳遞給 View
2. View 負責渲染 UI

而所有改變資料的動作都必須調用 Actions。


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-15_flux-stores) ｜ [下一關. 引進 Container Pattern：必學的設計模式](../level-17_container-pattern) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-16_flux-controller-view?pixel)
