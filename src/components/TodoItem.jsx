import React from 'react' 

class TodoItem extends React.Component {
    render() {
        const {task, index} = this.props
        return (
            <div>
                <span className="taskNumber">{index}</span>
                <span className="task">{task}</span>
            </div>
        )
    }
}

export default TodoItem