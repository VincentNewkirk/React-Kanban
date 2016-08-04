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
      return Immutable.fromJS(action.data);

    case 'DELETE_ITEM':
      return state.delete(action.data);

    case 'EDIT_ITEM':

      switch(action.data.columnName){
        case 'to-do':
          var storeStateToJS = state.toJS();
          storeStateToJS.toDo[action.data.index] = action.data;
          return Immutable.fromJS(storeStateToJS);
        case 'doing':
          var storeStateToJS = state.toJS();
          storeStateToJS.doing[action.data.index] = action.data;
          return Immutable.fromJS(storeStateToJS);
        case 'done':
          var storeStateToJS = state.toJS();
          storeStateToJS.done[action.data.index] = action.data;
          return Immutable.fromJS(storeStateToJS);
        default:
          return state;
      }

      return state.item(action.data);

    default:
      return newState;
  }
};

export default kanbanReducer;