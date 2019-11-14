import React, { Component} from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from './PageListActions';

class PageListComponent extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        if (this.props.pageListNeedUpdate) {
            console.log("refresh list");
            // this.props.fetchData();
        }

        if (this.props.hasError) {
            console.log("render has error");
            return <p>Error loading</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <ul>
                {this.props.items.map((item) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
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
