const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    const {
      todos,
      onDeleteTodo
    } = this.props;
    const todoElements = todos.map((todo) => (
      <li key={todo.id}>
        <TodoItem
          title={todo.title}
          completed={todo.completed}
          onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
        />
      </li>
    ));
    return <ul>{todoElements}</ul>;
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onDeleteTodo: React.PropTypes.func
};

window.App.TodoList = TodoList;
