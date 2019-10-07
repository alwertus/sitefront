import React from 'react';

class header extends React.Component {
    getInitialState = function() {
        return {checked: true}
    };
    render() {
        const menu_items = ["first", "second","tree"];
        return <div className={"header"}>
            <a href={"https://www.youtube.com/watch?v=sbCgQJQNZKs&t=210s"}>lesson link</a>
            <div>{menu_items.map(item => <div>{item}</div>)}</div>
            <p>Хуйпизда</p>
        </div>
    }
}

export default header;