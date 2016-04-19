const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    const todoElements = todos.map((todo) => (
      <li key={todo.id}>
        <TodoItem
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ));
    return <ul>{todoElements}</ul>;
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

window.App.TodoList = TodoList;
