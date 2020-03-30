import React from 'react';
import './note-form.css';

class NoteForm extends React.Component{

    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
        this.state = {
            newNoteContent: ''
        }
    }

    //When the user input changes, set the newContent to the value os whats in the input box
    handleUserInput(e) {
        this.setState({
            newNoteContent: e.target.value //hte value of the input
        });
    }

    writeNote() {
        //call a method that sets the noteContent for a note to the value of the input
        this.props.addNote(this.state.newNoteContent);
        //set newNoteContent back to an emty string
        this.setState({
            newNoteContent: ''
        })
    }

    render() {
        return(
            <div className="formWrapper">
                <input 
                className="noteImput" 
                placeholder="Write a note"
                value={this.state.newNoteContent}
                onChange={this.handleUserInput}></input>
                <button 
                className="noteButton"
                onClick={this.writeNote}
                >Add note</button>
            </div>
        );
    }

}

export default NoteForm;