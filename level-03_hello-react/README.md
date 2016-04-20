# Level 3. 使用 JSX 印出 hello, world

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 3 ～！
> :bowtie:：Wish you have a happy learning!


## 階段目標

1. 完成主線任務：用 JSX 印出 hello, world
2. 獲得新技能：
  1. JSX：熟悉基本語法
  2. ReactDOM.render()：了解 API 使用方法和時機


## 主線任務

### 1. 編輯 index.html

根據下方步驟，step by step 完成 index.html。

```html
<body>
  <!--
    1. 清空 div，並給它 ID：
       這區塊是要印出 hello, world 的地方，
       加入 ID 讓 React 可以抓到該元素
  -->
  <div id="app"></div>

  <!-- 略: react.js, react-dom.js, browser.js -->

  <!--
    2. 加入 script，並指定 `type=text/babel`：
       這區塊是我們編寫主要程式的地方，
       因為我們用的是 JSX 語法，而非瀏覽器認識的 ES5 語法；
       所以需要指定 type 屬性，讓瀏覽器將這段程式轉交 Babel 接手，
       Babel 會將 JSX/ES6/ES7 翻譯成瀏覽器可以執行的 ES5
  -->
  <script type="text/babel">
    // 3. 使用 ReactDOM.render()：
    //    讓 `<h1>hello, world</h1>` 顯示在 `<div id="app">` 中
    ReactDOM.render(
      <h1>hello, world</h1>,
      document.getElementById('app')
    );
  </script>
</body>
```

### 2. 確認 hello, world 顯示在頁面上

![DEMO](../assets/level-03_demo.png)

## 學習筆記

### JSX

- 語法使用方式（詳見 [官方文件](https://facebook.github.io/react/docs/jsx-in-depth.html)）：

```js
// 下面四種方法，element 會顯示一樣的畫面：

// 1. 使用類 HTML 標籤及結構在 JS 中
const element = (
  <div>
    <div>hello, world</div>
  </div>
);

// 2. 在 JSX 中，取得變數值
const text = 'hello, world';
const element = <div>{text}</div>;

// 3. 在 JSX 中，取得陣列值
const children = [
  <span>hello</span>,
  <span>, <span>,
  <span>world<span>
];
const element = <div>{children}</div>;

// 4. 在 JSX 中，執行 function 並取得回傳值
const texts = ['hello', ', ', 'world'];
const element = (
  <div>
    {texts.map((text) => <span>{text}</span>)}
  </div>
);
```

### ReactDOM.render()

- 使用方式（詳見 [官方文件](https://facebook.github.io/react/docs/top-level-api.html#reactdom.render)）：

```js
// Good
ReactDOM.render(
  <div>hello, world</div>,       // React element
  document.getElementById('app') // DOM container node
);

// Bad: 請注意第一個參數（React element）不能給予兩個元素，必須用一個父元素包起來
ReactDOM.render(
  <h1>hello</h1>
  <span>, world</span>,
  document.getElementById('app')
)
```

- 說文解字：render 中文為「渲染」，有繪製的意思；因此這支 API 翻成白話文就是「***請幫我繪製 React element (`<div>hello, world</div>`) 在 DOM container node (`document.getElementById('app')`) 中***」
