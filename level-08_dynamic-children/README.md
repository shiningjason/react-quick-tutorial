# Level 8. 動態產生多個 React 元件

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 8 ～！
> :bowtie:：Wish you have a happy learning!


## 階段目標

1. 完成主線任務：
  1. 將待辦清單的資料存放在 TodoApp.js 中，並且使用 props 遞給 TodoList
  2. 完成 TodoList 的 propTypes 和 defaultProps
  3. 將待辦事項資料陣列轉成元素陣列，並在 JSX 中使用
2. 獲得新技能：
  1. JS / array map
  2. ES6 / arrows function
  3. React / 元件陣列中，key 的功用


## 主線任務

### 1. 將待辦清單的資料存放在 TodoApp.js 中，並且使用 props 遞給 TodoList
### 2. 完成 TodoList 的 propTypes 和 defaultProps
### 3. 將待辦事項資料陣列轉成元素陣列，並在 JSX 中使用


## 學習筆記

### 1. JS / array map

- 使用方法（詳見 [文件](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)）

```js
const inputs = [1, 2, 3];
console.log(inputs.map((num) => num * 2)); // [2, 4, 6]
```

### 2. ES6 / arrows function

- 使用方法（詳見 [文件](https://babeljs.io/docs/learn-es2015/#arrows-and-lexical-this)）

```
// ES5
var plus = function(x) {
  return x + 1;
}

// ES6
const plus = (x) => x + 1;
```

### 3. React / 元件陣列中，key 的功用

- 使用方法（詳見 [文件](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children)）
