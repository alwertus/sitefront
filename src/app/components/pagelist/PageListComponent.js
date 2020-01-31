import React, { Component} from "react";
import { connect } from "react-redux";
import { itemsFetchData } from "./PageListActions";
import { withRouter } from 'react-router-dom';
import "./PageListComponent.css";

class PageListComponent extends Component {
    constructor(props) {
        super(props);
        this.onClick_Info = this.onClick_Info.bind(this);
        this.onClick_Home = this.onClick_Home.bind(this);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    onClick_Info = () => {
        this.props.history.push('/info')
    }
    onClick_Home = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="pagelist-wrapper">
                <div className="pagelist-item" onClick={this.onClick_Home}>Дом</div>
                <div className="pagelist-item" onClick={this.onClick_Info}>Инфа</div>
            </div>
        );
        /*if (this.props.hasError) {
            return <div className="pagelist-wrapper">
                <p>Error loading</p>
            </div>;
        }

        if (this.props.isLoading) {
            return <div className="pagelist-wrapper">
                <p>Loading…</p>
            </div>;
        }

        if (this.props.pageListNeedUpdate) {
            this.props.fetchData();
        }

        return (
            <div className="pagelist-wrapper">
                {this.props.items.map((item) => (
                    <div key={item.id} className="pagelist-item">
                        {item.name}
                    </div>
                ))}
            </div>
        );*/
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.pageList,
        hasError: state.pageListHasError,
        isLoading: state.pageListIsLoading,
        pageListNeedUpdate: state.pageListNeedUpdate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(itemsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageListComponent));
