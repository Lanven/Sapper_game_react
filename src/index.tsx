import React from 'react';

import {createStore} from "redux";
import {Provider} from "react-redux";

import ReactDOM from 'react-dom';

import Board from "./Board";
import './index.css';

import * as serviceWorker from './serviceWorker';

const reducer = (state: any, action: any) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'SET_HEIGHT':
            newState = {...state, height: action.value};
            break;
        case  'SET_WIDTH':
            newState = {...state, width: action.value};
            break;
        case 'SET_COMPLEXITY':
            newState = {...state, complexity: action.value};
            break;
        case 'CLICK_CELL_FLAG': {
            state.list[action.row][action.call].isFlag = !state.list[action.row][action.call].isFlag;

            newState = {...state, list: state.list};
            break;
        }
        case 'CLICK_CELL': {
            state.list[action.row][action.call].isOpen = true;
            if (state.bombsList.indexOf(Math.round((action.row) * state.height + action.call + 1)) !== -1) {
                alert('BOOM!!!');
                state.list.map((o: any, i: number) => o.map((item: any) => {
                    item.isOpen = true;
                    item.isFlag = false;
                    return item
                }))
            } else {
                let openNearNullCell = function (row: number, call: number) {
                    for (let i: number = Math.max(row - 1, 0); i <= Math.min(row + 1, (state.height - 1)); i++) {
                        for (let j: number = Math.max(call - 1, 0); j <= Math.min(call + 1, (state.width - 1)); j++) {
                            if ((state.bombsList.indexOf(Math.round((i) * state.height + j + 1)) === -1) && state.list[i][j].isOpen === false && state.list[i][j].isFlag === false) {
                                state.list[i][j].isOpen = true;
                                if (state.list[i][j].value) {
                                    continue
                                }
                                openNearNullCell(i, j);
                            }
                        }
                    }
                }

                openNearNullCell(action.row, action.call)
            }

            newState = {...state, list: state.list};
            break;
        }
        case 'GENERATE_NEW_BOARD': {
            interface CellObj {
                value: number | null;
                isOpen: boolean;
                isFlag: boolean;
            }

            const list: CellObj[][] = [];
            for (let i = 0; i < state.height; i++) {
                list[i] = [];
                for (let j = 0; j < state.width; j++) {
                    list[i][j] = {value: null, isOpen: false, isFlag: false};
                }
            }

            newState = {...state, list: list};
            break;
        }
        case 'FILL_BOARD': {
            let list = state.list;
            let bombsList: any = [];
            let cellClick = Math.round((action.row) * state.height + action.call + 1)

            while (bombsList.length <= state.complexity) {
                let randomNumber = Math.ceil(Math.random() * state.height * state.width);
                let found = false;
                if (randomNumber === cellClick) {
                    continue
                }

                for (let i = 0; i < bombsList.length; i++) {
                    if (bombsList[i] === randomNumber) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    bombsList[bombsList.length] = randomNumber;
                }
            }

            let getCellValue = function (row: number, call: number) {
                let cellValue: any = null;
                for (let i: number = Math.max(row - 1, 0); i <= Math.min(row + 1, (state.height - 1)); i++) {
                    for (let j: number = Math.max(call - 1, 0); j <= Math.min(call + 1, (state.width - 1)); j++) {
                        let index = Math.round((i) * state.height + j + 1);
                        if (bombsList.indexOf(index) !== -1) {
                            ++cellValue;
                        }
                    }
                }
                return cellValue
            };

            for (let listHeight = 0; listHeight < state.height; listHeight++) {
                for (let listWidth = 0; listWidth < state.width; listWidth++) {
                    let listIndex = Math.round((listHeight) * state.height + listWidth + 1);
                    if (bombsList.indexOf(listIndex) === -1) {
                        list[listHeight][listWidth].value = getCellValue(listHeight, listWidth)
                    }
                }
            }

            newState = {...state, list: list, bombsList: bombsList};
            break;
        }
    }

/*    if (action.type === 'SET_HEIGHT') {

    }

    if (action.type === 'SET_WIDTH') {

    }

    if (action.type === 'SET_COMPLEXITY') {

    }

    if (action.type === 'CLICK_CELL') {

    }

    if (action.type === 'CLICK_CELL_FLAG') {

    }

    if (action.type === 'GENERATE_NEW_BOARD') {


    }

    if (action.type === "FILL_BOARD") {

    }*/

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

/*document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);*/

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
