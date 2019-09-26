const getCellValue = function (state: any, bombsList: any, row: number, call: number) {
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

export default getCellValue