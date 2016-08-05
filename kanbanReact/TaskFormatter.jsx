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
        <div className="taskItemName">
          <div className="taskItemNameText">
          {this.props.name}<br />
          <span className="createdByLabel">Created By:</span> <span className="createdByName">{this.props.author}</span>
          </div>
        </div>
        <button onClick={this.deleteTask} className="deleteButton"> X </button>
        <div className="taskItemBody">
          <p><span className="fieldLabels">Assigned To:</span> {this.props.assigned}</p>
          <p><span className="fieldLabels">Priority Level:</span> {this.props.priority}</p>
          <p>{this.props.description}</p>
          <div className="assignButtonContainer">
            <div className="assignButton toDoButton" onClick={this.toDoStatus}>TO DO</div>
            <div className="assignButton doingButton" onClick={this.doingStatus}>DOING</div>
            <div className="assignButton doneButton" onClick={this.doneStatus}>DONE</div>
          </div>
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
      </div>
    );
  };
};

export default TaskFormatter;