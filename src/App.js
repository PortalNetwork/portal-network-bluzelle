import React, { Component } from 'react';
// import {create, remove, update, read, readKeys} from "./api/database";
import portal from './portal.png';
import bluzelle from './bluzelle.png';
import './App.css';
import bluzelleDB from 'bluzelle';

const bluzellePort = "ws://192.168.1.24:51010";
const UUID = "71e2cd35-b606-41e6-bb08-f20de30df76c";

const Item = (props) => (
  <ul> 
    <span onClick={() => props.handleToggle()}>{props.content}</span>
    <a href='#' className='close' aria-hidden='true'
      onClick={() => props.deleteItem(props.indexNum)}>&times;</a>
  </ul>
)

const EditForm = (props) => (
  <ul>
    <form role="form">
      <input 
        type="text"
        placeholder={props.content} 
        name="editItem"
        value={props.editItem}
        onChange={props.handleInputChange} />
    </form>
    <button 
      onClick={() => props.updateItem(props.indexNum, props.editItem)}
      type="button"
      className="btn btn btn-primary">
      Edit
    </button>
  </ul>
)

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editState: false,
      editItem: ''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleToggle() {
    if (!this.state.editState) { this.setState({editState: true }) }
  }

  updateItem = (index, content) => {
    let updateList = this.props.list;
    updateList[index] = content;
    
    bluzelleDB.update(index, content);
    this.props.setList(updateList);
    this.setState({editState: false});
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return !this.state.editState ? 
      <Item 
        {...this.props} 
        handleToggle={this.handleToggle} /> : 
      <EditForm 
        {...this.props} 
        updateItem={this.updateItem}
        handleInputChange={this.handleInputChange}
        editItem={this.state.editItem} />
  }
}

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
    this.setList = this.setList.bind(this);
    this.readAllKyes = this.readAllKyes.bind(this);
    this.readAllContent = this.readAllContent.bind(this);
  }

  componentWillMount() {
    bluzelleDB.connect(bluzellePort, UUID);
  }

  componentDidMount() {
    const allContent = this.readAllContent();
    if (allContent) { this.setState({list: allContent}); }
  }

  setList = (newList) => {
    this.setState({list: newList})
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
    // create(todoKey, this.state.task);
    bluzelleDB.create(todoKey, this.state.task).then((result) => {
      console.log('result', result);
      return result;
    }, error => {
      return error;
    });

    this.setState({list: oldList});
  }

  deleteItem = (index) => {
    let removedList = this.state.list;
    removedList.splice(index,1);

    // remove todo data from bluzelle db
    bluzelleDB.remove(index);
    this.setState({list: removedList});
  }

  readAllKyes = () => {
    bluzelleDB.keys().then(keys => {
      return keys;
    }, error => { 
      return error;
    });
  }

  readAllContent = () => {
    const indexArr = this.readAllKyes();
    let todoListArr = [];
    if (indexArr) {
      indexArr.forEach(indexItem => {
        bluzelleDB.read(indexItem).then(content => {
          todoListArr.push(content);
        }, error => {
          console.log('read error', error);
        })
      });  
    }
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
              list={this.state.list}
              setList={this.setList}
              deleteItem={this.deleteItem}
              updateItem={this.updateItem} />))}
        </ul>
      </div>
    );
  }
}

export default App;