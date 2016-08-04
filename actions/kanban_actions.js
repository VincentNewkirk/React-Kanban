'use strict';

export const setItems = (data) => {
  dispatch({
    type: 'SET_ITEMS',
    toDo: null,
    data
  });
};

export const deleteItem = (data) => {
  dispatch({
    type: 'DELETE_ITEM',
    data
  });
};

export const editItem = (data) => {
  dispatch({
    type: 'EDIT_ITEM',
    data
  });
};