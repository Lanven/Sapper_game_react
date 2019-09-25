import React, {Component} from "react";
import {Button} from 'react-bootstrap'

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
      classNames.push('color'+this.props.value);
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

    return <Button variant="light" className={classNames.join(' ')}
                   disabled={this.props.isOpen}
                   onMouseDown={(e: any) => this.props.onMouseDown(e)}
    >
      {
        this.props.isOpen &&
        this.props.value
      }
    </Button>
  }
}

export default Cell;