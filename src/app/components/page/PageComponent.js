import React, { Component} from "react";
import { connect } from "react-redux";
import "./PageComponent.css";
import { pageData_GetFromServer, setPageTempData } from "./PageActions";
import PageControlPanelComponent from "./page_conrtolpanel/PageControlPanelComponent";

class PageComponent extends Component {

    constructor(props, context) {
        super(props, context);
        props.pageData_GetFromServer(props.treeActivePage);
        this.onTextChange = this.onTextChange.bind(this);
    }

    editmode() {
        if (this.props.pageEditMode)
            return <div>EDITMODE</div>
        return <div>NORMAL</div>
    }

    onTextChange(event) {
        this.props.setPageTempData(event.target.value);
    }

    render() {
        if (this.props.pageDataNeedUpdate)
            this.props.pageData_GetFromServer(this.props.treeActivePage);

        return <div className="infopage">

            <PageControlPanelComponent/>

            {this.props.pageEditMode
                ? <div className="infopage-content"><textarea value={this.props.pageTempData} onChange={this.onTextChange}/></div>
                : <div className="infopage-content" dangerouslySetInnerHTML={{__html:  this.props.pageData}}/> }

        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        pageData: state.pageData,
        pageTempData: state.pageTempData,
        pageDataNeedUpdate: state.pageDataNeedUpdate,
        treeActivePage: state.treeActivePage,
        pageEditMode: state.pageEditMode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pageData_GetFromServer: (id) => dispatch(pageData_GetFromServer(id)),
        setPageTempData: (val) => dispatch(setPageTempData(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageComponent);
