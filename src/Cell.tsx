import React, {Component} from "react";

interface MyState {
  onMouseDown: any,
  isBomb: boolean,
  isOpen: boolean,
  isFlag: boolean,
  isLastClick: boolean,
  value: number | null
}

class Cell extends Component <MyState> {
  render() {
    const classNames = ['cell'];
    if (this.props.isOpen) {
      classNames.push('opened');
    }
    if (this.props.isBomb) {
      classNames.push('bomb');
    }
    if (this.props.isFlag) {
      classNames.push('flag');
    }
    if (this.props.isLastClick) {
      classNames.push('lastClick');
    }

    return <button className={classNames.join(' ')}
                   onMouseDown={this.props.onMouseDown}
    >
      {
        this.props.isOpen &&
        this.props.value
      }
    </button>
  }
}

export default Cell;