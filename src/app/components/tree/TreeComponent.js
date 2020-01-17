import React, { Component} from "react";
import { connect } from "react-redux";
import "./TreeComponent.css";
import TreeElement from "./element/TreeElement";
import TreeButton from "./element/TreeButton";
import { setTreeExpanded, setTreeActivePage, treeItemsFetchData } from "./TreeActions";

class TreeComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.onExpandClick = this.onExpandClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onBtnAddClick = this.onBtnAddClick.bind(this);
        this.onBtnRemoveClick = this.onBtnRemoveClick.bind(this);
    }

    render() {
        // console.log("ALL TREE: ", this.props.treeData);

        if (this.props.treeNeedUpdate) {
            this.props.treeItemsFetchData();
        }

        return <div className="tree-wrapper">
            <p>My Tree</p>
            <div className="tree-controls-line">
                <TreeButton title="-" id="btn-remove" onClick={this.onBtnRemoveClick}/>
                <TreeButton title="+" id="btn-add" onClick={this.onBtnAddClick}/>
            </div>
            { this.props.treeData.map((item) => (<TreeElement key={item.id}
                                                              element={item}
                                                              onExpandClick={this.onExpandClick}
                                                              onMenuClick={this.onMenuClick}
                                                              activeMenu={this.props.activePage}/>)) }
        </div>;
    }

    // onClick button ADD
    onBtnAddClick() {
        var t = this;
        return function() {
            console.log("onButtonAddClick");
            t.props.treeItemsFetchData();
        }
    }

    // onClick button Remove
    onBtnRemoveClick() {
        var t = this;
        return function() {
            if (t.props.activePage === "") {
                alert("Необходимо выбрать страницу для удаления");
                return;
            }

            if (window.confirm("Действительно удалить выбранную страницу?")) {
                console.log("try delete ", t.props.activePage);
            }
        }
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
        activePage: state.treeActivePage,
        treeNeedUpdate: state.treeNeedUpdate
        // userLogin: state.userLogin,
    };
};

// заносим functions в props
const mapDispatchToProps = (dispatch) => {
    return {
        //changeUserPassw: (val) => dispatch(changeUserPassw(val))
        setActivePage: (val) => dispatch(setTreeActivePage(val)),
        changeExpand: (id, value) => dispatch(setTreeExpanded(id, value)),
        treeItemsFetchData: () => dispatch(treeItemsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);
