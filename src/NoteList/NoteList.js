import React from 'react'
import { Link } from 'react-router-dom'
import './NoteList.css'
import CircleButton from '../CircleButton/CircleButton'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getNotesForFolder(notes, folderId) {
	const noteList = (!folderId) ?
	notes : notes.filter(note => note.folderId === folderId);
	return noteList
}

class NoteList extends React.Component {
	static defaultProps = {
    folderId: ''
  };
  static contextType = NotefulContext;

	goHomeOnDelete = noteId => {
		console.log('goHome func ran');
    this.props.history.push(`/`)
  }

  render() {
    const { notes } = this.context
    const { folderId } = this.props.match.params
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteList'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
								onDeleteNote={this.goHomeOnDelete}
              />
            </li>
          )}
        </ul>
        <div className='NoteList__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteList__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>

      </section>
    )
  }
}

export default NoteList
