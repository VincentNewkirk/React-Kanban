import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import style from ".././scss/styles.scss";

class EditForm extends React.Component {
  constructor() {
    super();
    this.putRequest = this.putRequest.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.initialData = {}
    this.inputValues = {}
  }

  componentWillMount() {
    this.initialData = {
      author: this.props.author,
      name: this.props.name,
      description: this.props.description,
      assigned: this.props.assigned,
      priority: this.props.priority,
      status: this.props.status,
      _id: this.props.uniqueID,
      index: this.props.index,
    }
  };

  handleInputUpdate(event) {
    var newState = this.initialData;
    newState[event.target.id] = event.target.value;

    newState.columnName = this.props.status
    this.props.editItem(newState);
    this.inputValues = newState;
  }

  putRequest() {
    console.log(this.inputValues, 'PUT RQ');
    this.props.edit(this.inputValues);
  }

  render() {
    return (
      <div>
        <p>Created By: <input onChange={this.handleInputUpdate} type='text' id='author' value={this.initialData.author} /></p>
        <p>Title: <input type='text' onChange={this.handleInputUpdate} id='name' value={this.initialData.name} /></p>
        <p>Assigned To: <input onChange={this.handleInputUpdate} type='text' id='assigned' value={this.initialData.assigned} /></p>
        <p>Description: <input onChange={this.handleInputUpdate} type='text' id='description' value={this.initialData.description} /></p>
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

const mapStateToProps = (state, ownProps) => {
  var stateData = state.kanban_reducer.toJS();

  return {
    toDo: stateData.toDo,
    doing: stateData.doing,
    done: stateData.done,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editItem: (data) => {
      dispatch({
        type: 'EDIT_ITEM',
        data
      })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (EditForm);