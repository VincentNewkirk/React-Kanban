import React from 'react';

class DoingBox extends React.Component {
  render() {
    var that = this;
      var taskListNode = this.props.data.map(function(taskDataItem){
      return (
        <TaskFormatter name={taskDataItem.name}
        author={taskDataItem.author}
        uniqueID={taskDataItem._id}
        description={taskDataItem.description}
        assigned={taskDataItem.assigned}
        priority={taskDataItem.priority}
        edit={that.props.edit}
        status={taskDataItem.status}
        handler={that.props.handler}/>
      )

    });
    return (
      <div id="colTwo">
        <div><span className="colHeader">Doing Tasks</span>
        {taskListNode}
        </div>
      </div>
    );
  }
}

export default DoingBox;