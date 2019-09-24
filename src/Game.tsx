import React, {Component} from 'react';
import Board from "./Board";
import {connect} from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'

interface Props {
    dispatch: any,
}

interface MappedStateToProps {
    state: any
}

type ComponentProps = Partial<MappedStateToProps> & Props;


class Game extends Component <ComponentProps> {




    render() {

        return(
            <div className='board'>
                <Container>
                    <Row>
                        <Col xs={4}></Col>
                        <Col xs={4}>
                            <button>111</button>
                        </Col>
                        <Col xs={4}></Col>

                    </Row>
                </Container>
                <Board onContextMenu="return false;"/>
            </div>

        )
    }
}

const mapStateToProps = (state: any) => ({state: state});
export default connect(mapStateToProps)(Game)