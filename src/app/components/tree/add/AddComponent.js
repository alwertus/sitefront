import React, { Component} from "react";
import { connect } from "react-redux";
import "./AddComponent.css";
import { changeTreeAddTitle, sendNewTitle } from "./AddActions";
import { setTreeAddElement_ShowDialog, setTreeNeedUpdate } from "../TreeActions";

class AddComponent extends Component {

    constructor(props) {                                                                                                // регистрация функций
        super(props);
        this.onButtonAddClick = this.onButtonAddClick.bind(this);
        this.onButtonCancelClick = this.onButtonCancelClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return <div className="tree-add-wrapper">
            <div className="label">Добавить пункт меню</div>
            <input autoFocus id="input-title" className="tree-add-input" name="add-title" type="text" placeholder="Введи заголовок..." onChange={this.onChange} value={this.props.treeAddElement_Title}/>
            <div className="tree-add-buttons">
                <button className="tree-add-button" onClick={this.onButtonCancelClick}>Cancel</button>
                <button className="tree-add-button" onClick={this.onButtonAddClick}>Add</button>
            </div>
        </div>
    }

    // ADD
    onButtonAddClick() {
        if (this.props.treeAddElement_Title === "")
            alert("Необходимо заполнить заголовок");
        else {
            this.props.sendNewTitle(this.props.treeActivePage, this.props.treeAddElement_Title);
            this.props.changeTreeAddTitle("");
            this.props.setTreeAddElement_ShowDialog(false);
            this.props.setTreeNeedUpdate(true);
        }
    }

    // CANCEL
    onButtonCancelClick() {
        this.props.changeTreeAddTitle("");
        this.props.setTreeAddElement_ShowDialog(false);
    }

    onChange(event) {
        if (event.target.name === "add-title") this.props.changeTreeAddTitle(event.target.value);
    }

}

const mapStateToProps = (state) => {
    return {
        treeAddElement_Title: state.treeAddElement_Title,
        treeActivePage: state.treeActivePage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeTreeAddTitle: (val) => dispatch(changeTreeAddTitle(val)),
        setTreeAddElement_ShowDialog: (val) => dispatch(setTreeAddElement_ShowDialog(val)),
        sendNewTitle: (parent, title) => dispatch(sendNewTitle(parent, title)),
        setTreeNeedUpdate: (val) => dispatch(setTreeNeedUpdate(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComponent);