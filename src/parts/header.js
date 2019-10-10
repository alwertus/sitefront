import React from 'react';

class header extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
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
    }*/
    render() {
        /*const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Загрузка...</div>
        } else {
            return (
                <ul>
                    {
                        items.map(item => (
                            <li key={item.name}>
                                {item.name} {item.price}
                            </li>
                        ))
                    }
                </ul>
            );
        }*/
        return null;

    }
}

export default header;