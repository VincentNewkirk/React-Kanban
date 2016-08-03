'use strict';

import Immutable, {Map} from 'immutable';

let initialState = Map({
  toDo: Immutable.List(),
  doing: Immutable.List(),
  done: Immutable.List(),
});

const kanbanReducer = (state = initialState, action) => {

  let newState = state;

  switch(action.type){

    case 'SET_ITEMS':
    console.log(action.data, 'ACTION DATA');
      // return {
      //   toDo: action.data[0],
      //   doing: action.data[1],
      //   done: action.data[2],
      // }
      console.log(state, 'reducer state');
      console.log(state.toArray(action.data), 'immutable');
      return Immutable.fromJS(action.data);

    case 'DELETE_ITEM':
      return state.delete(action.data);

    default:
      return newState;
  }
}

export default kanbanReducer;