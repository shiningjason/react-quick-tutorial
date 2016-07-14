# Level 21. 完成 Store：Redux 的重要角色

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 21 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：建立 Redux 的 Store 實例
2. 獲得新技能：
  1. [Redux] 了解 createStore, combineReducers 的使用方法
3. 習得心法：
  1. [Redux] 了解 Store 是什麼，以及它的職責是什麼


## :triangular_flag_on_post: 主線任務

### 1. 了解這一關卡要實作的 Store 是什麼

> :bowtie:：建議你先閱讀 [秘笈 - 深入淺出 Redux](https://medium.com/p/7b08403c4957) 或是 [學習筆記 1]，再進行下去～！

### 2. 引入 Redux

從 cdnjs 中，複製 [Redux](https://cdnjs.com/libraries/redux) 最新版本的連結，並貼到 index.html 中。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.4.0/redux.js"></script>
```

### 3. 建立 main.js 和 Store 實例

```js
const { createStore, combineReducers } = Redux;
const { TodoApp, reducers } = window.App;

// 1. 將 reducers 集合物件轉換成一個 reducer 函數
const composedReducer = combineReducers(reducers);
// 2. 使用 reducer 函數，建立 Store 實例，Store 會將改變狀態邏輯委託給 reducer 實作
const store = createStore(composedReducer);

// 3. 將原本 index.html 中的程式移來這裡，記得移除原本的
ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);
```

最後，記得在 index.html 中加入 `./main.js` 連結！


## :book: 閱讀筆記

### 1. [Redux] 了解 Store 是什麼，以及它的職責是什麼

###### a. 還記得 Store 是什麼嗎？

Store 只儲存一個狀態物件，其他業務資料將會依附在該物件的屬性下；與 Flux 的 Store 不同的是根據 action 改變狀態的邏輯會委派給 reducer。

###### b. 還記得 Store 的職責是什麼嗎？

Redux 的 Store 提供了下面幾個 API：

1. store.dispatch(action)：接收 action 物件，並將狀態改變邏輯委派給 reducer，然後觸發狀態改變事件
2. store.subscribe(listener)：讓 View 傾聽狀態改變事件
3. store.getState()：讓 View 取得唯一的狀態物件


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-20_redux-reducers) ｜ [下一關. 修改 Actions：讓它們做更簡單的事](../level-22_redux-actions) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-21_redux-store?pixel)
