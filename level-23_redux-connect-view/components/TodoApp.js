const {
  CreateTodoFieldContainer,
  TodoHeaderContainer,
  TodoListContainer
} = window.App;

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
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

window.App.TodoApp = TodoApp;
