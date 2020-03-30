import React from 'react';
import Note from './note/note';
import NoteForm from './note-form/note-form.jsx';
import { firebaseConfig } from './config/config';
import firebase from 'firebase';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    // Setup the React state of our component
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.app = firebase.initializeApp(firebaseConfig);
    this.database = this.app.database().ref().child('notes');
    this.state = {
      notes: []
    }
  }

  componentWillMount() {
    const previousNotes = this.state.notes;
    //DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({
        notes: previousNotes
      })
    });

    this.database.on('child_removed', snap => {
       for(let i = 0; i < previousNotes.length; i++){
         if(previousNotes[i].id === snap.key){
           previousNotes.splice(i, 1);
         }
       }
       this.setState({
         notes: previousNotes
       })
    })
  }

  addNote(note) {
    this.database.push().set({ noteContent: note })
  }

  removeNote(noteId) {
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWraper">
      <div className="notesHeader">
        <div className="heading">React & Firebase Notes</div>
      </div>
      <div className="notesBody">
        {
          this.state.notes.map((note) => {
            return <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote} />
          })
        }
      </div>
      <div className="notesFooter">
        <NoteForm addNote={this.addNote}/>
      </div>
    </div>
    );  
  }
}

export default App;
