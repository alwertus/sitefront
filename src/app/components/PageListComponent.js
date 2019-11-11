import React, { Component} from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/PageListActions';

class PageListComponent extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        if (this.props.hasError) {
            console.log("render has error");
            return <p>Error loading</p>;
        }

        if (this.props.isLoading) {
            console.log("render is loading");
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
        isLoading: state.pageListIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(itemsFetchData())
        //fetchData: (param1) => dispatch(itemsFetchData(param1)) param1 - так можно передать функции параметр
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageListComponent);
