import React from 'react';

class button extends React.Component {
    render() {
        return (
            <div className={"emptyDiv"}>
                <input type={"button"}>Press me</input>
            </div>
        );
    }
}

export default button;

/*const menu_items = ["first", "second","tree"];
return <div className={"header"}>
   <a href={"https://www.youtube.com/watch?v=sbCgQJQNZKs&t=210s"}>lesson link</a>
   <div>{menu_items.map(item => <div>{item}</div>)}</div>
   <p>Абзац</p>
</div>*/