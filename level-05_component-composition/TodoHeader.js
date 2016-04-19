class TodoHeader extends React.Component {
  render() {
    return (
      <div>
        <h1>我的待辦清單</h1>
        <span>哈囉，Jason：你有 99 項未完成待辦事項</span>
      </div>
    );
  }
}

window.App.TodoHeader = TodoHeader;
