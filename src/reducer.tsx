const reducerCases = (state: any, action: any) => {
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
                state.list[action.row][action.call].isLastClick = true;
                state.list.map((o: any, i: number) => o.map((item: any) => item.isOpen = true))
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

                openNearNullCell(action.row, action.call);

                let checkIsWinner = function(row: number, call: number) {
                    let isWinner = true;
                    for (let i: number = 0; i < state.height; i++) {
                        for (let j: number = 0; j < state.width; j++) {
                            if ((state.bombsList.indexOf(Math.round((i) * state.height + j + 1)) === -1) && state.list[i][j].isOpen === false) {
                                isWinner = false;
                                break;
                            }
                        }
                    }
                    if (isWinner) {
                        alert("Вы выиграли!!!")
                        for (let i: number = 0; i < state.height; i++) {
                            for (let j: number = 0; j < state.width; j++) {
                                if (state.list[i][j].isOpen === false) {
                                    state.list[i][j].isFlag = true;
                                }
                            }
                        }
                    }
                }

                checkIsWinner(action.row, action.call);
            }

            newState = {...state, list: state.list};
            break;
        }
        case 'GENERATE_NEW_BOARD': {
            interface CellObj {
                value: number | null;
                isOpen: boolean;
                isFlag: boolean;
                isLastClick: boolean
            }

            const list: CellObj[][] = [];
            for (let i = 0; i < state.height; i++) {
                list[i] = [];
                for (let j = 0; j < state.width; j++) {
                    list[i][j] = {value: null, isOpen: false, isFlag: false, isLastClick: false};
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

    return newState;
}

export default reducerCases;
