# Level 6. 使用 props 傳遞元件參數

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 6 ～！
> :bowtie:：Wish you have a happy learning!


## 階段目標

1. 完成主線任務：
  1. 讓 TodoItem 元件可以接受參數，並且 TodoList 可以傳遞不同的參數給每一個 TodoItem
  2. 讓 TodoHeader, InputField 元件可以接受參數，並且 TodoApp 傳遞參數給子元件
2. 獲得新技能：
  1. ES6 / object rest properties
  2. ES6 / object spread properties
  3. React / 傳遞 props 的方式
  4. React / 接收 props 的方式

## 主線任務

### 1. 確認 TodoApp 可以顯示出來，且 TodoItem 的標題可以依據 props 顯示不一樣的資料

![DEMO](../assets/level-06_demo.png)

## 學習筆記

### 1. ES6 / object rest properties

- 使用方法（詳見 [ES spec](https://github.com/sebmarkbage/ecmascript-rest-spread)）：

```js
const user = {
  firstName: 'Jason',
  lastName: 'Chung',
  sex: 'male',
  age: 27
};

// 如果你要取出 sex 和 age，並將它包裝成 others 物件：

// ES5
var others = {
  sex: user.sex,
  age: user.age
};
console.log(others); // { sex: 'male', age: 27 }

// ES6
const { firstName, lastName, ...others } = user;
console.log(others); // { sex: 'male', age: 27 }
```

### 2. ES6 / object spread properties

- 使用方法（詳見 [ES spec](https://github.com/sebmarkbage/ecmascript-rest-spread)）：

```js
const firstName = 'Jason';
const lastName = 'Chung';
const others = {
  sex: 'male',
  age: 27
};

// 如果你要將上面這些值組合成 user 物件：

// ES5
var user = {
  firstName: firstName,
  lastName: lastName,
  sex: others.sex,
  age: others.age
};

// ES6
const user = { firstName, lastName, ...others };
```

### 3. React / 傳遞 props 的方式

- 使用方法（詳見 [官方文件](https://facebook.github.io/react/docs/transferring-props.html)）：

```js
// 1. 使用屬性的方式傳遞 props 給元件
ReactDOM.render(
  <TodoApp
    username="Jason"
    todos={['Item1', 'Item2']}
  />,
  document.getElementById('app')
);

// 2. 使用 object spread properties
const props = {
  username: 'Jason',
  todos: ['Item1', 'Item2']
};
ReactDOM.render(
  <TodoApp {...props} />, // 與第一種方式傳遞的參數一樣
  document.getElementById('app')
);

// 3. 使用 object rest/spread properties
const data = {
  appName: 'TodoApp',
  username: 'Jason',
  todos: ['Item1', 'Item2']
};
const { appName, ...props } = data;
ReactDOM.render(
  <TodoApp {...props} />, // 與第一種方式傳遞的參數一樣
  document.getElementById('app')
);
```

### 4. React / 接收 props 的方式

- 使用方法（詳見 [官方文件](https://facebook.github.io/react/docs/transferring-props.html)）：

```js
// 上層元件傳遞的屬性都可以從 this.props 中取得
class TodoApp extends React.Component {
  render() {
    const { appName, todos, ...rest } = this.props;

    console.log(appName); // "TodoApp"
    console.log(todos);   // ['Item1', 'Item2']
    console.log(rest);    // { firstName: 'Jason', lastName: 'Chung' }

    return <div></div>;
  }
}

ReactDOM.render(
  <TodoApp
    appName="TodoApp"
    todos={['Item1', 'Item2']}
    firstName="Jason"
    lastName="Chung"
  />,
  document.getElementById('app')
)

// 補充 1. 使用 React.createClass 建立元件，也是從 this.props 中取得
const TodoApp = React.createClass({
  render() {
    const { appName, todos, ...rest } = this.props;
    return <div></div>;
  }
});

// 補充 2. 使用 function 建立元件，是從 function 參數中取得 props
const TodoApp = (props) => <div></div>;

// 或是可以透過 destructuring 的方式取得 props 中的值
const TodoApp = ({ appName, todos }) => <div></div>;
```
