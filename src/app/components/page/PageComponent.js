import React, { Component} from "react";
import { connect } from "react-redux";
import "./PageComponent.css";
import { pageData_GetFromServer } from "./PageActions";

class PageComponent extends Component {

    constructor(props, context) {
        super(props, context);
        props.pageData_GetFromServer(props.treeActivePage);
    }

    render() {
        if (this.props.pageDataNeedUpdate)
            this.props.pageData_GetFromServer(this.props.treeActivePage);

        return <div className="infopage">
            <div className="infopage-controlpanel">Control Panel</div>
            <div className="infopage-content-temp">
                <div dangerouslySetInnerHTML={{__html: "<h4>ActivePage=" + this.props.treeActivePage + "</h4>"}}/>
                <div dangerouslySetInnerHTML={{__html: "<h4>NeedUpdate=" + (this.props.pageDataNeedUpdate ? 'yes':'no') + "</h4>"}}/>
            </div>
            <div className="infopage-content" dangerouslySetInnerHTML={{__html:  this.props.pageData}}/>

        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        pageData: state.pageData,
        pageDataNeedUpdate: state.pageDataNeedUpdate,
        treeActivePage: state.treeActivePage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pageData_GetFromServer: (id) => dispatch(pageData_GetFromServer(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageComponent);
