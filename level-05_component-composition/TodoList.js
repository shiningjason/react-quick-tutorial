const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <TodoItem />
        </li>
        <li>
          <TodoItem />
        </li>
        <li>
          <TodoItem />
        </li>
      </ul>
    );
  }
}

window.App.TodoList = TodoList;
