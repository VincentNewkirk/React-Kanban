import React from 'react';

class DoneBox extends React.Component {
  render() {
    var that = this;
      var taskListNode = this.props.data.map(function(taskDataItem){
      return (
        <TaskFormatter uniqueID={taskDataItem._id}
        name={taskDataItem.name} author={taskDataItem.author}
        description={taskDataItem.description}
        assigned={taskDataItem.assigned}
        priority={taskDataItem.priority}
        edit={that.props.edit}
        status={taskDataItem.status}
        handler={that.props.handler}/>
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