import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Calendar from './calendar';
import './../less/style.less';

let initialState = {
    "mo": [{
        "beginTime": 240,
        "endTime": 779
    }],
    "tu": [],
    "we": [],
    "th": [{
            "beginTime": 240,
            "endTime": 779
        },
        {
            "beginTime": 1140,
            "endTime": 1319
        }
    ],
    "fr": [{
        "beginTime": 660,
        "endTime": 1019
    }],
    "sa": [{
        "beginTime": 0,
        "endTime": 1439
    }],
    "su": []
}


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
