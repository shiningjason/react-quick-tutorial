const { Container } = FluxUtils;

const {
  TodoStore,
  TodoHeader
} = window.App;

class TodoHeaderContainer extends React.Component {
  static getStores() {
    return [ TodoStore ];
  }

  static calculateState(prevState) {
    return {
      todos: TodoStore.getState(),
    };
  }

  render() {
    return (
      <TodoHeader
        title="我的待辦清單"
        username="Jason"
        todoCount={this.state.todos.filter((todo) => !todo.completed).length}
      />
    );
  }
}

window.App.TodoHeaderContainer = Container.create(TodoHeaderContainer);
