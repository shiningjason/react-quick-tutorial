const {
  InputField,
  TodoHeader,
  TodoList
} = window.App;

const todos = [
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
];

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <TodoHeader
          title="我的待辦清單"
          username="Jason"
          todoCount={todos.filter((todo) => !todo.completed).length}
        />
        <InputField placeholder="新增待辦清單" />
        <TodoList todos={todos} />
      </div>
    );
  }
}

window.App.TodoApp = TodoApp;
