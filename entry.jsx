import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBox from './App.jsx';
import {createStore, combineReducers} from 'redux';
import * as reducers from './reducers';
import {Provider} from 'react-redux';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(
  <KanbanBox />,
  document.getElementById('content')
);