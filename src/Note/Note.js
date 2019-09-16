import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css';
import Config from '../Config';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import moment from 'moment';

function deleteNoteRequest (noteId, cb) {
  fetch(Config.API_ENDPOINT + `/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    }
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw error
      })
    }
    return res.json()
  })
  .then(data => {
    cb(noteId)
  })
  .catch(error => {
    console.log(error);
  })
}


function Note(props) {
  Note.defaultProps = {
    id: '',
    name: '',
    modified: ''
  }
  return (
    <NotefulContext.Consumer>
      {(context) => (
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${props.id}`}>
              {props.name}
            </Link>
          </h2>

          <button
            className='Note__delete'
            type='button'
            aria-label='delete note'
            onClick={() => {
              deleteNoteRequest(
                props.id,
                context.deleteNote
              )
              props.onDeleteNote(props.id)
            }}
          >
            <FontAwesomeIcon icon='trash-alt' />
            {'  '}
            Delete
          </button>

          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {moment(props.modified).format("MMM Do YY")}
              </span>
            </div>
          </div>
        </div>
      )}
    </NotefulContext.Consumer>
  )

}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired
}

export default Note
