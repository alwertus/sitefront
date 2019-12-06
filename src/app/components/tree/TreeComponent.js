import React, { Component} from "react";
import { connect } from "react-redux";
import "./TreeComponent.css";
import TreeElement from "./element/TreeElement";
// import setNewTree from "./TreeActions";

class TreeComponent extends Component {


    constructor(props, context) {
        super(props, context);
        this.onExpandClick = this.onExpandClick.bind(this);
    }

    render() {
        console.log(this.props);
        return <div className="tree-wrapper">
            <p>My Tree</p>
                { this.props.treeData.map((item) => (<TreeElement key={item.id} element={item} onExpandClick={this.onExpandClick} />)) }
        </div>;
    }

    onExpandClick(id, isExpanded) {
        return function() {
            console.log("clicked to id=" + id + " " + isExpanded);
        }
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
        setNewTree: function(param) {
            // dispatch(setNewTree(param));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);
