'use strict';
// var data = [
//   {id:1, name: "Cats are awesome", author: 'joejoebinks3'},
//   {id:2, name: "Dogs are awesome", author: 'sgnl'},
//   {id:3, title: "Turtles are awesome", author: 'jaywon'},
//   {id:4, title: "Birds are awesome", author: 'theRemix'},
// ]

class KanbanBox extends React.Component {
  constructor() {
    super();
    this.state = {
      data : []
    }
    this.onMongoData = this.onMongoData.bind(this)
  }

  onMongoData(data){
    console.log(data);
    const parsedMongoData = JSON.parse(data.currentTarget.response);
    this.setState({ data: parsedMongoData});
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
        <h3>{this.state.data.name}</h3>
        <ToDoBox data={this.state.data}/>
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
    console.log(taskDataItem);
      return (
        <DoingBox name={taskDataItem.name} author={taskDataItem.author} key={taskDataItem._id} description={taskDataItem.description}/>
      )
    });
  console.log(this.props.data);
    return (
      <div>
        <h1>To Do Tasks</h1>
        { taskListNode }
      </div>
    );
  };
};

class DoingBox extends React.Component {
  render() {
    return (
      <div className='taskItem'>
        <h3>{this.props.name}</h3>
        <p>{this.props.author}</p>
        <p>{this.props.description}</p>
      </div>
    );
  };
};

// class DoneBox extends React.Component {

// }

ReactDOM.render(
  <KanbanBox/>,
  document.getElementById('content')
)