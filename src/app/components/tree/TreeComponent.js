import React, { Component} from "react";
import { connect } from "react-redux";
import "./TreeComponent.css";
import TreeElement from "./element/TreeElement";
import TreeButton from "./element/TreeButton";
import { setTreeExpanded, setTreeActivePage, treeItemsFetchData, setTreeAddElement_ShowDialog, sendDelRecord, setPageData_NeedUpdate } from "./TreeActions";
import AddComponent from "./add/AddComponent";

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
            <div className={ "tree-controls-line" + this.disable_class() }>
                <TreeButton title="-" id="btn-remove" onClick={this.onBtnRemoveClick}/>
                <TreeButton title="+" id="btn-add" onClick={this.onBtnAddClick}/>
            </div>
            { this.addDialog() }
            <div className={ "tree-list" + this.disable_class() }>
                { this.props.treeData.map((item) => (<TreeElement key={item.id}
                                                                  element={item}
                                                                  onExpandClick={this.onExpandClick}
                                                                  onMenuClick={this.onMenuClick}
                                                                  activeMenu={this.props.activePage}/>)) }
            </div>
        </div>;
    }

    addDialog() {
        return this.props.treeAddElement_ShowDialog ? <AddComponent/> : <div/>;
    }

    disable_class() { return this.props.treeAddElement_ShowDialog ? " disabled" : "" };

    // onClick button ADD
    onBtnAddClick() {
        var t = this;
        return function() {
            console.log("onButtonAddClick");
            t.props.setTreeAddElement_ShowDialog(true);
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
                t.props.sendDelRecord(t.props.activePage);
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
            if (t !== undefined) {
                t.props.setActivePage(id);
                t.props.setPageData_NeedUpdate(true);
            }
        }
    }
}

// заносим state в props
const mapStateToProps = (state) => {
    return {
        treeData: state.treeData,
        activePage: state.treeActivePage,
        treeNeedUpdate: state.treeNeedUpdate,
        treeAddElement_ShowDialog: state.treeAddElement_ShowDialog
        // userLogin: state.userLogin,
    };
};

// заносим functions в props
const mapDispatchToProps = (dispatch) => {
    return {
        //changeUserPassw: (val) => dispatch(changeUserPassw(val))
        setActivePage: (val) => dispatch(setTreeActivePage(val)),
        changeExpand: (id, value) => dispatch(setTreeExpanded(id, value)),
        treeItemsFetchData: () => dispatch(treeItemsFetchData()),
        setTreeAddElement_ShowDialog: (val) => dispatch(setTreeAddElement_ShowDialog(val)),
        sendDelRecord: (val) => dispatch(sendDelRecord(val)),
        setPageData_NeedUpdate: (val) => dispatch(setPageData_NeedUpdate(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);
