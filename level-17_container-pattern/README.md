# Level 17. 引進 Container Pattern：必學的設計模式

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 17 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：使用 Container Pattern 重構 TodoApp
2. 習得心法：
  1. [React Pattern] 了解 Container components 的用意和使用時機


## :triangular_flag_on_post: 主線任務

### 1. 了解這個關卡的目標

> :bowtie:：這個關卡我們將使用常見的、且我私心認為大家不可不知的 Container Pattern 重構我們的 TodoApp！***強烈建議你可以先跳到 [學習筆記 1] 快速瞭解 Container components 是什麼***～！

### 2. 了解我們要怎麼使用 Container Pattern 重構 TodoApp

在我們加入 Flux 後，與 Store 及 Action 溝通的元件是 TodoApp，因此我們可以把溝通邏輯拉成一支 TodoAppContainer，如 [學習筆記 1] 中的範例。

```
原本的元件結構圖：

TodoApp              // 負責兩件事情：與 Store 及 Action 溝通、UI 排版
├── TodoHeader       // 負責 UI 排版
├── InputField       // 負責 UI 排版
└── TodoList         // 負責 UI 排版
    └── TodoItem * N // 負責 UI 排版

加入 Container Pattern 後的元件結構圖：

TodoAppContainer         // 負責與 Store 及 Action 溝通
└── TodoApp              // 負責 UI 排版
    ├── TodoHeader       // 負責 UI 排版
    ├── InputField       // 負責 UI 排版
    └── TodoList         // 負責 UI 排版
        └── TodoItem * N // 負責 UI 排版
```

不過，我們還有另外一種方式使用 Container Pattern：

```
TodoApp                      // 負責 UI 排版
├── TodoHeaderContainer      // 負責與 Store 及 Action 溝通
│   └── TodoHeader           // 負責 UI 排版
├── CreateTodoFieldContainer // 負責與 Store 及 Action 溝通
│   └── InputField           // 負責 UI 排版
└── TodoListContainer        // 負責與 Store 及 Action 溝通
    └── TodoList             // 負責 UI 排版
        └── TodoItem * N     // 負責 UI 排版
```

> :bowtie:：上面兩種方式皆是可以的；在這個教學中，我會使用第二個，儘管第一種方式似乎比較恰當，至於如何選擇，請見 [學習筆記 1] 的使用時機！

### 3. 實作 Container Components

###### a. 加入 TodoHeaderContainer

```js
class TodoHeaderContainer extends Component {
  constructor(props, context) { /* 1. 向 TodoStore 取得初始資料，並同步到 state 中 */ }

  componentDidMount() { /* 2. 向 TodoStore 註冊監聽器 */ }

  componentWillUnmount() { /* 3. 向 TodoStore 註銷監聽器 */ }

  render() {
    return (
      <TodoHeader
        title="我的待辦清單"
        username="Jason"
        todoCount={this.state.todos.filter((todo) => !todo.completed).length}
      />
    );
  }
}
```

###### b. 加入 CreateTodoFieldContainer

```js
class CreateTodoFieldContainer extends Component {
  render() {
    return (
      <InputField
        placeholder="新增待辦清單"
        onSubmitEditing={TodoActions.createTodo} // 1. 調用 TodoActions
      />
    );
  }
}
```

###### c. 加入 TodoListContainer

```js
class TodoListContainer extends React.Component {
  constructor(props, context) { /* 1. 向 TodoStore 取得初始資料，並同步到 state 中 */ }

  componentDidMount() { /* 2. 向 TodoStore 註冊監聽器 */ }

  componentWillUnmount() { /* 3. 向 TodoStore 註銷監聽器 */ }

  render() {
    return (
      <TodoList
        todos={this.state.todos}
        onUpdateTodo={TodoActions.updateTodo}
        onToggleTodo={TodoActions.toggleTodo}
        onDeleteTodo={TodoActions.deleteTodo}
      />
    );
  }
}
```

###### d. 修改 TodoApp

```js
class TodoApp extends React.Component {
  componentDidMount() {
    TodoActions.loadTodos();
  }

  render() {
    return (
      <div>
        <TodoHeaderContainer />
        <CreateTodoFieldContainer />
        <TodoListContainer />
      </div>
    );
  }
}
```

> :bowtie:：我們是否讓 TodoApp 更一目了然了？


## :book: 學習筆記

### 1. [React Pattern] 了解 Container components 的用意和使用時機

###### a. Show me the code!

原本的 TodoApp：

```js
class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: TodoStore.getAll()
    };
  }

  componentDidMount() {
    TodoActions.loadTodos();
    this._removeChangeListener = TodoStore.addChangeListener(
      () => this.setState({ todos: TodoStore.getAll() })
    );
  }

  componentWillUnmount() {
    this._removeChangeListener();
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
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
}
```

加入 TodoAppContainer 重構後：

