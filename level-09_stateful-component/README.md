# Level 9. 管理 React 元件的內部狀態

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 9 ～！
> :bowtie:：Wish you have a happy learning!


## 階段目標

1. 完成主線任務：
  1. 將待辦清單的資料存放在 TodoApp 的 state 中
  2. 完成刪除待辦項目的功能
  3. 切換待辦項目的編輯模式
2. 習得新技能：
  1. React / 初始 state 的方法
  2. React / 取得 state 的方法
  3. React / 更新 state 的方法
3. 修煉內功心法：
  1. 了解 state 和 props 的差別
  2. 了解什麼時機要用 state


## 主線任務

### 1. 確認 TodoItem 可以切換瀏覽模式和編輯模式
![DEMO](../assets/level-09_demo.gif)


## 學習筆記

### 1. React / 初始 state 的方法

- 使用方法：

```js
// 使用 ES6 classes 宣告元件時
class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      firstName: 'Jason',
      lastName: 'Chung'
    };
  }
}

// 使用 React.createClass API 宣告元件時：
const TodoApp = React.createClass({
  getInitialState() {
    return {
      firstName: 'Jason',
      lastName: 'Chung'
    };
  }
});
```

### 2. React / 取得 state 的方法

- 使用方法：

```js
// 不論用什麼方式宣告元件，state 的取得方法跟 props 一樣
render() {
  const { firstName, lastName } = this.state;
  // ...
}
```

### 3. React / 更新 state 的方法

```js
class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      firstName: 'Jason',
      lastName: 'Chung'
    };
  }

  handleClick() {
    // 1. 你可以只更新部分狀態
    this.setState({ firstName: 'Andy' });
    this.setState({ lastName: 'Lin' });

    this.setState({
      firstName: 'David',
      lastName: 'Cheng'
    });

    // 2. 呼叫 this.setState()，並不會立馬更新 this.state 的值：
    //    React 會等待元件跑到 render 這一個週期才會更新
    console.log(this.state); // { firstName: 'Jason', lastName: 'Chung' };

    // 3. 錯誤的更新方式！！！
    this.state.firstName = 'Andy';
  }
}
```
