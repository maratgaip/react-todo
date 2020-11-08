import React from 'react'
import './App.css';
import todosData from './todosData'
import TodoList from './components/TodoList'
import TodoEditUI from './components/TodoEditUI'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentTodo: '',
      todosData,
      selectedTab: 'active-todos',
      showError: false,
      errorMsg: '',
      editingId: -1,
      doneTodos: 0,
      activeTodos: 0,
      newId: todosData.length
    }
  }

  goToActiveTodos = () => {
    this.setState({
      selectedTab: 'active-todos'
    })

  }

  goToDoneTodos = () => {
    this.setState({
      selectedTab: 'done-todos'
    })

  }

  handleChangeTodoInput = (e) => {
    this.state.currentTodo = e.target.value;
    const currentTodo = e.target.value
    this.setState(
      {
        currentTodo
      }
    )
  }


  handleAdd = () => {
    const { todosData, currentTodo } = this.state;
    if (currentTodo.length < 1) {
      this.setState(
        {
          showError: true,
          errorMsg: 'Cannot add an empty task'
        }
      )

      console.log(this.state.errorMsg);

      return;
    }
    
    else if (todosData.findIndex(
      item => {
        return item !== undefined && item.task.toLowerCase().split(" ").join("") === currentTodo.toLowerCase().split(" ").join("") 
        //won't add 'some task' sometask som e ta sk if already exists
      }
    ) > -1) {
      this.setState(
        {
          showError: true,
          errorMsg: 'Cannot add a duplicate',
          currentTodo: ''
        }
      )
      return;

    }
    else {
      this.setState(
        {
          showError: false
        }
      )
    }
    const newId = Number(this.state.newId);
    this.setState (
      {
        newId: this.state.newId+1
      }
    )
    todosData.push({
      id: newId,
      task: currentTodo,
      completed: false
    })
    this.setState(
      {
        todosData,
        currentTodo: ''
      }
    )
  }

  handleDone = (e) => {
    let id = e.target.name;
    id = parseInt(id) - 1;
    const { todosData } = this.state;
    console.log('id',id)
    if(todosData[id]) {
      todosData[id].completed = true;
    }
    
    this.setState(
      {
        todosData
      }
    )
  }

  handleDelete = (e) => {
    let id = e.target.name;
    id = parseInt(id) - 1;
    const { todosData } = this.state;
    delete todosData[id]
    this.setState(
      {
        todosData
      }
    )

  }

  handleSave = (id, editedTask) => {
    const {todosData} = this.state
    todosData[id].task = editedTask;
    this.setState (
      {
        todosData
      }
    )
  }

  render() {
    return (
      <Router>

        <Switch>
          <Route path="/" exact >
            <div className="App">

              <input type="text" onChange={this.handleChangeTodoInput} placeholder="Add todo" value={this.state.currentTodo} />
              <button className="blueBtn" onClick={this.handleAdd}>Add Todo</button>
              <h4 className="error">{this.state.showError && this.state.errorMsg}</h4>

              <div className="todosBreakdown">
                <button className="blueBtn" onClick={this.goToActiveTodos}>Active Todos</button>
                <button className="greyBtn" onClick={this.goToDoneTodos}>Done Todos</button>
              </div>

              <TodoList
                data={this.state.todosData}
                selectedTab={this.state.selectedTab}
                handleEdit={this.handleEdit}
                handleDone={this.handleDone}
                handleDelete={this.handleDelete}
              />
            </div>
          </Route>

          <Route path="/:id">
          <TodoEditUI 
                        data={this.state.todosData}
                        handleChange={this.handleChangeExisting}
                        handleSave={this.handleSave}
                        handleDelete={this.handleDelete}
          />
          </Route>
        </Switch>
      </Router>
    )
  }

}

export default App;
