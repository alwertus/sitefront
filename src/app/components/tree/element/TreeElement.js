import React from "react";

// корневой элемент
export default function TreeElement(props) {

    const sClassName = props.activeMenu === props.element.id ? " active" : "";

    return <div className="tree-node">
        <div className={"tree-node-line" + sClassName} onClick={props.onMenuClick(props.element.id)} >
            { getExpandedElement(   props.element.id,
                                    props.element.expanded,
                                    props.element.children,
                                    props.onExpandClick) }
            { props.element.title }
            <sub>{ props.element.id }</sub>
        </div>
        { props.element.expanded
            ? getChildren(props.element.children, props.onExpandClick, props.onMenuClick, props.activeMenu)
            : "" }
    </div>;
}

// рекурсионное создание всех детей
function getChildren(child, onExpandClick, onMenuClick, activeMenu) {
    if (child)
        return child.map((item) => (
            <TreeElement key={item.id} element={item} onExpandClick={onExpandClick} onMenuClick={onMenuClick} activeMenu={activeMenu} />
            ));
    return null;
}

// кнопка-открывашка открыто/закрыто/отсутствует
function getExpandedElement(id, isExpanded, childrens, onClick ) {
    if ( isExpanded === undefined ||
         childrens  === undefined ||
         onClick    === undefined )
            return <div/>;
    return isExpanded ? <div className="expanded-button open" onClick={onClick(id, isExpanded)}>-</div> :
                        <div className="expanded-button close" onClick={onClick(id, isExpanded)}>+</div>
}