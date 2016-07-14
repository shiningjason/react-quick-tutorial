# Level 10. 使用 React 表單元件

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 10 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：完成剩餘功能（切換處理狀態、新增項目、編輯項目）
2. 獲得新技能：
  1. [React] 如何使用表單元件
  2. [React] 如何使用「可控元件」、「不可控元件」
3. 習得心法：
  1. 了解控制元件和非控制元件的差別
  2. 了解什麼時機該用控制元件


## :triangular_flag_on_post: 主線任務

### 1. 完成「切換處理狀態」功能

```js
/* TodoItem.js */
// 1. 當切換狀態的選擇框被點選，觸發上層元件 (TodoList) 傳遞的 onToggle callback
renderViewMode() {
  const { onToggle } = this.props;
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle && onToggle(!completed)}
      />
      <!-- ... -->
    </div>
  );
}

// 2. 完成 onToggle 的 propTypes or defaultProps

/* TodoList.js */
// 3. 當待辦狀態被切換，觸發上層元件 (TodoApp) 傳遞的 onToggleTodo callback
render() {
  const { onToggleTodo } = this.props;
  const todoElements = todos.map((todo) => (
    <li key={todo.id}>
      <TodoItem ... onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed)} />
    </li>
  ));
  return <ul>{todoElements}</ul>;
}

// 4. 完成 onToggleTodo 的 propTypes or defaultProps

/* TodoApp.js */
class TodoApp extends React.Component {

  // ...

  render() {
    const { todos } = this.state;
    return (
      <div>
        <TodoList ...
          // 5. 呼叫 _toggleTodo，更新 todos 狀態
          onToggleTodo={
            (id, completed) => this.setState({
              todos: _toggleTodo(todos, id, completed)
            })
          }
        />
      </div>
    );
  }
}

// 6. 將切換邏輯抽成一個 function
const _toggleTodo = (todos, id, completed) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.completed = completed;
  return todos;
};
```

### 3. 完成「新增項目」功能

###### 1. 修改 InputField 元件

為了讓使用者在 InputField 輸入完項目標題，按下 enter 後：

1. 上層元件可以取得使用者的輸入資料，用來更新 todos 狀態
2. 清空輸入框

```js
class InputField extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // 1. 傾聽使用者 keydown 事件：
  //    當使用者按下 enter (keyCode = 13) 後，
  //    呼叫上層傳遞的 onSubmitEditing callback，
  //    將資料傳遞給上層元件。
  handleKeyDown(e) {
    const {
      onKeyDown,
      onSubmitEditing
    } = this.props;
    const { value } = e.target;
    switch (e.keyCode) {
      case 13:
        // 2. 如果使用者沒有鍵入任何值（包括都是空白），則不會呼叫 callback
        if (value.trim()) {
          onSubmitEditing && onSubmitEditing(value);
        }
        // 3. 將輸入框資料清空
        e.target.value = '';
        break;
    }
    // 4. 如果上層元件傳遞 onKeyDown callback，我們必須觸發它
    onKeyDown && onKeyDown(e);
  }

  render() {
    return (
      <input
        {...this.props}
        type="text"
        // 5. 傾聽 input 的 onKeyDown 事件
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

// 6. 完成 onSubmitEditing 的 propTypes
InputField.propTypes = {
  onSubmitEditing: React.PropTypes.func
};
```

###### 2. 修改 TodoApp 元件

```js
class TodoApp extends React.Component {

  // ...

  render() {
    const { todos } = this.state;
    return (
      <div>
        // 1. 呼叫 _createTodo，更新 todos 狀態
        <InputField
          placeholder="新增待辦清單"
          onSubmitEditing={
            (title) => this.setState({
              todos: _createTodo(todos, title)
            })
          }
        />
      </div>
    );
  }
}

// 2. 將新增邏輯抽成一個 function
const _createTodo = (todos, title) => {
  todos.push({
    id: todos[todos.length - 1].id + 1,
    title,
    completed: false
  });
  return todos;
};
```

### 4. 完成「編輯項目」功能

