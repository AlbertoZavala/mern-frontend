import React, { Component } from 'react'
import Axios from 'axios';
import { format as Format } from 'timeago.js';
import {Link} from 'react-router-dom';

export default class NotesList extends Component {

    state = {
        notes: []
    }

    componentDidMount = () => {        
        this.getNotes();
    }

    deleteNote = async (id) => {
        await Axios.delete('http://localhost:4000/api/notes/' + id);        
        this.getNotes();
    }

    getNotes = async () => {
        const res = await Axios.get('http://localhost:4000/api/notes');
        this.setState({
            notes: res.data
        });
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={ note._id }>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{ note.title }</h5>
                                    <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                                        Editar
                                    </Link>                                    
                                </div>
                                <div className="card-body">
                                    <p>{ note.content }</p>
                                    <p>{ note.author }</p>
                                    <p>{ Format(note.date) }</p>
                                </div> 
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={ () => this.deleteNote(note._id)}>
                                        Eliminar
                                    </button>
                                </div>                               
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
