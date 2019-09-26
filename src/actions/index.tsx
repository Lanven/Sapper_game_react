export const fillBoard = (row: number, call: number) => {
    return {
        type: "FILL_BOARD",
        row: row,
        call: call
    }
};

export const clickCellFlag = (row: number, call: number) => {
    return {
        type: "CLICK_CELL_FLAG",
        row: row,
        call: call
    }
};

export const updateFlagsAvailableCount = (flagsAvailableCount: number) => {
    return {
        type: "UPDATE_FLAGS_AVAILABLE_COUNT",
        value: flagsAvailableCount
    }
};

export const clickCell = (row: number, call: number) => {
    return {
        type: "CLICK_CELL",
        row: row,
        call: call
    }
};

export const setGameParams = (height: number, width: number, complexity: number) => {
    return {
        type: "SET_GAME_PARAMS",
        height: height,
        width: width,
        complexity: complexity
    }
};

export const generateNewBoard = () => {
    return {
        type: "GENERATE_NEW_BOARD"
    }
}

