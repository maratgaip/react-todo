import React from 'react'
import TodoItem from './TodoItem';
import Actions from '../components/Actions'

class TodoList extends React.Component {

    constructor() {
        super()
        this.state = {
        }
    }


    render() {
        const { data, selectedTab, handleEdit, handleDone, handleDelete } = this.props;
        let selectedTodos;

        if (selectedTab === 'active-todos') {
            selectedTodos = data.filter(
                (todo) => {
                    return !todo.completed
                    //return only if not completed, i.e. active
                }
            )
        } else {
            if (selectedTab ==='done-todos') {
                selectedTodos = data.filter(
                    (todo) => {
                        return todo.completed;
                    }
                )
            }
        }

        const renderedTodos = selectedTodos.map(
            (todo, index) => { 
                return (
                <div key={`todoDiv-${todo.id}`}>
                    <TodoItem key={todo.id} task={todo.task} index={index+1}/>
                    <Actions
                        key={`actions-${todo.id}`}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleDone={handleDone}
                        id={todo.id}
                    />

                </div> )
            }
        )

        return (
            <div>
                {renderedTodos}
            </div>
            
        )

    }
}

export default TodoList