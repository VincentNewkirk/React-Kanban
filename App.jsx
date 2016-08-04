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

    const sendingData = [];
    sendingData.push(toDoData);
    sendingData.push(doingData);
    sendingData.push(doneData);

    const sendingObj = {
      toDo: toDoData,
      doing: doingData,
      done: doneData,
    }

    console.log(sendingObj, 'SENDING DATA');

    this.props.setItems(sendingObj);
    // this.setState({
    //   toDo: toDoData,
    //   doing: doingData,
    //   done: doneData,
    // });
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

  componentWillMount() {
    this.loadDataFromMongo();
  };

  render() {
    console.log(this.props, 'PROPS')
    return (
      <div id="mainDiv">
        <div id="titleDiv"><h1>KanbanBoard</h1></div>
        <h3>{this.props.toDo.name}</h3>
        <ToDoBox data={this.props.toDo} edit={this.editHandler} handler={this.updateHandler}/>
        <DoingBox data={this.props.doing} edit={this.editHandler} handler={this.updateHandler}/>
        <DoneBox data={this.props.done} edit={this.editHandler} handler={this.updateHandler}/>
      </div>
    );
  };
};

// KanbanBox.propTypes = {
//     data: React.PropTypes.array
// };

// KanbanBox.defaultProps = {
//   data: []
// }

const mapStateToProps = (state, ownProps) => {
  console.log(state.kanban_reducer.toJS(), 'mapStateToProps STATE');
  var stateData = state.kanban_reducer.toJS();
  console.log(stateData, 'state data');

  return {
    // data: state.kanban_reducer._root.entries,
    toDo: stateData.toDo,
    doing: stateData.doing,
    done: stateData.done,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (data) => {
      // const toDoData = state.filter(function(el, index){
      //   return parsedMongoData[index].status === "to-do"
      // });

      // const doingData = parsedMongoData.filter((el, index) => {
      //   return parsedMongoData[index].status === "doing"
      // });

      // const doneData = parsedMongoData.filter((el, index) => {
      //   return parsedMongoData[index].status === "done"
      // });
      console.log(data, 'DATAAAA')
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