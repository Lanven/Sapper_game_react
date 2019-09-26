import openNearNullCell from './functions/openNearNullCell';
import checkIsWinner from "./functions/checkIsWinner";
import getCellValue from "./functions/getCellValue";

interface CellObj {
    value: number | null;
    isOpen: boolean;
    isFlag: boolean;
    isLastClick: boolean
}

interface State {
    height: number;
    width: number;
    complexity: number;
    flagsAvailableCount: number;
    statusGame: number;
    list: CellObj[][];
    bombsList: number[] | null;
}

const initialState: State = {
    height: 0,
    width: 0,
    complexity: 0,
    flagsAvailableCount: 0,
    statusGame: 0,
    list: [],
    bombsList: []
}

const reducerCases = (state: State = initialState, action: any) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'SET_GAME_PARAMS':
            newState = {...state, height: action.height, width: action.width, complexity: action.complexity, flagsAvailableCount: action.complexity, statusGame: 0};
            break;
        case 'UPDATE_FLAGS_AVAILABLE_COUNT':
            newState = {...state, flagsAvailableCount: action.value};
            break;
        case 'CLICK_CELL_FLAG': {
            state.list[action.row][action.call].isFlag = !state.list[action.row][action.call].isFlag;

            newState = {...state, list: state.list};
            break;
        }
        case 'CLICK_CELL': {
            state.list[action.row][action.call].isOpen = true;
            if (state.bombsList && state.bombsList.indexOf(Math.round((action.row) * state.height + action.call + 1)) !== -1) {
                alert('BOOM!!!');
                state.statusGame = 1;
                state.list[action.row][action.call].isLastClick = true;
                state.list.map((o: any, i: number) => o.map((item: any) => item.isOpen = true))
            } else {
                openNearNullCell(state, action.row, action.call);

                checkIsWinner(state, action.row, action.call);
                if (state.statusGame === 2) {
                    state.flagsAvailableCount = 0;
                }
            }

            newState = {...state, list: state.list, statusGame: state.statusGame, flagsAvailableCount: state.flagsAvailableCount};
            break;
        }
        case 'GENERATE_NEW_BOARD': {
            const list: CellObj[][] = [];
            for (let i = 0; i < state.height; i++) {
                list[i] = [];
                for (let j = 0; j < state.width; j++) {
                    list[i][j] = {value: null, isOpen: false, isFlag: false, isLastClick: false};
                }
            }

            newState = {...state, list: list, bombsList: null, statusGame: 0, flagsAvailableCount: state.complexity};
            break;
        }
        case 'FILL_BOARD': {
            let list = state.list;
            let bombsList: any = [];
            let cellClick = Math.round((action.row) * state.height + action.call + 1);

            while (bombsList.length < state.complexity) {
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

            for (let listHeight = 0; listHeight < state.height; listHeight++) {
                for (let listWidth = 0; listWidth < state.width; listWidth++) {
                    let listIndex = Math.round((listHeight) * state.height + listWidth + 1);
                    if (bombsList.indexOf(listIndex) === -1) {
                        list[listHeight][listWidth].value = getCellValue(state, bombsList, listHeight, listWidth)
                    }
                }
            }

            newState = {...state, list: list, bombsList: bombsList};
            break;
        }
    }

    return newState;
}

export default reducerCases;