###### 1. 修改 InputField 和 TodoItem 元件

如果你現在將 TodoItem 切換為編輯模式，我想你會在 console 中看到「*Warning: Failed form propType: You provided a `value` prop to a form field without an `onChange` handler...*」。

有兩種方法可以修正：

方法 1. 使用「不可控元件」：

```js
/* TodoItem.js */

renderEditMode() {
  const { title, onUpdate } = this.props;
  return (
    <InputField
      autoFocus
      placeholder="編輯待辦事項"
      // 1. 將 value 屬性改為 defaultValue：
      //    如果只給予 value，不給予 onChange callback，
      //    使用者輸入的資料將不會被更新，因此改為 defaultValue。
      defaultValue={title}
      onBlur={this.toggleEditMode}
      onKeyDown={(e) => {
        if (e.keyCode === 27) {
          e.preventDefault();
          this.toggleEditMode();
        }
      }}
      // 2. 傳遞 onSubmitEditing callback，該 callback 做兩件事情：
      //    a. 呼叫上層元件的 onUpdate callback
      //    b. 切換為「預覽模式」
      onSubmitEditing={(content) => {
        onUpdate && onUpdate(content);
        this.toggleEditMode();
      }}
    />
  );
}
```

方法 2. 使用「可控元件」：

```js
/* InputField.js */
class InputField extends React.Component {
  constructor(props, context) {
    super(props, context);
    // 1. 讓上層元件傳遞的 value，初始元件狀態
    this.state = { value: props.value || '' };
    // 2. 手動綁定 this 給 handleChange
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // 3. handleChange 用來傾聽 input onChange 事件，將使用者輸入的資料更新到元件狀態中
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  // 4. 資料都從元件狀態中取出，和呼叫 this.setState 更新狀態
  handleKeyDown(e) {
    const { onKeyDown, onSubmitEditing } = this.props;
    const { value } = this.state;
    switch (e.keyCode) {
      case 13:
        if (value.trim()) {
          onSubmitEditing && onSubmitEditing(value);
        }
        this.setState({ value: '' });
        break;
    }
    onKeyDown && onKeyDown(e);
  }

  render() {
    // 5. 提供 value 和 onChange props
    return (
      <input
        {...this.props}
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

/* TodoItem.js */
renderEditMode() {
  const { title, onUpdate } = this.props;
  return (
    <InputField
      autoFocus
      placeholder="編輯待辦事項"
      value={title}
      onBlur={this.toggleEditMode}
      onKeyDown={(e) => {
        if (e.keyCode === 27) {
          e.preventDefault();
          this.toggleEditMode();
        }
      }}
      // 6. 加入 onSubmitEditing callback
      onSubmitEditing={(content) => {
        onUpdate && onUpdate(content);
        this.toggleEditMode();
      }}
    />
  );
}
```

> :bowtie:：列出上面兩個方法，是否讓你更疑惑了呢？「可控元件」和「不可控元件」的差別到底是什麼呢？我該選擇哪一個方法呢？請見「***學習筆記 2***」。

###### 2. 修改 TodoApp 元件

不論你用的是上面哪一種方法，編輯項目，更新 todos 狀態的方式是一樣的：

```js
class TodoApp extends React.Component {

  // ...

  render() {
    const { todos } = this.state;
    return (
      <div>
        <TodoList ...
          // 1. 呼叫 _updateTodo，更新 todos 狀態
          onUpdateTodo={
            (id, title) => this.setState({
              todos: _updateTodo(todos, id, title)
            })
          }
        />
      </div>
    );
  }
}

// 2. 將編輯邏輯抽成一個 function
const _updateTodo = (todos, id, title) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.title = title;
  return todos;
};
```

###### 3. 重構 TodoApp 元件

如果你發現 TodoApp 渲染 InputField 和 TodoList 元件時，傳遞的 callback 結構都長得很相似，那你應該會跟我一樣手癢：

