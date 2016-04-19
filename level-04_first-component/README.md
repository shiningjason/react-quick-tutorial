# Level 4. 完成第一個 React 元件

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 4 ～！
> :bowtie:：Wish you have a happy learning!


## 階段目標

1. 完成主線任務：完成第一個元件 TodoApp
2. 獲得新技能：
    1. ES6 / let & const
    2. ES6 / classes
    3. ES6 / destructuring
    4. React / 建立元件的三種方法


## 主線任務

### 1. 建立 TodoApp.js

```js
// 1. 新增一個繼承 React.Component 的子類別
class TodoApp extends React.Component {
    // 2. 必須實作 render 方法：
    //    React 透過該方法回傳的元素，
    //    知道要怎麼渲染該元件在頁面上
    render() {
        return <div>TodoApp</div>;
    }
}

// 3. 將 TodoApp 定義在 window.App 下，讓其他 JS 可以使用該元件
window.App.TodoApp = TodoApp;
```

### 2. 編輯 index.html

```html
<body>
    <!-- 1. 初始化 window.App -->
    <script>window.App = {}</script>
    <!-- 2. 引入 TodoApp.js -->
    <script type="text/babel" src="./TodoApp.js"></script>
    <script type="text/babel">
        // 3. 從 window.App 中，取出 TodoApp 元件
        const { TodoApp } = window.App;
        ReactDOM.render(
            <TodoApp />, // 4. 將 TodoApp 元件渲染在 container 中
            document.getElementById('app')
        );
    </script>
</body>
```

### 3. 確認 TodoApp 顯示在頁面上

![DEMO](../assets/level-04_demo.png)


## 學習筆記

### 1. ES6 / let & const

- 使用方法（詳見 [Learn ES2015 / Babel](https://babeljs.io/docs/learn-es2015/#let-const)）：

```js
// ES5 使用 var 宣告變數
var text = 'hello';
text = 'world';

// ES6 提供
// 1. let 宣告變數
// 2. const 定義常數
let text = 'hello';
const TEXT = 'hello';

text = 'world';
TEXT = 'world'; // 錯誤訊息：Uncaught SyntaxError: "TEXT" is read-only
```

- 培養好習慣：為了增加程式閱讀性，和降低出錯率，宣告變數盡量使用 let 取代 var，常數用 const

### 2. ES6 / classes

- 使用方式（詳見 [Learn ES2015 / Babel](https://babeljs.io/docs/learn-es2015/#classes)）：

```js
class TodoApp extends React.Component {
    // ...
}
```

### 3. ES6 / destructuring

- 使用方式（詳見 [Learn ES2015 / Babel](https://babeljs.io/docs/learn-es2015/#destructuring)）：

```js
const state = {
    value1: 'value1',
    value2: 'value2'
};

// ES5 取得 value1 和 value2 的方法
const value1 = state.value1;
const value2 = state.value2;
console.log(value1 + value2);

// ES6 取得 value1 和 value2 的方法
const { value1, value2 } = state;
console.log(value1 + value2);
```

### 4. React / 建立元件的三種方法

- ***元件可以是 class 也可以是 function***，見下方：

```js
// 第一種. 使用 ES6 classes
class TodoApp extends React.Component {
    render() {
        return <div>TodoApp</div>;
    }
}

// 第二種. 使用 React.createClass API，通常用在 ES5 語法中
const TodoApp = React.createClass({
    render() {
        return <div>TodoApp</div>;
    }
});

// 第三種. 使用 function，通常用在元件只需要定義 render 方法時
const TodoApp = () => <div>TodoApp</div>;
```
