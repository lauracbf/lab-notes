import React from 'react';
import './note.css';
import PropTypes from 'prop-types';

class Note extends React.Component {
    constructor(props){
        super(props);
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
    }

    handleRemoveNote(id) {
        this.props.removeNote(id);
    }

    render(props){
        return (
            <div className="note fade-in">
                <span 
                className="closebtn"
                onClick={() => this.handleRemoveNote(this.noteId)}>
                &times;
                </span>
                <p className="noteConten">{this.noteContent}</p>
            </div>
        );
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;