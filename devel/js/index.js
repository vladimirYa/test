import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Calendar from './calendar';
import './../less/style.less';

let initialState = {
    mo: [
        {
            beginTime: 240,
            endTime: 779
        }
    ],
    tu: [
        {
            beginTime: 120,
            endTime: 659
        }
    ],
    we: [
        {
            beginTime: 180,
            endTime: 719
        }
    ],
    th: [
        {
            beginTime: 420,
            endTime: 659
        }
    ],
    fr: [
        {
            beginTime: 480,
            endTime: 659
        }
    ],
    sa: [
        {
            beginTime: 120,
            endTime: 779
        }
    ],
    su: [
        {
            beginTime: 60,
            endTime: 659
        }
    ]
};

function calendar(state = [], action) {
    if (action.type == 'ADD_CALENDAR') {
        return [
            ...state,
            action.payload
        ]
    }
    return state;

}

let store = createStore(calendar);

store.subscribe(()=>{
  console.log('subscribe', store.getState());
});

store.dispatch({
    type: 'ADD_CALENDAR',
    payload: initialState
});

ReactDOM.render(
  <Provider store={store}>
    <Calendar/>
  </Provider>,
    document.getElementById('root'));
