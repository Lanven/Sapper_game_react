const checkIsWinner = function(state: any, row: number, call: number) {
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
        state.statusGame = 2;
        for (let i: number = 0; i < state.height; i++) {
            for (let j: number = 0; j < state.width; j++) {
                if (state.list[i][j].isOpen === false) {
                    state.list[i][j].isFlag = true;
                }
            }
        }
    }
}

export default checkIsWinner