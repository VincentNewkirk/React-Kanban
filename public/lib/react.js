'use strict';

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
    this.editHandler = this.editHandler.bind(this);
  }

  onMongoData(data){
    console.log(data);
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

  editHandler(editCard) {
    const req = new XMLHttpRequest();
    req.addEventListener('load', (res) => {
        if(JSON.parse(res.currentTarget.responseText)){
        this.loadDataFromMongo();
      }
    })
    console.log(editCard);
    req.open('PUT', `/tasks/${editCard._id}`);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({
      "name": editCard.name,
      "author": editCard.author,
      "description": editCard.description,
      "assigned": editCard.assigned,
      "priority": editCard.priority,
      "status": editCard.status,
    }));
  }

  componentDidMount() {
    this.loadDataFromMongo();
  };

  render() {
    return (
      <div id="mainDiv">
        <div id="titleDiv"><h1>KanbanBox</h1></div>
        <h3>{this.state.toDo.name}</h3>
        <ToDoBox data={this.state.toDo} edit={this.editHandler} handler={this.updateHandler}/>
        <DoingBox data={this.state.doing} edit={this.editHandler} handler={this.updateHandler}/>
        <DoneBox data={this.state.done} edit={this.editHandler} handler={this.updateHandler}/>
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

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.postTask = this.postTask.bind(this);
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
  }

  render() {
    return (
      <div>
        <h3> New Task </h3>
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
    )
  };
};

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
        <EditForm author={this.props.author}
        assigned={this.props.assigned}
        uniqueID={this.props.uniqueID}
        priority={this.props.priority}
        name={this.props.name}
        handler={this.props.handler}
        status={this.props.status}
        edit={this.props.edit}
        description={this.props.description}/>
      </div>
    );
  };
};

class EditForm extends React.Component {
  constructor() {
    super();
    this.putRequest = this.putRequest.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.state ={
      author: '',
      name: '',
      description: '',
      assigned: '',
      priority: '',
      status: '',
      _id: '',
    }
  }

  componentDidMount() {
    this.setState({
      author: this.props.author,
      name: this.props.name,
      description: this.props.description,
      assigned: this.props.assigned,
      priority: this.props.priority,
      status: this.props.status,
      _id: this.props.uniqueID,
    })
  };

  handleInputUpdate(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;

    this.setState(newState)
  }

  putRequest() {
    this.props.edit(this.state);
  }

  render() {
    return (
      <div>
        <p>Created By: <input onChange={this.handleInputUpdate} type='text' id='author' value={this.state.author} /></p>
        <p>Title: <input type='text' onChange={this.handleInputUpdate} id='name' value={this.state.name} /></p>
        <p>Assigned To: <input onChange={this.handleInputUpdate} type='text' id='assigned' value={this.state.assigned} /></p>
        <p>Description: <input onChange={this.handleInputUpdate} type='text' id='description' value={this.state.description} /></p>
        <select id='priority' onChange={this.handleInputUpdate} name='priority'>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Blocker">Blocker</option>
        </select>
        <button type="submit" onClick={this.putRequest}>Edit</button>
      </div>
    )
  }
}

ReactDOM.render(
  <KanbanBox/>,
  document.getElementById('content')
)