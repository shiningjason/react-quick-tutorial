class TodoItem extends React.Component {
  render() {
    const {
      title,
      completed
    } = this.props;
    return (
      <div>
        <input type="checkbox" checked={completed} />
        <span>{title}</span>
        <button>x</button>
      </div>
    );
  }
}

window.App.TodoItem = TodoItem;
