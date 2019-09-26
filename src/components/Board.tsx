import React, {Component} from "react";
import Cell from "./Cell";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {fillBoard, clickCellFlag, updateFlagsAvailableCount, clickCell} from "../action_creators";

interface Props {
    onContextMenu: string,
    fillBoard: any,
    clickCellFlag: any,
    updateFlagsAvailableCount: any,
    clickCell: any
}

interface MappedStateToProps {
    state: any,
    row: number,
    call: number
}

type ComponentProps = Partial<MappedStateToProps> & Props;

class Board extends Component <ComponentProps> {

     clickCellEvent(event: MouseEvent, row: number, call: number, isOpen: boolean, isFlag: boolean) {
        let button = event.button;

        if (!this.props.state.bombsList) {
            this.props.fillBoard(row, call);
        }

        if (button === 2 && !isOpen) {
            if (!isFlag && this.props.state.flagsAvailableCount === 0) return;

            this.props.clickCellFlag(row, call);

            let flagsAvailableCount = this.props.state.flagsAvailableCount + (isFlag ? 1: -1);
            this.props.updateFlagsAvailableCount(flagsAvailableCount);
        }

        if (button === 0 && !isFlag && !isOpen) {
            this.props.clickCell(row, call);
        }
    };

    renderCell(row: any, call: any) {
        const isOpen: boolean = this.props.state.list[row][call].isOpen;
        const isFlag: boolean = this.props.state.list[row][call].isFlag;
        const isLastClick: boolean = this.props.state.list[row][call].isLastClick;
        const isBomb = this.props.state.bombsList ? (this.props.state.bombsList.indexOf(Math.round((row)*this.props.state.height + call + 1)) !== -1) : false;

        return <Cell
            value={this.props.state.list[row][call].value}
            isOpen={isOpen}
            isFlag={isFlag}
            isBomb={isBomb}
            isLastClick={isLastClick}
            onMouseDown={(e: any) => this.clickCellEvent(e, row, call, isOpen, isFlag)}
        />
    }

    render() {
        const list: number[][] = this.props.state.list;

        return (
            <div className="container">
                {
                    list.map((row, i) => (
                        <div className="column" key={i}>
                            {
                                row.map((col, j) => (
                                    this.renderCell(i, j)
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

function matchDispatchToProps(dispatch: any) {
    const actionCreatorsObj = {
        fillBoard: fillBoard,
        clickCellFlag: clickCellFlag,
        updateFlagsAvailableCount: updateFlagsAvailableCount,
        clickCell: clickCell
    };
    return bindActionCreators(actionCreatorsObj, dispatch)
}

const mapStateToProps = (state: any) => ({state: state});
export default connect(mapStateToProps, matchDispatchToProps)(Board);