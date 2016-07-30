
'use strict';

class KanbanBox extends React.Component {
  constructor() {
    super();
    this.state = {
      toDo: [],
      doing: [],
      done: []
    }
    this.onMongoData = this.onMongoData.bind(this)
  }



  onMongoData(data){
    const parsedMongoData = JSON.parse(data.currentTarget.response);

    const toDoData = parsedMongoData.filter(function(el, index){
      return parsedMongoData[index].status === "to-do"
    });

    const doingData = parsedMongoData.filter((el, index) => {
      return parsedMongoData[index].status === "doing"
    })

    const doneData = parsedMongoData.filter((el, index) => {
      return parsedMongoData[index].status === "done"
    })

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

  componentDidMount() {
    this.loadDataFromMongo();
  };

  render() {
    return (
      <div>
        <h1>KanbanBox</h1>
        <h3>{this.state.toDo.name}</h3>
        <ToDoBox data={this.state.toDo}/>
        <DoingBox data={this.state.doing}/>
        <DoneBox data={this.state.done}/>
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
    var taskListNode = this.props.data.map(function(taskDataItem){
      return (
        <TaskFormatter name={taskDataItem.name} author={taskDataItem.author} key={taskDataItem._id} uniqueID={taskDataItem._id} description={taskDataItem.description}/>
      )
    });
    return (
      <div>
        <div>To Do Tasks
        { taskListNode }
        </div>
      </div>
    );
  };
};

class DoingBox extends React.Component {
  render() {
      var taskListNode = this.props.data.map(function(taskDataItem){
        console.log(taskDataItem)
      return (
        <TaskFormatter name={taskDataItem.name} author={taskDataItem.author} uniqueID={taskDataItem._id} description={taskDataItem.description}/>
      )

    });
    return (
      <div>
        <div>Doing Tasks
        {taskListNode}
        </div>
      </div>
    );
  }
}

class DoneBox extends React.Component {
  render() {
      var taskListNode = this.props.data.map(function(taskDataItem){
      return (
        <TaskFormatter uniqueID={taskDataItem._id} name={taskDataItem.name} author={taskDataItem.author}  description={taskDataItem.description}/>
      )
    });
    return (
      <div>
        <div>Done Tasks
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
    console.log(this.props);
    const req = new XMLHttpRequest();
    req.open('PUT', `/tasks/${this.props.uniqueID}`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": `${this.props.name}`,
      "author": `${this.props.author}`,
      "description": `${this.props.description}`,
      "status": "doing"
    }));
  }
  doneStatus () {
    console.log(this.props);
    const req = new XMLHttpRequest();
    req.open('PUT', `/tasks/${this.props.uniqueID}`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": `${this.props.name}`,
      "author": `${this.props.author}`,
      "description": `${this.props.description}`,
      "status": "done"
    }));
  }
  toDoStatus () {
    console.log(this.props);
    const req = new XMLHttpRequest();
    req.open('PUT', `/tasks/${this.props.uniqueID}`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": `${this.props.name}`,
      "author": `${this.props.author}`,
      "description": `${this.props.description}`,
      "status": "to-do"
    }));
  }
  render() {
    return (
      <div className='taskItem'>
        <h3>{this.props.name}</h3>
        <p>{this.props.author}</p>
        <p>{this.props.description}</p>
        <button onClick={this.doingStatus}> Doing </button>
        <button onClick={this.doneStatus}> Done </button>
        <button onClick={this.toDoStatus}> To Do</button>
      </div>
    );
  };
};


ReactDOM.render(
  <KanbanBox/>,
  document.getElementById('content')
)