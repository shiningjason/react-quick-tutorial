# Level 2. 建置簡易的開發環境

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 2 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 選擇一款愛用的編輯器
2. 完成主線任務：環境建置、專案初始化


## :triangular_flag_on_post: 選擇編輯器

前端工程師常用的編輯器有：

1. [Vim](http://www.vim.org/)
2. [Sublime Text 3](https://www.sublimetext.com/3)
3. [ATOM](https://atom.io/)
4. [Brackets](http://brackets.io/)
5. [Nuclide](http://nuclide.io/)

選哪一款其實都無所謂，***只要第一眼順眼，往後用起來習慣即可***！

> :bowtie:：所謂「工欲善其事，必先利其器」，我用的是 Sublime Text 3！＾＾


## :triangular_flag_on_post: 主線任務

### 1. 安裝 Node.js

下方列出三種安裝方法，挑一個適合你的吧：

1. 簡易懶人法：直接從 [官網](https://nodejs.org/) 中下載
2. 進階職人法：
  1. 安裝 [NVM](https://github.com/creationix/nvm)（Node.js 的版本控管工具；如果你使用 Windows，請至 [NVM for Windows](https://github.com/coreybutler/nvm-windows)）
  2. 使用 NVM 安裝 Node.js（安裝指令請見 [NVM 文件](https://github.com/creationix/nvm#usage)）
3. OSX 用戶，又剛好裝有 [Homebrew](http://brew.sh/)：
  1. 使用 `$ brew install nvm` 安裝 NVM，再使用 NVM 下載 Node.js
  2. 使用 `$ brew install node` 直接安裝 Node.js

> :bowtie:：偷偷跟你講，我選擇的是第二種！：）

### 2. 建立專案目錄

1. 到常用的目錄下（如：documents/workspace、desktop）
2. 建立一個空檔案夾，並且為它命名（如：TodoApp, ReactIsCool, whatever）

### 3. 建立 index.html

1. 在專案目錄中，建立 index.html
2. 使用編輯器，打開專案目錄
3. 在 index.html 中，完成空的 HTML5 結構
4. 在 body 中，加入 `<div>hello, world</div>`，讓頁面顯示 hello, world

### 4. 安裝 [live-server](https://github.com/tapio/live-server)

1. 開啟終端機
2. 執行 `$ npm install -g live-server`

### 5. 啟動本機端伺服器

1. 將終端機切換到專案目錄下（如：`$ cd ~/Desktop/TodoApp`）
2. 執行 `$ live-server`，啟動伺服器
3. 打開瀏覽器，前往 [http://localhost:8080](http://localhost:8080)
4. 確認 hello, world 顯示在頁面中

### 6. 引入第三方 JS 程式

1. 從 cdnjs 中
  1. 複製 [react.js 和 react-dom.js](https://cdnjs.com/libraries/react) 的連結
  2. 複製 [babel-core v5.x.x 的 browser.js](https://cdnjs.com/libraries/babel-core/5.8.34) 的連結（***注意：版本請使用 5.x.x***）
2. 將上述三個連結嵌入 index.html 中


## :beers: FAQ

### 1. 為什麼要安裝 live-server？

原因有二：

1. ***為了開發方便，讓你擁有「所見即所得」的開發體驗***：   
  意即當你在編輯器中儲存剛編輯完的程式，瀏覽器會立即重新整理，並顯示最新的結果
2. ***為了使用 AJAX 請求 JS 檔案和 API***：  
  由於一些安全因素，瀏覽器會檔住 file:// 協議下的 AJAX 請求，因此你需要一個簡易的伺服器

### 2. react.js 和 react-dom.js 有什麼差別？

***react.js 是 React 的核心 API，而 react-dom.js 則處理對 HTML DOM 的操作。***

React 在 0.14 版時，將兩者一分為二；這讓 react.js 可以共用於 Web 和 Mobile (React Native) 中。

### 3. Babel 和 browser.js 是什麼？

browser.js 是 [Babel](https://babeljs.io) 的程式庫，而 Babel 是一個 JS 編譯器，讓你可以寫新的 ES6/ES7/JSX 語法，然後轉譯成瀏覽器認識的 ES5 語法。

簡單講，Babel 就像是「***翻譯蒟蒻***」，而 browser.js 讓你可以在瀏覽器中進行這項翻譯的工作。


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-01_react) ｜ [下一關. 使用 JSX 印出 hello, world](../level-03_hello-react) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-02_initial-project?pixel)
