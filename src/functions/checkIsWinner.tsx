const checkIsWinner = function(list: any, height: number, width: number, bombsList: number[] | null, row: number, call: number) {
    let isWinner = true;
    for (let i: number = 0; i < height; i++) {
        for (let j: number = 0; j < width; j++) {
            if ((bombsList && bombsList.indexOf(Math.round((i) * height + j + 1)) === -1) && list[i][j].isOpen === false) {
                isWinner = false;
                break;
            }
        }
    }
    if (isWinner) {
        for (let i: number = 0; i < height; i++) {
            for (let j: number = 0; j < width; j++) {
                if (list[i][j].isOpen === false) {
                    list[i][j].isFlag = true;
                }
            }
        }
    }

    return isWinner;
}

export default checkIsWinner