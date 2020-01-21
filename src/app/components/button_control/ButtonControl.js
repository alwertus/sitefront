import React from "react";
import "./ButtonControl.css";

export default function ButtonControl(props) {

    return <div className="button-control" id={props.id} onClick={props.onClick()}>
        {props.title}
    </div>;
}