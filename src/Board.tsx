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
        return <Cell
            row={row}
            call={call}
            isBomb={this.props.state.bombsList.indexOf(Math.round((row)*this.props.state.height + call + 1))}
            onClick={(event: Event) =>
                this.props.dispatch(
                    {
                        type: "CLICK_CELL",
                        row: row,
                        call: call
                    }
                )
            }
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