import React, {Component} from "react";
import {connect} from "react-redux";


interface MyState {
  row: number,
  call: number,
  onClick: any,
  list: any[][],
  bombsList: any[],
  isBomb: number
}

class Cell extends Component <MyState> {
  render() {
    const classNames = ['cell'];
    if (this.props.list[this.props.row][this.props.call].isOpen) {
      classNames.push('opened');
    }
    if (this.props.isBomb !== -1) {
      classNames.push('bomb');
    }

    return <button className={classNames.join(' ')}
      onClick={this.props.onClick}
    >
      {
        this.props.list[this.props.row][this.props.call].isOpen &&
        this.props.list[this.props.row][this.props.call].value
      }
    </button>
  }
}

const mapStateToProps = (state: any) => ({list: state.list, bombsList: state.bombsList});

export default connect(mapStateToProps)(Cell);