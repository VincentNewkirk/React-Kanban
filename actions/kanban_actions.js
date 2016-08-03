'use strict';

export const setItems = (data) => {
  dispatch({
    type: 'SET_ITEMS',
    data
  });
};

export const deleteItem = (data) => {
  dispatch({
    type: 'DELETE_ITEM',
    data
  });
};
