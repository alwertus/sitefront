import React from "react";

export default function TreeElement(props) {
    return <div className="tree-node">
        <ul>{getExpanded(props.element.expanded, props.element.children)} {props.element.title} <sub>{props.element.id}</sub>
            { getChildren(props.element.children, props.onCLickFunc) }
        </ul>
    </div>;
}

function getChildren(child) {
    if (child)
        return child.map((item) => (
            <TreeElement key={item.id} element={item} />
            ));
    return null;
}

function getExpanded(isExpanded, childrens ) {
    if ( isExpanded === undefined || childrens === undefined )
        return null;
    return isExpanded ?
        <div className="expanded-button" onClick={onClickFunc("+")}>[+]</div> :
        <div className="expanded-button" onClick={onClickFunc("-")}>[-]</div>
}

function onClickFunc(param) {
    return function() {
        console.log(param);
    }
}