import React from 'react';
import TaskFormatter from './TaskFormatter.jsx';
import style from ".././scss/styles.scss";

class ToDoBox extends React.Component {
  postTask () {

  }
  render() {
    var that = this;
    var taskListNode = this.props.data.map(function(taskDataItem, index){
      return (
        <TaskFormatter name={taskDataItem.name}
        author={taskDataItem.author} key={taskDataItem._id}
        uniqueID={taskDataItem._id}
        description={taskDataItem.description}
        assigned={taskDataItem.assigned}
        priority={taskDataItem.priority}
        status={taskDataItem.status}
        edit={that.props.edit}
        key={taskDataItem._id}
        handler={that.props.handler}
        index={index}/>
      )
    });
    return (
      <div id="colOne">
        <div><span className="colHeader">To Do Tasks</span>
        { taskListNode }
        </div>
      </div>
    );
  };
};

export default ToDoBox;