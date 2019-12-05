import React, { Component} from "react";
import { connect } from "react-redux";
import "./TreeComponent.css";
import TreeElement from "./element/TreeElement";
// import setNewTree from "./TreeActions";

class TreeComponent extends Component {

    render() {
        console.log(this.props);
        return <div className="tree-wrapper">
            <p>My Tree</p>
            { this.props.treeData.map((item) => (<TreeElement key={item.id} element={item} />)) }
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
        setNewTree: function(param) {
            // dispatch(setNewTree(param));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);
