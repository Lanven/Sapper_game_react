import React, {Component} from "react";
import Cell from "./Cell";
import {connect} from "react-redux";

interface Props {
    dispatch: any,
}

interface MappedStateToProps {
    state: any,
    row: number,
    call: number
}

type ComponentProps = Partial<MappedStateToProps> & Props;

class Board extends Component <ComponentProps> {

    renderCell(row: any, call: any) {

        let changeCell = (button: number) => {
            debugger
            if (button == 2) {
                this.props.dispatch(
                    {
                        type: "CLICK_CELL_FLAG",
                        row: row,
                        call: call
                    }
                )
            }

            if (button == 0 && !this.props.state.list[row][call].isFlag) {
                this.props.dispatch(
                    {
                        type: "CLICK_CELL",
                        row: row,
                        call: call
                    }
                )
            }
        }

        let clickCellEvent = (event: MouseEvent) => {
            debugger
            event.preventDefault();
            event.stopPropagation()

            let button = event.button;

            if (!this.props.state.bombsList) {
                Promise.resolve(this.props.dispatch(
                    {
                        type: "FILL_BOARD",
                        row: row,
                        call: call
                    }
                )).then(
                    () => changeCell(button)
                )
            } else {
                changeCell(button);
            }

        };

        return <Cell
            value={this.props.state.list[row][call].value}
            isOpen={this.props.state.list[row][call].isOpen}
            isFlag={this.props.state.list[row][call].isFlag}
            isBomb={this.props.state.bombsList ? (this.props.state.bombsList.indexOf(Math.round((row)*this.props.state.height + call + 1)) == -1) : false}
            onMouseDown={clickCellEvent}
        />
    }

    render() {
        const list: number[][] = this.props.state.list;

        return (
            <div>
                {
                    list.map((row, i) => (
                        <div key={i}>
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

const mapStateToProps = (state: any) => ({state: state});
export default connect(mapStateToProps)(Board);