const {
  TodoActions,
  TodoStore,
  TodoList
} = window.App;

class TodoListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todos: TodoStore.getAll() };
  }

  componentDidMount() {
    this._removeChangeListener = TodoStore.addChangeListener(
      () => this.setState({ todos: TodoStore.getAll() })
    );
  }

  componentWillUnmount() {
    this._removeChangeListener();
  }

  render() {
    return (
      <TodoList
        todos={this.state.todos}
        onUpdateTodo={TodoActions.updateTodo}
        onToggleTodo={TodoActions.toggleTodo}
        onDeleteTodo={TodoActions.deleteTodo}
      />
    );
  }
}

window.App.TodoListContainer = TodoListContainer;
