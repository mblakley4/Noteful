import React from 'react'
import { Link } from 'react-router-dom'
import './NoteList.css'
import CircleButton from '../CircleButton/CircleButton'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

function getNotesForFolder(notes, folder_id) {
	const noteList = (!folder_id) ?
	notes : notes.filter(note => note.folder_id === folder_id);
	return noteList
}

class NoteList extends React.Component {
	static defaultProps = {
    folder_id: ''
  };
  static contextType = NotefulContext;

	goHomeOnDelete = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes } = this.context
    const { folder_id }  = this.props.match.params
    const notesForFolder = getNotesForFolder(notes, parseInt(folder_id))
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
						aria-label='Add Note'
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

NoteList.propTypes = {
  key: PropTypes.string,
  path: PropTypes.string,
  component: PropTypes.object
}

export default NoteList
