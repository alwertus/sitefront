import React from 'react';
import {connect} from "react-redux";

class PageContainer extends React.Component {
    render() {
        if (!this.props.menuitem) {
            return (<p>Choise menu</p>);
        }
        return (
            <div>
                <p>Это длинная длинная страничка {this.props.menuitem.name}, и ID у неё = {this.props.menuitem.id}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // состояние из AllReducers
        menuitem: state.activeMainMenuItem
    };
}

export default connect(mapStateToProps)(PageContainer);
