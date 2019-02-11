import React, { Component } from 'react';
import './TodoItem.css'
import checkEmpty from '../img/check-box-empty.svg'
import check from '../img/check.svg'


class TodoItem extends Component {
    render() {
        let { item } = this.props;
        let className = 'text';
        if(item.isCompleted) className += ' TodoItem-Completed';
        let img = item.isCompleted ? check : checkEmpty;
        return (
            <div className="TodoItem" >
                <img src={img} alt="empty" width="24" onClick={this.props.onclick}/>
                <p className={className}>{ item.title }</p>
            </div>
        );
    }
}

export default TodoItem