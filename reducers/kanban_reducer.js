'use strict';

import Immutable from 'immutable';

const initialState = Immutable.List();

const redditReducer = (state = initialState, action) => {

  let newState = state;

  switch(action.type){

    case 'SET_ITEMS':
      return Immutable.fromJS(action.data);

    case 'DELETE_ITEM':
      return state.delete(action.data);

    default:
      return newState;
  }
}

export default redditReducer;