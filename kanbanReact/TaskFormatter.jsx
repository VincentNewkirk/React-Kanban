import React from 'react';
import ShowHide from './ShowHide.jsx';
import style from ".././scss/styles.scss";

class TaskFormatter extends React.Component {
  constructor() {
    super();
    this.doingStatus = this.doingStatus.bind(this);
    this.doneStatus = this.doneStatus.bind(this);
    this.toDoStatus = this.toDoStatus.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  doingStatus () {
    var that = this;
    const req = new XMLHttpRequest();
    req.addEventListener('load', function(){
      if(this.responseText){
        that.props.handler()
      }
    });
    req.open('PUT', `/tasks/${this.props.uniqueID}`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": `${this.props.name}`,
      "author": `${this.props.author}`,
      "description": `${this.props.description}`,
      "assigned": `${this.props.assigned}`,
      "priority": `${this.props.priority}`,
      "status": "doing"
    }));
  }
  doneStatus () {
    var that = this;
    const req = new XMLHttpRequest();
    req.addEventListener('load', function(){
      if(this.responseText){
        that.props.handler()
      }
    });
    req.open('PUT', `/tasks/${this.props.uniqueID}`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": `${this.props.name}`,
      "author": `${this.props.author}`,
      "description": `${this.props.description}`,
      "assigned": `${this.props.assigned}`,
      "priority": `${this.props.priority}`,
      "status": "done"
    }));
  }
  toDoStatus () {
    var that = this;
    const req = new XMLHttpRequest();
    req.addEventListener('load', function(){
      if(this.responseText){
        that.props.handler()
      }
    });
    req.open('PUT', `/tasks/${this.props.uniqueID}`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": `${this.props.name}`,
      "author": `${this.props.author}`,
      "description": `${this.props.description}`,
      "assigned": `${this.props.assigned}`,
      "priority": `${this.props.priority}`,
      "status": "to-do"
    }));
  }

  deleteTask () {
    var that = this;
    const req = new XMLHttpRequest();
    req.addEventListener('load', function(){
      if(this.responseText){
        that.props.handler()
      }
    });
    req.open('DELETE', `/tasks/${this.props.uniqueID}`);
    req.send();
  }

  render() {
    return (
      <div className='taskItem'>
        <span className="taskItemName">
        {this.props.name}</span>
        <button onClick={this.deleteTask} className="deleteButton"> X </button>
        <p>Created By: {this.props.author}</p>
        <p>Assigned To: {this.props.assigned}</p>
        <p>Priority Level: {this.props.priority}</p>
        <p>{this.props.description}</p>
        <button onClick={this.toDoStatus}> To Do</button>
        <button onClick={this.doingStatus}> Doing </button>
        <button onClick={this.doneStatus}> Done </button>
        <ShowHide author={this.props.author}
        assigned={this.props.assigned}
        uniqueID={this.props.uniqueID}
        priority={this.props.priority}
        name={this.props.name}
        handler={this.props.handler}
        status={this.props.status}
        edit={this.props.edit}
        description={this.props.description}
        index={this.props.index}/>
      </div>
    );
  };
};

export default TaskFormatter;