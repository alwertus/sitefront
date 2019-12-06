import React from "react";

// корневой элемент
export default function TreeElement(props) {
    // console.log(props);
    return <div className="tree-node">
        {getExpandedElement(props.element.id, props.element.expanded, props.element.children, props.onExpandClick)} {props.element.title} <sub>{props.element.id}</sub>
            { getChildren(props.element.children, props.onExpandClick) }
    </div>;
}

// создание всех детей
function getChildren(child, onExpandClick) {
    if (child)
        return child.map((item) => (
            <TreeElement key={item.id} element={item} onExpandClick={onExpandClick} />
            ));
    return null;
}

// кнопка-открывашка открыто/закрыто/отсутствует
function getExpandedElement(id, isExpanded, childrens, onClick ) {
    if ( isExpanded === undefined || childrens === undefined || onClick === undefined)
        return null;
    return isExpanded ?
        <div className="expanded-button open" onClick={onClick(id, isExpanded)}>+</div> :
        <div className="expanded-button close" onClick={onClick(id, isExpanded)}>-</div>
}