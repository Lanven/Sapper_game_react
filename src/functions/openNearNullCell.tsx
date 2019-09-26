const openNearNullCell = function (list: any, height: number, width: number, bombsList: number[] | null, row: number, call: number) {
    for (let i: number = Math.max(row - 1, 0); i <= Math.min(row + 1, (height - 1)); i++) {
        for (let j: number = Math.max(call - 1, 0); j <= Math.min(call + 1, (width - 1)); j++) {
            if ((bombsList && bombsList.indexOf(Math.round((i) * height + j + 1)) === -1) && !list[i][j].isOpen && !list[i][j].isFlag) {
                list[i][j].isOpen = true;
                if (list[i][j].value) {
                    continue
                }
                openNearNullCell(list, height, width, bombsList, i, j);
            }
        }
    }
}

export default openNearNullCell