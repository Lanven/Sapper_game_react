const openNearNullCell = function (state: any, row: number, call: number) {
    for (let i: number = Math.max(row - 1, 0); i <= Math.min(row + 1, (state.height - 1)); i++) {
        for (let j: number = Math.max(call - 1, 0); j <= Math.min(call + 1, (state.width - 1)); j++) {
            let ll = state.bombsList.indexOf(Math.round((i) * state.height + j + 1))
            if ((state.bombsList.indexOf(Math.round((i) * state.height + j + 1)) === -1) && state.list[i][j].isOpen === false && state.list[i][j].isFlag === false) {
                state.list[i][j].isOpen = true;
                if (state.list[i][j].value) {
                    continue
                }
                openNearNullCell(state, i, j);
            }
        }
    }
}

export default openNearNullCell