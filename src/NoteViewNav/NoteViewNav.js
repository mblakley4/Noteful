import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
import './NoteViewNav.css'
import PropTypes from 'prop-types'

function findFolder(folders=[], folder_id) {
	const theFolder = folders.find(folder => folder.id === folder_id)
	return theFolder
}

function findNote(notes=[], note_id) {
	const theNote = notes.find(note => note.id === note_id)
	return theNote
}

export default class NoteViewNav extends React.Component {
	static defaultProps = {
	  history: {
	    goBack: () => {}
	  },
	  match: {
	    params: {}
	  },
	}

  static contextType = NotefulContext

  render() {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folder_id)
    return (
      <div className='NoteViewNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NoteViewNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>

        {folder && (
          <h3 className='NoteViewNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NoteViewNav.propTypes = {
  path: PropTypes.string,
  component: PropTypes.object
}
