import React from 'react';
import style from ".././scss/styles.scss";

class EditForm extends React.Component {
  constructor() {
    super();
    this.putRequest = this.putRequest.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.state ={
      author: '',
      name: '',
      description: '',
      assigned: '',
      priority: '',
      status: '',
      _id: '',
    }
  }

  componentDidMount() {
    this.setState({
      author: this.props.author,
      name: this.props.name,
      description: this.props.description,
      assigned: this.props.assigned,
      priority: this.props.priority,
      status: this.props.status,
      _id: this.props.uniqueID,
    })
  };

  handleInputUpdate(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;

    this.setState(newState)
  }

  putRequest() {
    this.props.edit(this.state);
  }

  render() {
    return (
      <div>
        <p>Created By: <input onChange={this.handleInputUpdate} type='text' id='author' value={this.state.author} /></p>
        <p>Title: <input type='text' onChange={this.handleInputUpdate} id='name' value={this.state.name} /></p>
        <p>Assigned To: <input onChange={this.handleInputUpdate} type='text' id='assigned' value={this.state.assigned} /></p>
        <p>Description: <input onChange={this.handleInputUpdate} type='text' id='description' value={this.state.description} /></p>
        <select id='priority' onChange={this.handleInputUpdate} name='priority'>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Blocker">Blocker</option>
        </select>
        <button type="submit" onClick={this.putRequest}>Edit</button>
      </div>
    )
  }
}

export default EditForm;