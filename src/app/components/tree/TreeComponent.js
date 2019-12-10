import React, { Component} from "react";
import { connect } from "react-redux";
import "./TreeComponent.css";
import TreeElement from "./element/TreeElement";
import TreeButton from "./element/TreeButton";
import { setTreeExpanded, setTreeActivePage } from "./TreeActions";

class TreeComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.onExpandClick = this.onExpandClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
    }

    render() {
        // console.log("ALL TREE: ", this.props.treeData);
        return <div className="tree-wrapper">
            <p>My Tree</p>
            <div className="tree-controls-line">
                <TreeButton title={"-"}/>
                <TreeButton title={"+"}/>
            </div>
            { this.props.treeData.map((item) => (<TreeElement key={item.id}
                                                              element={item}
                                                              onExpandClick={this.onExpandClick}
                                                              onMenuClick={this.onMenuClick}
                                                              activeMenu={this.props.activePage}/>)) }
        </div>;
    }

    // onClick показать/скрыть ветку дерева
    onExpandClick(id, isExpanded) {
        var t = this;
        return function() {
            if (t !== undefined) t.props.changeExpand(id, !isExpanded);
        }
    }

    // onClick менюшки
    //TODO добавить намерение перезагрузить страницу
    onMenuClick(id) {
        var t = this;
        return function() {
            if (t !== undefined) t.props.setActivePage(id);
        }
    }
}

// заносим state в props
const mapStateToProps = (state) => {
    return {
        treeData: state.treeData,
        activePage: state.treeActivePage
        // userLogin: state.userLogin,
    };
};

// заносим functions в props
const mapDispatchToProps = (dispatch) => {
    return {
        //changeUserPassw: (val) => dispatch(changeUserPassw(val))
        setActivePage: (val) => dispatch(setTreeActivePage(val)),
        changeExpand: (id, value) => dispatch(setTreeExpanded(id, value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);
