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
        { title: 'Learning', isCompleted: false, display: true},
        { title: 'Workout', isCompleted: false, display: true},
        { title: 'Cooking rice', isCompleted: false, display: true}
      ]
    };
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
          todoList: [{ title: ev.target.value, isCompleted: false, display: true }, ...this.state.todoList ]
        })
        ev.target.value = '';
      }
    }
  }
  filter() {
    return () => {
      let todoList = this.state.todoList.map(item => {
        if(item.isCompleted) item.display = !item.display;
        return item;
      })
      this.setState({
        todoList: todoList
      })
    }
  }
  clearCompleted() {
    return () => {
      this.setState({
        todoList: this.state.todoList.filter(item => item.isCompleted === false)
      })
    }
  }
  render() {
    let img = this.state.todoList.every(item => item.isCompleted === true) ? checked : checkCircleEmpty;
    let img2 = this.state.todoList.some(item => item.display === false) ? checked : checkCircleEmpty;
    return (
      <div className="App">
        <div>
          <img src={img} width="24" alt="" onClick={this.onListClicked()}  />
          <input type="text" placeholder="Type something" onKeyUp={this.addTodoItem()} />
        </div>
        {
          this.state.todoList.map((item, index) => <TodoItem item={item} key={index} onclick={this.onItemClicked(item)} />)
        }
        <div>
          <p>All - {this.state.todoList.length}</p>
          <p>Completed - {this.state.todoList.filter(item => item.isCompleted === true).length}</p>
          <img src={img2} width="24" alt="" onClick={this.filter()} />Lọc
          <button onClick={this.clearCompleted()}>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
