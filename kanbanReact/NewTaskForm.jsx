import React from 'react';
import style from ".././scss/styles.scss";

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.postTask = this.postTask.bind(this);
    this.onClick = this.onClick.bind(this)
    this.state = {
      showNewTaskForm: false,
    }
  }


  onClick(){
    this.setState({showNewTaskForm: !this.state.showNewTaskForm})
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
    this.setState({showNewTaskForm: !this.state.showNewTaskForm})
  }

  render() {
    return (
      <div id="newTaskFooter">
        <div className="taskDiv">
          <h2 id="newTaskHeader" onClick={this.onClick}> New Task </h2>
        </div>
      {
        this.state.showNewTaskForm
          ? <div>
              <input type='text' id='authorInput'name='author' placeholder="Author"/>
              <input type='text' id='titleInput'name='title' placeholder="Task Title"/>
              <input type='text' id='assignedInput'name='assigned' placeholder="Assign To" />
              <input type='text' id='descriptionInput' name='description' placeholder='Task Description' />
              <select className="assignButton" id='priorityInput' name='priority'>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Blocker">Blocker</option>
              </select>

              <div className="assignButton" id="newTaskButton" onClick={this.postTask}>SUBMIT</div>
            </div>
              : null
      }
      </div>
    )
  };
};

export default NewTaskForm;





















/*import React from 'react';
import style from ".././scss/styles.scss";

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.postTask = this.postTask.bind(this);
>>>>>>> da0b3d7b699e802bb5fab54e9b41787af14ca403
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
    this.setState({showNewTaskForm: !this.state.showNewTaskForm})
  }

  render() {
    return (
<<<<<<< HEAD
      <div>
        <div>
          <h3 onClick={this.onClick}> New Task </h3>
        </div>
      {
        this.state.showNewTaskForm
          ? <div>
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
              : null
      }
=======
      <div className="taskDiv">
        <h2 id="newTaskHeader"> Add New Task </h2>
        <input type='text' id='authorInput'name='author' placeholder='Created By:' />
        <input type='text' id='titleInput'name='title' placeholder='Title:' />
        <input type='text' id='assignedInput'name='assigned' placeholder='Assigned To:' />
        <input type='text' id='descriptionInput' name='description' placeholder='Task Description:' />
        <select id='priorityInput' name='priority'>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Blocker">Blocker</option>
        </select>
        <button onClick={this.postTask} type="Submit">Submit</button>
>>>>>>> da0b3d7b699e802bb5fab54e9b41787af14ca403
      </div>
    )
  };
};

export default NewTaskForm;*/