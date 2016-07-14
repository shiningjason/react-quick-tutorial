# Level 13. 完成 Dispatcher：Flux 最重要的角色

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 13 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：加入 facebook/flux 程式庫中的 Dispatcher
2. 獲得新技能：
  1. [facebook/flux] 了解 Dispatcher class 的使用方法
3. 習得心法：
  1. [Flux] 了解 Dispatcher 是什麼，以及它的職責是什麼


## :triangular_flag_on_post: 主線任務

### 1. 整理專案的檔案結構

前面幾回關卡，我們完成 TodoApp 大小元件，也就是 Flux 中 View 的部分；接下來我們將會加入其他 Flux 的角色，針對不同角色，我們把它整理在不同的資料夾中：

```
index.html
├── components
│   ├── TodoApp.js
│   ├── ...將所有元件移至 components 下
├── dispatcher
├── stores
├── actions
```

記得修正 index.html 中的連結（加入 ./components/）：

```html
<script type="text/babel" src="./components/InputField.js"></script>
<script type="text/babel" src="./components/TodoHeader.js"></script>
<script type="text/babel" src="./components/TodoItem.js"></script>
<script type="text/babel" src="./components/TodoList.js"></script>
<script type="text/babel" src="./components/TodoApp.js"></script>
```

### 2. 引入 Facebook 官方的 Flux

從 cdnjs 中，複製 [flux](https://cdnjs.com/libraries/flux) 最新版本的連結，並貼到 index.html 中。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/flux/2.1.1/Flux.js"></script>
```

> :bowtie:：Flux 是一種設計模式，不是程式庫也不是框架。因此有許多實作方式或是第三方程式庫可以幫助你，例如：fluxxor, reflux, alt 等；我們使用的是 Facebook 開源的 flux 程式庫，這支程式庫只提供 Dispatcher 的實作，其他角色 Action, Store, View 的互動邏輯必須自己完成，不過也已經足夠，因此這裡選用 facebook/flux。

### 3. 建立 Dispatcher

facebook/flux 已經幫我們實作一支 Dispatcher 類別，因此我們只有建立 Dispatcher 類別實例即可：

###### 第一步. 建立 dispatcher/AppDispatcher.js

```js
window.App.AppDispatcher = new Flux.Dispatcher();
```

###### 第二步. 在 index.html 加入連結

```html
<script type="text/babel" src="./dispatcher/AppDispatcher.js"></script>
```

> :bowtie:：整個應用程式中，只需要一個 Dispatcher 實例即可，這章節最重要的還是「***你記得 Dispatcher 的職責是什麼嗎？***」。


## :book: 學習筆記

### 1. [facebook/flux] 了解 Dispatcher class 的使用方法

###### 1. 使用方法

在了解官方提供的 Dispatcher class 的 API 前，必須先回憶 Flux 設計模式中 Dispacther 負責的工作：

1. 提供 API 讓 Store 註冊 callback
2. 提供 API 讓 Action Creator 傳遞 action 物件
3. 將 action 物件傳遞給所有註冊的 Store

根據上面這些工作，Facebook 提供的 Dispatcher 用法如下：

```js
const dispatcher = new Flux.Dispatcher();

// 1. 在 Store 中，可以使用 register() 註冊 callback
dispatcher.register((action) => {
  // 根據 action.type 做不同的事情，例如更新 Store 中的資料狀態
  swicth (action.type) {
    case 'CREATE_TODO': ...
    case 'UPDATE_TODO': ...
    case 'DELETE_TODO': ...
    case 'TOGGLE_TODO': ...
  }
});

// 2. 在 Action Creator 中，可以使用 dispatch() 傳遞 action：
//    Dispatcher 會將 action 廣播給所有註冊的 callback function（就是上方 register() 中的參數）
const createTodoActionCreator = (title) => {
  const action = {
    type: 'CREATE_TODO',
    title
  };
  dispatcher.dispatch(action);
}
```

###### 2. 參考連結

1. [深入淺出 Flux](https://medium.com/p/44a48c320e11)
2. [Dipatcher API | Flux](https://facebook.github.io/flux/docs/dispatcher.html)
3. [flux/Dispatcher.js | GitHub](https://github.com/facebook/flux/blob/master/src/Dispatcher.js)

> :bowtie:：如果你有時間的話，其實從 FB 的 Source Code 中學習 register() 和 dispatch() 的實作方式，可以讓你更深入了解 Dispatcher 如何與 Action Creator 和 Store 去作互動 :apple:


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-12_flux) ｜ [下一關. 完成 Actions：集中所有應用行為](../level-14_flux-actions) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-13_flux-dispatcher?pixel)
