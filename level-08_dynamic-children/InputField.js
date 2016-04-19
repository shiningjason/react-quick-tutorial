class InputField extends React.Component {
  render() {
    return (
      <input {...this.props} type="text" />
    );
  }
}

window.App.InputField = InputField;
