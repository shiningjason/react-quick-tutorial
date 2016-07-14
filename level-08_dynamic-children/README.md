# Level 8. 動態產生多個 React 元件

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 8 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：讓 TodoList 動態產生 TodoItem
2. 獲得新技能：
  1. [React] 動態小孩元件
  2. [ES5] 陣列的 map 方法
  3. [ES5] 陣列的 filter 方法
  4. [ES6] 箭頭函數 (arrow function)


## :triangular_flag_on_post: 主線任務

### 1. 先了解任務目標

還記得我們前幾關尚未解決的問題嗎？

```js
/** TodoList.js */

render() {
  return (
    <ul>
      <li>
        <TodoItem
          title="Item 1"
          completed={false}
        />
      </li>
      <li>
        <TodoItem
          title="Item 2"
          completed={false}
        />
      </li>
      <li>
        <TodoItem
          title="Item 3"
          completed={false}
        />
      </li>
    </ul>
  );
}
```

待辦事項的資料還寫死在 TodoList 中；通常這些資料會從伺服器中抓取，因此我們必須讓 TodoList ***根據上層元件傳遞的 props 動態顯示 UI***！

### 2. 讓 TodoList 動態產生 TodoItem

```js
/** TodoList.js */

class TodoList extends React.Component {
  render() {
    const { todos } = this.props; // 1. 從 props 中，取得 todos (待辦清單) 陣列

    // 2. 將每一筆項目轉成 li 元素，並塞入對應的待辦資料
    //    PS. 務必給每筆 li 唯一 key（詳見[學習筆記 1]）
    const todoElements = todos.map((todo) => (
      <li key={todo.id}>
        <TodoItem
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ));

    return <ul>{todoElements}</ul>;
  }
}

// 3. 完成 TodoList 的防呆機制 (propTypes, defaultProps)
//    略（請根據上個關卡所學的技能進行設計）

/** TodoApp.js */

// 4. 將 todos 定義於上層元件中：
//    因為資料來源有可能來自伺服器等，為了開發方便，先宣告於 TodoApp 中；
//    並讓下層元件 (TodoList) 只需理會上層元件遞送的 props 即可！
const todos = [
  {
    id: 0,
    title: 'Item 1',
    completed: false
  },
  // ...
];

class TodoApp extends React.Component {
  render() {
    // 5. 將待辦數量和資料分別遞給 TodoHeader 和 TodoList
    return (
      <div>
        <TodoHeader
          title="我的待辦清單"
          username="Jason"
          todoCount={todos.filter((todo) => !todo.completed).length}
        />
        <InputField placeholder="新增待辦清單" />
        <TodoList todos={todos} />
      </div>
    );
  }
}
```


## :book: 學習筆記

### 1. [React] 動態小孩元件

###### 1. 使用方法

```js
render() {
  return (
    <ul>
      {
        this.props.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))
      }
    </ul>
  );
}
```

###### 2. 小提醒

***每個子元件都必須給予唯一的 key***，React 根據 key 來辨認元件是屬於哪一筆資料，而確保：

1. 資料重新排序時，元件會跟著重新排序，而不是破壞舊元件，以新元件顯示資料
2. 資料被刪除時，元件會跟著刪除，而不是留給其他資料使用

###### 3. 參考連結

1. [Dynamic Children | React](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children)

### 2. [ES5] 陣列的 map 方法

###### 1. 使用方法

```js
const inputs = [1, 2, 3];

const outputs = inputs.map(function(num) {
  return num * 2;
});

console.log(outputs); // [2, 4, 6]
```

###### 2. 參考連結

1. [Array.prototype.map() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### 3. [ES5] 陣列的 filter 方法

###### 1. 使用方法

```js
const inputs = [2, 10, 8];

const outputs = inputs.filter(function(num) {
  return num < 9;
});

console.log(outputs); // [2, 8]
```

###### 2. 參考連結

1. [Array.prototype.filter() | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### 4. [ES6] 箭頭函數 (arrow function)

###### 1. 使用方法

```js
// ES5 中，定義匿名函數，及將函數賦值給變數的方法
var plus = function(x) {
  return x + 1;
};

// ES6 中，箭頭函數讓匿名函數宣告語法更簡潔
const plus = (x) => x + 1;

// ES6 中，箭頭函數會自動綁定 this
function Person() {
  this.text = 'hello';

  // Error: ES6 的匿名函數不會自動綁定 this，因此取不到 this.text
  setInterval(function() {
    console.log(this.text);
  }, 1000);

  // Correct
  setInterval(() => console.log(this.text), 1000);
}

new Person();
```

###### 2. 參考連結

1. [Arrows and Lexical This | Babel](https://babeljs.io/docs/learn-es2015/#arrows-and-lexical-this)
2. [箭頭函數 (Arrow Function) | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-07_prop-types-n-default-values) ｜ [下一關. 管理 React 元件的內部狀態](../level-09_stateful-component) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-08_dynamic-children?pixel)
