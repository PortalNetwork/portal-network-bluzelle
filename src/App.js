import React, { Component } from 'react';
import {create, remove} from "./api/database";
import portal from './portal.png';
import bluzelle from './bluzelle.png';
import './App.css';

const Task = (props) => (
  <ul>
    {props.content}
    <a href='#' className='close' aria-hidden='true'
       onClick={() => props.deleteItem(props.indexNum)}>&times;</a>
  </ul>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: '',
      list: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleClick = (e) => {
    const todoKey = this.state.list.length
    let oldList = this.state.list;
    oldList.push(this.state.task);

    // save todo to bluzelle db
    create(todoKey, this.state.task);
    this.setState({list: oldList});
  }

  deleteItem = (index) => {
    let removedList = this.state.list;
    removedList.splice(index,1);

    // remove todo data from bluzelle db
    remove(index);
    this.setState({list: removedList});
  }

  render() {
    return (
      <div className="App">
        <div className="form-group">
          <div className='brand'>
            <img src={portal} alt=""/>
            <img src={bluzelle} alt=''/>
          </div>
          <h1>To Do <small>List</small></h1>
          <form role="form">
            <input 
              type="text"
              className="form-control"
              placeholder="Your Task" 
              name="task"
              value={this.state.task}
              onChange={this.handleInputChange}
            />
          </form>
          <button 
            onClick={this.handleClick}
            type="button"
            className="btn btn btn-primary">
            Add
          </button>
        </div>
        <div></div>
        <hr></hr>
        <ul className="list-unstyled" id="todo">
          {this.state.list.map((data, index) => (
            <Task 
              content={data}
              key={index}
              indexNum={index}
              deleteItem={this.deleteItem}/>))}
        </ul>
      </div>
    );
  }
}

export default App;