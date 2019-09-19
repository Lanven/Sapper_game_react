import React, {Component} from 'react';

import {createStore} from "redux";
import {connect, Provider} from "react-redux";

import ReactDOM from 'react-dom';

import Board from "./Board";
import './index.css';

import * as serviceWorker from './serviceWorker';

const reducer = (state: any, action: any) => {
    let newState = Object.assign({}, state);

    if (action.type === 'SET_HEIGHT') {
        newState = {...state, height: action.value}
    }

    if (action.type === 'SET_WIDTH') {
        newState = {...state, width: action.value}
    }

    if (action.type === 'SET_COMPLEXITY') {
        newState = {...state, complexity: action.value}
    }

    if (action.type === 'CLICK_CELL') {
        debugger
        if (state.bombsList.indexOf(Math.round((action.row - 1)*state.height + action.call)) !== -1) {
            alert('BOOM!!!')
        } else {
            let cellValue: number;

        }



    }

    if (action.type === 'GENERATE_NEW_BOARD') {
        const create = (amount: number) => new Array(amount).fill(null);
        const matrix = (rows: number, cols: number) => create(cols).map((o, i) => create(rows))

        const list = matrix(state.height, state.width);

        let bombsList: any = [];

        while (bombsList.length <= state.complexity) {
            let randomNumber = Math.ceil(Math.random() * state.height * state.width);
            let found = false;
            for (let i = 0; i < bombsList.length; i++) {
                if (bombsList[i] === randomNumber){
                    found = true;
                    break;
                }
            }
            if (!found) { bombsList[bombsList.length]=randomNumber; }
        }
        newState = {...state, list: list, bombsList: bombsList}
    }

    return newState;
}


const store = createStore(reducer, {},
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());

store.dispatch(
    {
        type: "SET_HEIGHT",
        value: 6
    }
)

store.dispatch(
    {
        type: "SET_WIDTH",
        value: 6
    }
)

store.dispatch(
    {
        type: "SET_COMPLEXITY",
        value: 6
    }
)

store.dispatch(
    {
        type: "GENERATE_NEW_BOARD"
    }
)


ReactDOM.render(
    <Provider store={store}>
        <Board />
    </Provider>
   ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
