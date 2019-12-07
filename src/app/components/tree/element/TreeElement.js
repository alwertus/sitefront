import React from "react";

// корневой элемент
export default function TreeElement(props) {
    return <div className="tree-node">
        <div className="tree-node-line" onClick={onCheckClick(props.element.id)} >
            { getExpandedElement(
                props.element.id,
                props.element.expanded,
                props.element.children,
                props.onExpandClick) }
            {props.element.title} <sub>{props.element.id}</sub>
        </div>
        { props.element.expanded ? getChildren(props.element.children, props.onExpandClick) : "" }
    </div>;

    function onCheckClick(id) {
        return function() {
            console.log("123-" + id);
        }

    }
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
    if ( isExpanded === undefined ||
         childrens  === undefined ||
         onClick    === undefined )
            return null;
    return isExpanded ? <div className="expanded-button open" onClick={onClick(id, isExpanded)}>-</div> :
                        <div className="expanded-button close" onClick={onClick(id, isExpanded)}>+</div>
}