import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import MainMenuRender from "./MainMenuRender";
import { itemsFetchData } from "../../actions/PageList";


class MainMenu extends Component {

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <MainMenuRender pages={this.props.pages} act={this.props.action} />
        );
    }
}

function mapStateToProps(state) {                                                                                       // состояние в Props
    return {
        pages: state.pageList
    };
}

function matchDispatchToProps(dispatch) {                                                                               // функция в Props
    // deprecated
    // return bindActionCreators({action: updatePageList}, dispatch);
    return {
        fetchData: () => dispatch(itemsFetchData())
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(MainMenu);
