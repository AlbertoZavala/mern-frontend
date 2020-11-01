import React, { Component } from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date()
    }

    componentDidMount = async () => {
        const res = await Axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username)
        });
    }

    
    onInputChange = (e) => {        
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    }
    
    onSubmitNote = (e) => {        
        e.preventDefault();
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4> Crear una nota </h4>

                    { /* Select user */ }
                    <div className="form-group">
                        <select className="form-control" name="userSelected" onChange={ this.onInputChange } >
                            {
                                this.state.users.map(user => 
                                    <option key={user} value={user}>
                                        { user }
                                    </option>
                                    )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Título" name="title" onChange={ this.onInputChange } required>
                        </input>
                    </div>

                    <div className="form-group">
                        <textarea name="content" className="form-control" placeholder="Contenido" onChange={ this.onInputChange } required>

                        </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker className="form-control" selected={ this.state.date } onChange={this.onChangeDate} />
                    </div>

                    <form onSubmit={this.onSubmitNote}>                        


                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
