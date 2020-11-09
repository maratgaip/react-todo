import React from 'react'

class TodoItem extends React.Component {
    render() {
        const { task, index, className } = this.props
        return (
            <div className={className}>
                <span className="taskNumber">{index}</span>
                <span className="task">{task}</span>
            </div>
        )
    }
}

export default TodoItem