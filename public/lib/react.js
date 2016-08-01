'use strict';

/*document.write("It works.");*/

class KanbanBox extends React.Component {
  constructor() {
    super();
    this.state = {
      toDo: [],
      doing: [],
      done: [],
    }
    this.onMongoData = this.onMongoData.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  onMongoData(data){
    const parsedMongoData = JSON.parse(data.currentTarget.response);

    const toDoData = parsedMongoData.filter(function(el, index){
      return parsedMongoData[index].status === "to-do"
    });

    const doingData = parsedMongoData.filter((el, index) => {
      return parsedMongoData[index].status === "doing"
    });

    const doneData = parsedMongoData.filter((el, index) => {
      return parsedMongoData[index].status === "done"
    });
    console.log(doingData, "<---> DOING DATA");
    console.log(toDoData, "<---> TODO DATA");
    console.log(doneData, "<---> DONE DATA");
    this.setState({
      toDo: toDoData,
      doing: doingData,
      done: doneData,
    });
  }

  loadDataFromMongo(){
    const req = new XMLHttpRequest();
    req.addEventListener('load', this.onMongoData);
    req.open('GET', '/tasks');
    req.send();
  }

  updateHandler() {
    this.loadDataFromMongo();
  }

  componentDidMount() {
    this.loadDataFromMongo();
  };



  render() {
    return (

      <div id="mainDiv">
        <div id="titleDiv"><h1>KanbanBox</h1></div>
        <h3>{this.state.toDo.name}</h3>
        <ToDoBox data={this.state.toDo} handler={this.updateHandler}/>
        <DoingBox data={this.state.doing} handler={this.updateHandler}/>
        <DoneBox data={this.state.done} handler={this.updateHandler}/>
      </div>
    );
  };
};

KanbanBox.propTypes = {
    data: React.PropTypes.array
};

KanbanBox.defaultProps = {
  data: []
}

class ToDoBox extends React.Component {
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
        handler={that.props.handler}/>
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

class TaskFormatter extends React.Component {
  constructor() {
    super();
    this.doingStatus = this.doingStatus.bind(this);
    this.doneStatus = this.doneStatus.bind(this);
    this.toDoStatus = this.toDoStatus.bind(this);
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
    this.props.handler();
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


  render() {
    return (
      <div className='taskItem'>
        <span className="taskItemName">{this.props.name}</span>
        <p>Created By: {this.props.author}</p>
        <p>Description: {this.props.description}</p>
        <p>Assigned To: {this.props.assigned}</p>
        <p>Priority Level: {this.props.priority}</p>
        <button onClick={this.toDoStatus}> To Do</button>
        <button onClick={this.doingStatus}> Doing </button>
        <button onClick={this.doneStatus}> Done </button>
      </div>
    );
  };
};


ReactDOM.render(
  <KanbanBox/>,
  document.getElementById('content')
)