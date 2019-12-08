import React, { Component} from "react";
import { connect } from "react-redux";
import "./TreeComponent.css";
import TreeElement from "./element/TreeElement";
import { setTreeExpanded } from "./TreeActions";

class TreeComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.onExpandClick = this.onExpandClick.bind(this);
    }

    render() {
        // console.log("ALL TREE: ", this.props.treeData);
        return <div className="tree-wrapper">
            <p>My Tree</p>
                { this.props.treeData.map((item) => (<TreeElement key={item.id} element={item} onExpandClick={this.onExpandClick} />)) }
        </div>;
    }

    // передаём эту функцию в дочерние expand-элементы
    onExpandClick(id, isExpanded) {
        var t = this;
        return function() {
            // console.log("change (" + id + ") " + isExpanded + " -> " + !isExpanded);
            if (t !== undefined)
            t.props.changeExpand(id, !isExpanded);
        }
    }
}

// заносим state в props
const mapStateToProps = (state) => {
    return {
         treeData: state.treeData
        // userLogin: state.userLogin,
    };
};

// заносим functions в props
const mapDispatchToProps = (dispatch) => {
    return {
        //changeUserPassw: (val) => dispatch(changeUserPassw(val))
        changeExpand: (id, value) => dispatch(setTreeExpanded(id, value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);
