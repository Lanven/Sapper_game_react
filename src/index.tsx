import React from 'react';

import {Provider} from "react-redux";

import ReactDOM from 'react-dom';

import Game from "./components/Game";
import './index.css';

import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import reducerCases from "./reducer";

const store = createStore(reducerCases, {},
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());

ReactDOM.render(
    <Provider store={store}>
        <div>
            <h2>Добро пожаловать в игру "Сапер"</h2>
            <Game />
        </div>
    </Provider>
   ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
