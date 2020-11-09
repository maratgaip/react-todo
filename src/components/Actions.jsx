import React from 'react'
import { Link } from 'react-router-dom'

class Actions extends React.Component {
    render() {

        const { id, handleDone, handleDelete, handleEdit } = this.props;
        return (
            <div id={`${id}-div`}>
                <Link to={`/${id}`}>
                    <button className="blueBtn" name={`${id}-edit`} onClick={(e) => handleEdit(e)}>Edit</button>
                </Link>
                <button className="greyBtn" name={`${id}-done`} onClick={handleDone}>Done</button>
                <button className="delBtn" name={`${id}-delete`} onClick={() => handleDelete(id)}>Delete</button>
            </div>
        )
    }
}

export default Actions