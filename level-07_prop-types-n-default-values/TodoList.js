const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <TodoItem
            title="Item 1"
            completed={false}
          />
        </li>
        <li>
          <TodoItem
            title="Item 2"
            completed={false}
          />
        </li>
        <li>
          <TodoItem
            title="Item 3"
            completed={false}
          />
        </li>
      </ul>
    );
  }
}

window.App.TodoList = TodoList;
