import React, { Component} from "react";
import { connect } from "react-redux";
import SortableTree from "react-sortable-tree";
import "./TreeComponentModule.css";
import treeSetItems from "./TreeActions";
// import "../../../../node_modules/react-sortable-tree/style.css";
// import "./TreeComponent.css";

class TreeComponent extends Component {

    constructor(props) {                                                                                                // регистрация функций
        super(props);
        /*this.state = {
            treeData: [
                { title: "Chicken", expanded: true, children: [{ title: "Egg" }] }
            ]
        };*/
    }

    render() {
        return <div className="tree-wrapper">
            <div style={{ height: 500 }}>
                <SortableTree
                    treeData={this.props.treeData}
                    onChange={treeData => this.props.treeSetItems({ treeData })}
                />
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        treeData: state.treeData
        // userLogin: state.userLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        treeSetItems: (items) => dispatch(treeSetItems(items))
        // changeUserLogin: (val) => dispatch(changeUserLogin(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);
