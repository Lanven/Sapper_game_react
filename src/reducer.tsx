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

const reducerCases = (state: State = initialState, action: any): State => {

    switch (action.type) {
        case 'SET_GAME_PARAMS': {
            return { // todo: 2
                ...state,
                // height: action.height,
                // width: action.width,
                // complexity: action.complexity,
                // flagsAvailableCount: action.complexity,
                ...action,
                statusGame: 0
            };
        }

        case 'UPDATE_FLAGS_AVAILABLE_COUNT': {
            return {
                ...state,
                flagsAvailableCount: action.value
            };
        }
        case 'CLICK_CELL_FLAG': {
            let list:CellObj[][] = [...state.list];
            list[action.row][action.call].isFlag = !list[action.row][action.call].isFlag;

            return {
                ...state,
                list
            };
        }
        case 'CLICK_CELL': {

            let statusGame: number = state.statusGame;
            let list:CellObj[][] = [...state.list];
            let flagsAvailableCount: number = state.flagsAvailableCount;

            list[action.row][action.call].isOpen = true;
            if (state.bombsList && state.bombsList.indexOf(Math.round((action.row) * state.height + action.call + 1)) !== -1) {
                alert('BOOM!!!');
                statusGame = 1;
                flagsAvailableCount = 0;
                list = state.list.map((o: any, i: number) => o.map((item: any) => ({...item, isOpen: true})));
                list[action.row][action.call].isLastClick = true;
            } else {
                openNearNullCell(list, state.height, state.width, state.bombsList, action.row, action.call);

                const isWinner = checkIsWinner(list, state.height, state.width, state.bombsList, action.row, action.call);
                if (isWinner) {
                    statusGame = 2;
                    flagsAvailableCount = 0;
                }
            }

            return {
                ...state,
                statusGame,
                flagsAvailableCount,
                list
            };
        }
        case 'GENERATE_NEW_BOARD': {
            const list: CellObj[][] = [];
            for (let i = 0; i < state.height; i++) {
                list[i] = [];
                for (let j = 0; j < state.width; j++) {
                    list[i][j] = {value: null, isOpen: false, isFlag: false, isLastClick: false};
                }
            }

            return {
                ...state,
                list: list,
                bombsList: null,
                statusGame: 0,
                flagsAvailableCount: state.complexity
            };
        }
        case 'FILL_BOARD': {
            let list: CellObj[][] = [...state.list];
            let bombsList: number[] | null = [];
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

            return {
                ...state,
                list: list,
                bombsList: bombsList
            }
        }
        default:
            return state;
    }


}

export default reducerCases;
