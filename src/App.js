import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem'
import checkCircleEmpty from './img/circle-outline.svg'
import checked from './img/checked.svg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        { title: 'Learning', isCompleted: false},
        { title: 'Workout', isCompleted: false},
        { title: 'Cooking rice', isCompleted: false}
      ]
    };
    this.something = 'true';
  }
  onItemClicked(item) {
    return (ev) => {
      let todoList = [...this.state.todoList];
      let crntItem = todoList[todoList.indexOf(item)];
      crntItem.isCompleted = !crntItem.isCompleted;
      this.setState({
        todoList: todoList
      })
    }
  }
  onListClicked() {
    return () => {
      let todoList = this.state.todoList
        .map(item => {
          return {...item, isCompleted: !this.state.todoList.every(item => item.isCompleted === true)}
        })
      this.setState({
        todoList: todoList
      })
    }
  }
  addTodoItem() {
    return (ev) => {
      if(ev.keyCode === 13 && ev.target.value !== ''){
        this.setState({
          todoList: [...this.state.todoList, { title: ev.target.value, isCompleted: false }]
        })
      }
    }
  }
  render() {
    let img = this.state.todoList.every(item => item.isCompleted === true) ? checked : checkCircleEmpty;
    return (
      <div className="App">
        <div>
          <img src={img} width="24" alt="" onClick={this.onListClicked()}  />
          <input type="text" placeholder="Type something" onKeyUp={this.addTodoItem()} />
        </div>
        {
          this.state.todoList.map((item, index) => <TodoItem item={item} key={index} onclick={this.onItemClicked(item)} />)
        }
      </div>
    );
  }
}

export default App;
