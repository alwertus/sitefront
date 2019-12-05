import React, { Component} from "react";
import "./TreeCanvComponent.css";

class TreeCanvComponent extends Component {
    componentDidMount() {
        this.drawBars(this.props)
    }
    drawBars(props) {
        const { data } = props;
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const tempData = data ? data.slice(0,60) : [9,9,9,8,7,6,5,4,3,2,1,9,8,7,6,5,4,10,5,1,1,2,3,4,6,15];

        tempData.forEach((item,index) => {
            ctx.fillStyle = 'rgba(3,169,244,1)';
            ctx.fillRect(index*3, 30, 2, -(item/2))
        })
    }
    render() {
        return <div className="tree-nav">
            <canvas ref='canvas' width={180} height={300} />
        </div>
    }
}

export default TreeCanvComponent;