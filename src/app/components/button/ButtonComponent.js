import React, { Component} from "react";
import { connect } from "react-redux";
import { changeString1, changeString2} from "./ButtonActions";

class ButtonComponent extends Component {

    constructor(props) {                                                                                                // регистрация функций
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onButton2Click = this.onButton2Click.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return <div>
            <input id="input-str1" className="tmp-input" name="string1" type="text" placeholder="Строка 1" onChange={this.onChange}/>
            <input id="input-str2" className="tmp-input" name="string2" type="text" placeholder="Строка 2" onChange={this.onChange}/>
            <button className="tmp-button" onClick={this.onButtonClick}>Go(method=add)</button>
            <br/>
            <button className="tmp-button" onClick={this.onButton2Click}>Refresh</button>
        </div>
    }

    onButtonClick() {
        fetch('InfoPageList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "add",
                title: this.props.buttonString1,
                parent: this.props.buttonString2
            })})
            .then((response) => response.json())
            .then((response) => {
                // console.log("<< response 1", JSON.stringify(response));
                console.log("<< response 1", response);
                return response;
            })
            .catch(() => {
                console.log("<< response 2")
            });
        console.log(this.props.buttonString1 + " - " + this.props.buttonString2);
    }

    onButton2Click() {
        fetch('InfoPageList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "show",
                title: this.props.buttonString1,
                parent: this.props.buttonString2
            })})
            .then((response) => response.json())
            .then((response) => {
                console.log("<< response 1", JSON.stringify(response));
                return response;
            })
            .catch(() => {
                console.log("<< response 2")
            });
        console.log(this.props.buttonString1 + " - " + this.props.buttonString2);
    }



    onChange(event) {
        if (event.target.name === "string1") this.props.changeString1(event.target.value);
        if (event.target.name === "string2") this.props.changeString2(event.target.value);
    }
}

const mapStateToProps = (state) => {
    return {
        buttonString1: state.buttonString1,
        buttonString2: state.buttonString2,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeString1: (val) => dispatch(changeString1(val)),
        changeString2: (val) => dispatch(changeString2(val)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);