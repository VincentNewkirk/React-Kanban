'use strict';
import React from 'react';
import TaskFormatter from './TaskFormatter.jsx';
import style from ".././scss/styles.scss";

class DoneBox extends React.Component {
  render() {
    var that = this;
      var taskListNode = this.props.data.map(function(taskDataItem, index){
      return (
        <TaskFormatter uniqueID={taskDataItem._id}
        name={taskDataItem.name} author={taskDataItem.author}
        description={taskDataItem.description}
        assigned={taskDataItem.assigned}
        priority={taskDataItem.priority}
        edit={that.props.edit}
        key={taskDataItem._id}
        status={taskDataItem.status}
        handler={that.props.handler}
        index={index}/>
      )
    });
    return (
      <div id="colThree">
        <div><span className="colHeader">Done Tasks</span>
        {taskListNode}
        </div>
      </div>
    );
  }
}

export default DoneBox;