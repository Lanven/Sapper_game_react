import React, {Component} from "react";
import {connect} from "react-redux";


interface MyState {
  row: any,
  call: any,
  onClick: any,
  value: any
}

class Cell extends Component <MyState> {
  render() {
    return <button className="cell"
      onClick={this.props.onClick}
    >
      {this.props.value}
    </button>
  }
}

const mapStateToProps = (state: any) => ({name: state.value});

export default connect(mapStateToProps)(Cell);