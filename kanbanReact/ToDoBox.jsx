import React from 'react';

class ToDoBox extends React.Component {
  postTask () {

  }
  render() {
    var that = this;
    var taskListNode = this.props.data.map(function(taskDataItem){
      return (
        <TaskFormatter name={taskDataItem.name}
        author={taskDataItem.author} key={taskDataItem._id}
        uniqueID={taskDataItem._id}
        description={taskDataItem.description}
        assigned={taskDataItem.assigned}
        priority={taskDataItem.priority}
        status={taskDataItem.status}
        edit={that.props.edit}
        handler={that.props.handler}/>
      )
    });
    return (
      <div id="colOne">
        <div><span className="colHeader">To Do Tasks</span>
        { taskListNode }
        </div>
        <NewTaskForm handler={this.props.handler}/>

      </div>
    );
  };
};

export default ToDoBox;