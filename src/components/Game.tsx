import React, {Component} from 'react';
import Board from "./Board";
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Nav} from 'react-bootstrap'
import {bindActionCreators} from "redux";
import {setGameParams, generateNewBoard} from "../action_creators";

interface Props {
    setGameParams: any,
    generateNewBoard: any
}

interface MappedStateToProps {
    state: any,
}

type ComponentProps = Partial<MappedStateToProps> & Props;


class Game extends Component <ComponentProps> {

    setGamesParams (height: number, width: number, complexity: number) {
        this.props.setGameParams(height, width, complexity);
        this.props.generateNewBoard();
    }

    componentWillMount() {
        this.setGamesParams(9, 9, 10);
    }

    render() {
        return(
            <div>
                <Nav fill variant="pills" defaultActiveKey="beginner" className="menuButtons">
                    <Nav.Item>
                        <Nav.Link eventKey="beginner"
                                  onClick={() => this.setGamesParams(9,9,10)}>
                            Новичок
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="experienced"
                                  onClick={() => this.setGamesParams(16,16,40)}>
                            Бывалый
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="expert"
                                  onClick={() => this.setGamesParams(16,30,99)}>
                            Эксперт
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <div className='board'>
                    <Row className="row_header">
                        <Col xs={4} style={{textAlign: 'left'}}>
                            <div className="imageFlag">
                            </div>
                            <label className="labelFlag">
                                {this.props.state.flagsAvailableCount}
                            </label>
                        </Col>
                        <Col xs={4}>
                            <button
                                onClick={ () =>
                                    this.props.generateNewBoard()
                                }
                                className="glyphicon glyphicon-refresh">
                            </button>
                        </Col>
                        <Col xs={4}></Col>
                    </Row>

                    <div className="board_container">
                        <Board onContextMenu="return false;"/>
                    </div>
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <div>
                                    {
                                        this.props.state.statusGame === 2 &&
                                            <span>Вы выиграли</span>
                                    }
                                    {
                                        this.props.state.statusGame === 1 &&
                                            <span>Вы проиграли</span>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch: any) {
    const actionCreatorsObj = {
        setGameParams: setGameParams,
        generateNewBoard: generateNewBoard
    };
    return bindActionCreators(actionCreatorsObj, dispatch)
}

const mapStateToProps = (state: any) => ({state: state});
export default connect(mapStateToProps, matchDispatchToProps)(Game)