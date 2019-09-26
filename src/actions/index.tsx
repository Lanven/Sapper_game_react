import {ACTIONS} from "./constants";

export const fillBoard = (row: number, call: number) => {
    return {
        type: ACTIONS.FILL_BOARD,
        row: row,
        call: call
    }
};

export const clickCellFlag = (row: number, call: number) => {
    return {
        type: ACTIONS.CLICK_CELL_FLAG,
        row: row,
        call: call
    }
};

export const updateFlagsAvailableCount = (flagsAvailableCount: number) => {
    return {
        type: ACTIONS.UPDATE_FLAGS_AVAILABLE_COUNT,
        value: flagsAvailableCount
    }
};

export const clickCell = (row: number, call: number) => {
    return {
        type: ACTIONS.CLICK_CELL,
        row: row,
        call: call
    }
};

export const setGameParams = (height: number, width: number, complexity: number) => {
    return ({
        type: ACTIONS.SET_GAME_PARAMS,
        height,
        width, // todo: 1
        complexity
    })
};

export const generateNewBoard = () => {
    return {
        type: ACTIONS.GENERATE_NEW_BOARD
    }
};

