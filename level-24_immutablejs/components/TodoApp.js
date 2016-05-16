const { connect } = ReactRedux;
const {
  TodoActions,
  CreateTodoFieldContainer,
  TodoHeaderContainer,
  TodoListContainer
} = window.App;

class TodoApp extends React.Component {
  componentDidMount() {
    this.props.loadTodos();
  }

  render() {
    return (
      <div>
        <TodoHeaderContainer />
        <CreateTodoFieldContainer />
        <TodoListContainer />
      </div>
    );
  }
}

window.App.TodoApp = connect(undefined, {
  loadTodos: TodoActions.loadTodos
})(TodoApp);
