import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { TextField } from '@material-ui/core'

class TodoEditUI extends React.Component {

    constructor(props) {
        super()
        const index = props.data.findIndex(
            item => {
                return item.id == props.match.params.id
            }
        );
        this.state = {
            id: Number(props.match.params.id),
            task: props.data[index] ? props.data[index].task : null,
            origTask: props.data[index] ? props.data[index].task: null,
            linkto: "/"
        }
    }

    handleChange = (e) => {
        const task = e.target.value
        this.setState({task})
    }

    handleSave = () => {
        this.props.handleSave(this.state.id, this.state.task)
    }

    handleCancel = () => {
        const task = this.state.origTask;
        this.setState({task})
    }

    render() {


        return (
            <div className="editTodo">
                <Link to={this.state.linkto}>
                    <button className="greyBtn" id="back-btn">Back</button>
                </Link>
                <br />
                <div className="editTaskUI">
                    <TextField id="outlined-basic" onChange={this.handleChange} label="Edit your task" variant="outlined" value={this.state.task} />
                </div>
                <br />
                <Link to={this.state.linkto}>
                    <button className="blueBtn" onClick={this.handleSave}>Save</button>
                    <button className="greyBtn" onClick={this.handleCancel}>Cancel</button>
                    <button className="delBtn" name={`${this.state.id + 1}-delBtn`} onClick={() => this.props.handleDelete(this.state.id + 1)}>Delete</button>
                </Link>
            </div>
        )
    }
}

export default withRouter(TodoEditUI)