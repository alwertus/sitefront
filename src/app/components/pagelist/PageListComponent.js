import React, { Component} from "react";
import { connect } from "react-redux";
import { itemsFetchData } from "./PageListActions";
import "./PageListComponent.css";

class PageListComponent extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        if (this.props.hasError) {
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
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(PageListComponent);
