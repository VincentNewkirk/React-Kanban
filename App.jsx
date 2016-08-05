'use strict';
import React from 'react';
import ToDoBox from './kanbanReact/ToDoBox.jsx';
import DoingBox from './kanbanReact/DoingBox.jsx';
import DoneBox from './kanbanReact/DoneBox.jsx';
import NewTaskForm from './kanbanReact/NewTaskForm.jsx';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import style from "./scss/styles.scss";

class KanbanBox extends React.Component {
  constructor() {
    super();
    this.onMongoData = this.onMongoData.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }

  onMongoData(data){
    var formattedData = JSON.parse(data.currentTarget.response);
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

    const sendingObj = {
      toDo: toDoData,
      doing: doingData,
      done: doneData,
    }

    this.props.setItems(sendingObj);
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

  componentWillMount() {
    this.loadDataFromMongo();
  };

  render() {
    return (
      <div id="mainDiv">
        <div id="titleDiv"><h1>KanbanBoard</h1></div>
        <h3>{this.props.toDo.name}</h3>
        <ToDoBox data={this.props.toDo} edit={this.editHandler} handler={this.updateHandler}/>
        <DoingBox data={this.props.doing} edit={this.editHandler} handler={this.updateHandler}/>
        <DoneBox data={this.props.done} edit={this.editHandler} handler={this.updateHandler}/>
        <NewTaskForm handler={this.updateHandler}/>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  var stateData = state.kanban_reducer.toJS();

  return {
    toDo: stateData.toDo,
    doing: stateData.doing,
    done: stateData.done,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (data) => {
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