import React from "react";

export default function TreeButton(props) {

    return <div className="tree-button" id={props.id} onClick={props.onClick()}>
        {props.title}
    </div>;
}