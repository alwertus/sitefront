import React from 'react';

class button extends React.Component {

    constructor(prop) {
        super(prop);
        this.onButtonClick_Test = this.onButtonClick_Test.bind(this);
    }

    async onButtonClick_Test() {
        console.log("Button test pressed");

        try {
            const request = await fetch('/auth', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                    operation: "test"
                })
            });

            const json = await request.json();

            if (json.errorCode === "0") {
                console.log("RESULT: OK");
            } else
                console.log("RESULT: " + json.errorMsg);

        } catch (error) {
            console.log("ERROR: " + error.toString());
        }
    }

    render() {
        return <div>
            <button className={"button_sendAuth "} onClick={this.onButtonClick_Test}>Go</button>
        </div>
    }
}

export default button;

/*
        try {
            const response = await fetch('/menuitems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ operation: "koko228", kako: "siko" })
            });

            const json = await response.json();
            console.log("УСПЕХ", JSON.stringify(json));
        } catch (error) {
            console.log("Error get data from server");
        }
         */



// console.log(json.items[2]);


/*var resp = await fetch('/menuitems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "operation": "adЫN"
        })
        // ,
    // body: JSON.stringify({
    //     name: 'John',
    //     surname: 'Smith'
    // })
    }).then(response => response.json())
    // .then(commits => console.log(commits[0].author.login));
console.log(resp);*/

/*$.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bd82977b86bf27fb59a04b61b657fb6f',
    method: 'GET',
    success: function(result) {
        this.setState({data: result});
    }.bind(this)
});*/

// {<button onClick={this.onButtonClickEvent}>Button(stringify-data)</button>}
/*const menu_items = ["first", "second","tree"];
return <div className={"header"}>
   <a href={"https://www.youtube.com/watch?v=sbCgQJQNZKs&t=210s"}>lesson link</a>
   <div>{menu_items.map(item => <div>{item}</div>)}</div>
   <p>Абзац</p>
</div>

fetch("/menuitems")
             .then(res => res.json())
             .then(
                 (result) => {
                     this.setState({
                         isLoaded: true,
                         items: result.items
                     });
                 },
                 (error) => {
                     isLoaded: true,
                         error
                 });

*/