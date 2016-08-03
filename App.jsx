import React from 'react';
import ToDoBox from './kanbanReact/ToDoBox.jsx';
import DoingBox from './kanbanReact/DoingBox.jsx';
import DoneBox from './kanbanReact/DoneBox.jsx';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import style from "./scss/styles.scss";

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
    console.log(this.props);
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
        <div id="titleDiv"><h1>KanbanBoard</h1></div>
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

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.kanban_reducer.toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (data) => {
      console.log(data, 'set items data argument');
      dispatch({
        type: 'SET_ITEMS',
        data
      })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (KanbanBox);