```js
render() {
  const { todos } = this.state;
  return (
    <div>
      <InputField
        placeholder="新增待辦清單"
        onSubmitEditing={
          (title) => this.setState({
            todos: _createTodo(todos, title)
          })
        }
      />
      <TodoList ...
        onUpdateTodo={
          (id, title) => this.setState({
            todos: _updateTodo(todos, id, title)
          })
        }
        onToggleTodo={
          (id, completed) => this.setState({
            todos: _toggleTodo(todos, id, completed)
          })
        }
        onDeleteTodo={
          (id) => this.setState({
            todos: _deleteTodo(todos, id)
          })
        }
      />
    </div>
  );
}
```

所以我們把它重構為：

```js
class TodoApp extends React.Component {
  // ...

  updateTodosBy(updateFn) {
    return (...args) => {
      this.setState({
        todos: updateFn(this.state.todos, ...args)
      });
    };
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <InputField
          placeholder="新增待辦清單"
          onSubmitEditing={this.updateTodosBy(_createTodo)}
        />
        <TodoList
          todos={todos}
          onUpdateTodo={this.updateTodosBy(_updateTodo)}
          onToggleTodo={this.updateTodosBy(_toggleTodo)}
          onDeleteTodo={this.updateTodosBy(_deleteTodo)}
        />
      </div>
    );
  }
}
```


## :book: 學習筆記

### 1. [React] 如何使用表單元件

###### 1. 使用方法

```js
const { value } = state;
const callback = (e) => console.log(e.target.value);

// 1. 當使用 input, textarea 和 select 時
//    a. 用 value 來指定資料，通常是遞 state model 進去
//    b. 用 onChange 來傾聽輸入事件，通常用來更新 state model 資料
//    c. 下方為可控元件的寫法，將 value 替換為 defaultValue 為不可控元件
<input type="text" value={value} onChange={callback} />;

<textarea value={value} onChange={callback} />;

<select value={value} onChange={callback}>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>;

// 2. 當使用 checkbox 和 radio 時
//    a. 用 checked 來指定布林資料 (boolean)，通常是遞 state model 進去
//    b. 用 onChange 來傾聽勾選事件，通常用來更新 state model 資料
//    c. 下方為可控元件的寫法，將 checked 替換為 defaultChecked 為不可控元件
<input type="checkbox" checked={value} onChange={callback} />;
<input type="radio" checked={value} onChange={callback} />;
```

###### 2. 參考連結

1. [Forms | React](https://facebook.github.io/react/docs/forms.html)

### 2. [React] 如何使用「可控元件」、「不可控元件」

###### 1. React 表單元件，提供兩種使用方式

1. 可控元件 (Controlled Components)
2. 不可控元件 (Uncontrolled Component)

###### 2. 它們的差別在

1. 可控元件使用 value, checked；不可控元件使用 defaultValue, defaultChecked（如學習筆記 1）
2. 當表單元件為「可控元件」，元件內部不會儲存狀態，因此必須透過 props 傳遞 value，明確指定表單元件的資料為何（所以當你將 value 指定為一串字串，則無論使用者鍵入什麼值，元件都不會起反應）
3. 當表單元件為「不可控元件」，元件內部會儲存狀態，因此你無法讓應用程式的資料連動影響不可控元件中的狀態

###### 3. 所以什麼時候該用「可控元件」，什麼時候該用「不可控元件」

當你有改變表單元件狀態的需求，就使用「可控元件」，例如：

```js
// 這個元件限制使用者輸入 140 個字，因此透過 onChange 取得使用者鍵入的值，
// 並且判斷如果字串太長則修剪，然後再透過 value 將修剪後的資料塞回表單元件！

class InputField extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: '' };
  }

  render() {
    return (
      <input
        value={this.state.value}
        onChange={
          (e) => {
            this.setState({ value: e.target.value.substr(0, 140) })
          }
        }
      />
    );
  }
}
```

而當你沒有從外部改變表單元件狀態的需求，用「不可控元件」即可。


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-09_stateful-component) ｜ [下一關. 瞭解 React 元件的生命週期](../level-11_component-lifecycle) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-10_forms?pixel)
