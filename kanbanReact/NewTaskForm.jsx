import React from 'react';
import style from ".././scss/styles.scss";

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.postTask = this.postTask.bind(this);
  }

  postTask() {
    var that = this;
    const author = document.getElementById('authorInput').value;
    const name = document.getElementById('titleInput').value;
    const assigned = document.getElementById('assignedInput').value;
    const description = document.getElementById('descriptionInput').value;
    const priority = document.getElementById('priorityInput').value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', function(){
      if(this.responseText){
        that.props.handler()
      }
    });
    req.open('POST', `/tasks`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": `${name}`,
      "author": `${author}`,
      "description": `${description}`,
      "assigned": `${assigned}`,
      "priority": `${priority}`,
    }));
  }

  render() {
    return (
      <div className="taskDiv">
        <h3> Add New Task </h3>
        <input type='text' id='authorInput'name='author' placeholder="Created By:"/>
        <input type='text' id='titleInput'name='title' placeholder="Title"/>
        <input type='text' id='assignedInput'name='assigned' placeholder="Assigned To" />
        <input type='text' id='descriptionInput' name='description' placeholder='Task Description' />
        <select id='priorityInput' name='priority'>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Blocked">Blocker</option>
        </select>
        <button onClick={this.postTask} type="Submit">Submit</button>
      </div>
    )
  };
};

export default NewTaskForm;