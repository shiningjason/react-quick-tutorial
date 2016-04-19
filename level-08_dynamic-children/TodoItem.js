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

TodoItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired
};

window.App.TodoItem = TodoItem;
