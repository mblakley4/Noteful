import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
import './NoteViewNav.css'
import PropTypes from 'prop-types'

function findFolder(folders=[], folderId) {
	const theFolder = folders.find(folder => folder.id === folderId)
	return theFolder
}

function findNote(notes=[], noteId) {
	const theNote = notes.find(note => note.id === noteId)
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
    const folder = findFolder(folders, note.folderId)
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
