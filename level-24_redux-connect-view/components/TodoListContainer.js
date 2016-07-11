const { connect } = ReactRedux;

const {
  TodoActions,
  TodoList
} = window.App;

class TodoListContainer extends React.Component {
  render() {
    const {
      todos,
      updateTodo,
      toggleTodo,
      deleteTodo
    } = this.props;
    return (
      <TodoList
        todos={todos}
        onUpdateTodo={updateTodo}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    );
  }
}

window.App.TodoListContainer = connect(
  (state) => ({ todos: state.todos }),
  {
    updateTodo: TodoActions.updateTodo,
    toggleTodo: TodoActions.toggleTodo,
    deleteTodo: TodoActions.deleteTodo
  }
)(TodoListContainer);
