const { connect } = ReactRedux;

const {
  TodoActions,
  InputField
} = window.App;

class CreateTodoFieldContainer extends React.Component {
  render() {
    return (
      <InputField
        placeholder="新增待辦清單"
        onSubmitEditing={this.props.createTodo}
      />
    );
  }
}

window.App.CreateTodoFieldContainer = connect(undefined, {
  createTodo: TodoActions.createTodo
})(CreateTodoFieldContainer);
