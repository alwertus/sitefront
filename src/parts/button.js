import React from 'react';

class button extends React.Component {
    onButtonClickEvent() {
        console.log("Button pressed");



        var resp = fetch('/menuitems',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "operation" : "adЫN"
            })
                /*,
            body: JSON.stringify({
                name: 'John',
                surname: 'Smith'
            })*/
        })  .then(response => response.json())
            /*.then(commits => console.log(commits[0].author.login))*/;
        console.log(resp);

        /*$.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bd82977b86bf27fb59a04b61b657fb6f',
            method: 'GET',
            success: function(result) {
                this.setState({data: result});
            }.bind(this)
        });*/
    }
    render() {
        return (
            <div className="emptyDiv">
                <button onClick={this.onButtonClickEvent}>Press me</button>
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