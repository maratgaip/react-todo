import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class TodoEditUI extends React.Component {

    constructor(props) {
        super()
        const index = Number(props.match.params.id) - 1;
        this.state = {
            id: index,
            task: props.data[index].task,
            origTask: props.data[index].task,
            linkto: "/"
        }
    }

    handleChange = (e) => {
        this.state.task = e.target.value;
        const task = e.target.value
        this.setState(
            {
                task
            }
        )
    }

    handleSave = () => {
        this.props.handleSave(this.state.id, this.state.task)
    }

    handleCancel = () => {
        const task = this.state.origTask;
        this.setState(
            {
                task
            }
        )
    }

    render() {

        return (
            <div>
                <Link to={this.state.linkto}>
                    <button className="greyBtn">Back</button>
                </Link>
                <br />
                <input type="text" value={this.state.task} onChange={this.handleChange} />
                <br />
                <Link to={this.state.linkto}>
                    <button className="blueBtn" onClick={this.handleSave}>Save</button>
                </Link>
                <button className="greyBtn" onClick={this.handleCancel}>Cancel</button>
                <Link to="/">
                    <button className="delBtn" name={`${this.state.id + 1}-delBtn`} onClick={this.props.handleDelete}>Delete</button>
                </Link>

            </div>
        )
    }
}

export default withRouter(TodoEditUI)