import React from 'react'
import './App.css';
import todosData from './todosData'
import TodoList from './components/TodoList'
import TodoEditUI from './components/TodoEditUI'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TextField } from '@material-ui/core'


function isEmpty(str) {
  return str.length === 0;
}

class App extends React.Component {
  constructor() {
    const newIdValue = todosData.length + 1;
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
      newId: newIdValue
    }
  }


  //switching between Tabs
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
    const currentTodo = e.target.value
    this.setState(
      {
        currentTodo
      }
    )
  }


  showError = errorMsgStr => {
    this.setState(
      {
        showError: true,
        errorMsg: errorMsgStr,
        currentTodo: ''
      }
    )
  }

  doesTaskExist = (taskName) => {
    const index = this.state.todosData.findIndex(
      item => {
        return item !== undefined && item.task.toLowerCase().split(" ").join("") === taskName.toLowerCase().split(" ").join("")
      }
    )

    return index > -1 ? true : false
  }

  handleAdd = () => {
    const { todosData, currentTodo } = this.state;
    if (isEmpty(currentTodo)) {
      this.showError('Cannot add an empty task')
      return;
    } else if (this.doesTaskExist(currentTodo)) {
      this.showError('Cannot add a duplicate task')
      return;
    } else {
      //add a task to todosData
      const newIdValue = Number(this.state.newId);
      todosData.push({
        id: newIdValue,
        task: currentTodo,
        completed: false,
      })
      this.setState(
        {
          showError: false,
          todosData,
          currentTodo: '',
          newId: this.state.newId + 1,
          selectedTab: 'active-todos'
        }
      )
    }
  }

  handleDone = (e) => {
    const { todosData } = this.state
    let index = parseInt(e.target.name);
    index = todosData.findIndex(item => {
      return item.id === index
    })
    todosData[index].completed = true;
    this.setState({
      todosData
    })




  }

  handleDelete = (id) => {
    const todosData = this.state.todosData.filter(item => item.id !== id)
    this.setState({ todosData })
  }

  handleEdit = (e) => {
  }


  handleSave = (id, editedTask) => {
    const { todosData } = this.state
    let index = todosData.findIndex(item => item.id === id)
    todosData[index].task = editedTask;
    this.setState(
      {
        todosData
      }
    )
  }

  render() {
    return (
      <Router>
        <h1 className="App">Todo App</h1>
        <Switch>
          <Route path="/" exact>
            <div className="App">
              <nav>
                <TextField id="outlined-basic" onChange={this.handleChangeTodoInput} label="Add todo" variant="outlined" value={this.state.currentTodo} />
                {/* <input type="text" onChange={this.handleChangeTodoInput} placeholder="Add todo" value={this.state.currentTodo} /> */}
                <button className="blueBtn" id="addBtnNav" onClick={this.handleAdd}>Add Todo</button>
              </nav>

              <h4 className="error">{this.state.showError && this.state.errorMsg}</h4>
              <main>
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
              </main>
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
