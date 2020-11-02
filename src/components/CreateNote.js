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
        date: new Date(),
        editing: false,
        _id: ''
    }

    componentDidMount = async () => {
        const res = await Axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        });

        if(this.props.match.params.id){
            const res = await Axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,     
                editing: true,
                _id: this.props.match.params.id
            });
        }
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
    
    onSubmitNote = async (e) => {                
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        
        if(this.state.editing){
            await Axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);      
        }else{
            await Axios.post('http://localhost:4000/api/notes', newNote);      
        }

        window.location.href = "/";          
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4> Crear una nota </h4>

                    { /* Select user */ }
                    <div className="form-group">
                        <select className="form-control" name="userSelected" onChange={ this.onInputChange } value={this.state.userSelected} >
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
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Título" 
                            name="title" 
                            onChange={ this.onInputChange } 
                            value={this.state.title} 
                            required>
                        </input>
                    </div>

                    <div className="form-group">
                        <textarea 
                            name="content" 
                            className="form-control" 
                            placeholder="Contenido" 
                            onChange={ this.onInputChange } 
                            value={this.state.content}
                            required>
                        </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker 
                            className="form-control" 
                            selected={ this.state.date } 
                            onChange={this.onChangeDate} 
                            value={this.state.date}/>
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
