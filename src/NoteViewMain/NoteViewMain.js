import React from 'react'
import Note from '../Note/Note'
import './NoteViewMain.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';

function findNote(notes=[], noteId) {
	const theNote = notes.find(note => note.id === noteId)
	return theNote
}

export default class NoteViewMain extends React.Component {

	static contextType = NotefulContext

	goHomeOnDelete = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes } = this.context
		const noteId  = this.props.match.params.note_id
		const note = findNote(notes, parseInt(noteId)) || { content: ''};
    return (
      <section className='NoteViewMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
					onDeleteNote={this.goHomeOnDelete}
        />
				<div className='NoteViewMain__content'>
					{note.content.split(/\n \r|\n/).map((para, i) =>
						<p key={i}>{para}</p>
					)}
				</div>

      </section>
    )
  }
}

NoteViewMain.defaultProps = {
  note: {
    content: '',
  }
}

NoteViewMain.propTypes = {
  path: PropTypes.string,
  component: PropTypes.object
}