```js
/* TodoAppContainer */
class TodoAppContainer extends Component {
  constructor() {
    super();
    this.state = {
      todos: TodoStore.getAll()
    };
  }

  componentDidMount() {
    TodoActions.loadTodos();
    this._removeChangeListener = TodoStore.addChangeListener(
      () => this.setState({ todos: TodoStore.getAll() })
    );
  }

  componentWillUnmount() {
    this._removeChangeListener();
  }

  render() {
    return (
      <TodoApp
        todos={todos}
        onCreateTodo={TodoActions.createTodo}
        onUpdateTodo={TodoActions.updateTodo}
        onToggleTodo={TodoActions.toggleTodo}
        onDeleteTodo={TodoActions.deleteTodo}
      />
    );
  }
}

/* TodoApp */
class TodoApp extends Component {
  render() {
    const {
      todos,
      onCreateTodo,
      onUpdateTodo,
      onToggleTodo,
      onDeleteTodo
    } = this.props;
    return (
      <div>
        <InputField
          placeholder="新增待辦清單"
          onSubmitEditing={onCreateTodo}
        />
        <TodoList
          todos={todos}
          onUpdateTodo={onUpdateTodo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      </div>
    );
  }
}
```

###### b. 你發現差別了嗎？

原本的 TodoApp 包含了「***與 Store 及 Action 溝通的邏輯***」和「***UI 排版的邏輯***」；當我們加入 TodoAppContainer 後，我們讓它負責與 Store 及 Action 溝通，並透過 props 將資料及事件處理函數遞給 TodoApp，因此 TodoApp 只需要顧慮 UI 的設計排版，和使用者操作時該觸發哪些事件即可。

###### c. 好處是什麼？我們為什麼要這樣做？

1. 這讓 TodoApp 元件只需要負責一件事情，就是 UI；讓 TodoAppContainer 分擔其中一件事情，也就是與資料的互動（改變資料、取得資料），這讓我們的應用符合「關注點分離 (Separation of concerns)」及「單一職責 (Single Responsibility)」原則。好處是***幫助你一次只關注一件事情，可以更有條理的維護專案***！
2. 舉個情境來說：如果往後你將從 Flux 替換為 [Redux](https://github.com/reactjs/redux) 或 [Relay](https://facebook.github.io/relay/)，也就是與資料互動的方式，你只需要替換 TodoAppContainer 中的邏輯，而不用擔心是否會影響 TodoApp 的排版邏輯；如果你是要改變 UI 排版，你也只需要打開 TodoApp 這支程式，不用顧慮資料背後的運作原理。

###### d. 使用時機

你可以將任何元件使用 Container component 包起來，見下方情境：

```
// 1. 尚未加入 Container Pattern 時：
//    可以看到 UserAvatar 需要使用 User 的資料，
//    因此我們必須從 App->MoviesPage->Navbar->UserAvatar 傳下來；
//    且 App 同時間與許多 Store 和 Action 溝通，
//    當業務一多，你將會迷失在 props 的傳遞中。

App                       // 需要與不同業務的 Store 和 Action 溝通，如：UserStore, MovieStore, MusicStore, UserActions, MovieActions...
├── ...
├── MoviesPage            // 需要 Movie 和 User 資料
│   ├── Navbar            // 需要 User 資料
│   │   └── UserAvatar    // 需要 User 資料
│   └── MovieList         // 需要 Movie 資料
├── ...
├── MusicsPage            // 需要 Music 和 User 資料
│   ├── Navbar            // 需要 User 資料
│   │   └── UserAvatar    // 需要 User 資料
│   └── MusicList         // 需要 Music 資料
└── ...

// 2. 加入 Container Pattern 後：
//    針對不同業務資料的 Page，我們加上了 Container；
//    針對 Navbar 加上 Container，
//    這讓與 UserStore 溝通的 NavbarContainer，
//    可以共用在每個 Page 中。

App
├── ...
├── MoviesPageContainer        // 與 MovieStore, MovieAction 溝通
│   └── MoviesPage             // 需要 Movie 資料
│       ├── NavbarContainer    // 與 UserStore, UserAction 溝通
│       │   └── Navbar         // 需要 User 資料
│       │       └── UserAvatar // 需要 User 資料
│       └── MovieList          // 需要 Movie 資料
├── ...
├── MusicsPageContainer
│   └── MusicsPage
│       ├── NavbarContainer
│       │   └── Navbar
│       │       └── UserAvatar
│       └── MusicList
└── ...
```

Container components 讓你可以不用將業務資料使用 props 一路往下傳，這也讓封裝了與某個業務資料掛鉤的元件可以重複利用（如：NavbarContainer）。

***不過請謹慎的使用這個模式***，在上面這個例子中，Container component 也可以加在 UserAvatar 上，但是為什麼我最後選擇 Navbar 呢？因為考量到 Navbar 會有更多 User 的業務資料及操作，如：升級帳戶、登出、使用者名稱等；而 UserAvatar 會重複使用在更多情境，如：發文及評論者的頭像等，資料來源可能來自於其他業務資料中，我們必須讓它只是簡單的接收資料然後顯示。

***所以，Container component 的使用時機是什麼？***沒有正確的答案，謹記它帶給你的好處：將「UI 排版」和「與資料溝通」的邏輯分開、降低「與多個資料溝通」和「傳遞多層參數」產生的複雜性；你可以根據上面兩個原則評估使用它。

###### e. 參考連結

1. [Container Components](https://medium.com/p/c0e67432e005)
2. [Presentational and Container Components](https://medium.com/p/7ca2f9a7c7d0)


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-16_flux-controller-view) ｜ [下一關. 使用 Flux 提供的 Utils](../level-18_flux-utils) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-17_container-pattern?pixel)
