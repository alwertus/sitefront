import React, { Component} from "react";
import { connect } from "react-redux";
import "./PageControlPanelComponent.css";
import ButtonControl from "../../button_control/ButtonControl";
import { setPageEditMode, setPageTempData, sendNewPageToServer } from "./PageControlPanelActions";

class PageControlPanelComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickEditSave = this.onClickEditSave.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    }

    render() {
        return <div className="infopage-controlpanel">
            {this.props.pageEditMode
                ? <ButtonControl title="Cancel" id="btn-remove" onClick={this.onClickCancel}/>
                : <div/> }
            <ButtonControl title={this.props.pageEditMode?"Save":"Edit"} id={this.props.pageEditMode?"btn-add":"btn-edit"} onClick={this.onClickEditSave}/>
        </div>
    }

    // onClick button Edit / Save
    onClickEditSave() {
        var t = this;
        return function() {
            if (t.props.pageEditMode) {
                console.log("click SAVE");
                t.props.sendNewPageToServer(t.props.treeActivePage, t.props.pageTempData);

                t.props.setPageEditMode(false);
            } else {
                console.log("click EDIT");
                t.props.setPageTempData(t.props.pageData);
                t.props.setPageEditMode(true);
            }
        }
    }

    // onClick button Cancel
    onClickCancel() {
        var t = this;
        return function() {
            console.log("click CANCEL");
            t.props.setPageEditMode(false);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        pageEditMode: state.pageEditMode,
        pageData: state.pageData,
        pageTempData: state.pageTempData,
        treeActivePage: state.treeActivePage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPageEditMode: (val) => dispatch(setPageEditMode(val)),
        setPageTempData: (val) => dispatch(setPageTempData(val)),
        sendNewPageToServer: (id, html) => dispatch(sendNewPageToServer(id, html)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageControlPanelComponent);
