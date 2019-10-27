import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {select} from "../actions/MainMenuSelect";

// компонент + логика

class MainMenuList extends React.Component {
    showList() {
        return this.props.menuitems.map((menuitem) => {
            return (
                <li onClick={() => this.props.select(menuitem)}
                    key={menuitem.id}>
                    {menuitem.id + "-" + menuitem.name}</li>
            );
        })
    }
    render() {
        return(
            <div>
                {this.showList()}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        menuitems: state.menuitems
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({select: select}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainMenuList);