# Level 7. 培養好習慣，設計防呆的 React 元件

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 7 ～！
> :bowtie:：Wish you have a happy learning!


## 階段目標

1. 完成主線任務：
  1. 設計 TodoHeader 的防呆機制
  2. 設計 TodoItem 的防呆機制
2. 獲得新技能：
  1. React / prop validation
  2. React / default prop values
3. 修煉內功心法：
  1. 了解什麼時機要用 propTypes
  2. 了解什麼時機要用 defaultProps


## 主線任務

### 1. 設計 TodoHeader 的防呆機制
### 2. 設計 TodoItem 的防呆機制


## 學習筆記

### 1. React / prop validation

- 使用方法（詳見 [官方文件](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)）：

```js
// ES6 中，propTypes 的宣告方式
class TodoApp extends React.Component {
  // ...
}

TodoApp.propTypes = {
  appName: React.PropTypes.string.isRequired // 更多 Validation 和客製化方法，請見官方文件
};

// 補充 1：ES7 中，propTypes 的宣告方式
class TodoApp extends React.Component {
  static propTypes = {
    appName: React.PropTypes.string.isRequired
  };
  // ...
}

// 補充 2：使用 React.createClass API 時，propTypes 的宣告方式
const TodoApp = React.createClass({
  propTypes: {
    appName: 'TodoApp'
  },
  // ...
});
```

### 2. React / default prop values

- 使用方法（詳見 [官方文件](https://facebook.github.io/react/docs/reusable-components.html#default-prop-values)）：

```js
// ES6 中，defaultProps 的宣告方式
class TodoApp extends React.Component {
  // ...
}

TodoApp.defaultProps = {
  appName: 'Todo App'
};

// 補充 1：ES7 中，defaultProps 的宣告方式
class TodoApp extends React.Component {
  static defaultProps = {
    appName: 'Todo App'
  };
  // ...
}

// 補充 2：使用 React.createClass API 時，defaultProps 的宣告方式
const TodoApp = React.createClass({
  getDefaultProps() {
    return {
      appName: 'TodoApp'
    };
  },
  // ...
});
```
