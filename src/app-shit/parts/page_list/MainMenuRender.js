import React from 'react';

function MainMenuRender(props) {
    console.log("try render");
    console.log(props.pages);
    let elements = function() {
        if (props.pages.items === undefined)
            return <p>empty</p>;
        else
            return props.pages.items.map((item) => (
                <li onClick={() => props.act()} key={item.id}>{item.name}</li>
            ));
    };

    return (
        <div>
            <p>Component body:</p>
            <div>
                {elements()}
            </div>
        </div>
    );
}

export default MainMenuRender;