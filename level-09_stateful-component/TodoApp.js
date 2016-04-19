const {
  InputField,
  TodoHeader,
  TodoList
} = window.App;

const _deleteTodo = (todos, id) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx !== -1) todos.splice(idx, 1);
  return todos;
};

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [
        {
          id: 0,
          title: 'Item 1',
          completed: false
        },
        {
          id: 1,
          title: 'Item 2',
          completed: false
        },
        {
          id: 2,
          title: 'Item 3',
          completed: false
        }
      ]
    };
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <TodoHeader
          title="我的待辦清單"
          username="Jason"
          todoCount={todos.filter((todo) => !todo.completed).length}
        />
        <InputField placeholder="新增待辦清單" />
        <TodoList
          todos={todos}
          onDeleteTodo={
            (...args) => this.setState({
              todos: _deleteTodo(todos, ...args)
            })
          }
        />
      </div>
    );
  }
}

window.App.TodoApp = TodoApp;
