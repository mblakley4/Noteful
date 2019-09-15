import React from 'react'
import './AddNote.css'
import NotefulContext from '../NotefulContext'
import Config from '../Config'

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folderId: {
        value: '',
        touched: false
      }
      }
    }

  static contextType = NotefulContext;


  handleSubmit(event) {
    event.preventDefault();
    const note = {
      name: this.state.name.value,
      content: this.state.content.value,
      folderId: this.state.folderId.value,
      modified: new Date,
    }

  fetch(Config.API_ENDPOINT + '/notes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw error
      })
    }
    return res.json()
  })
  .then(res => {
    this.context.addNote(note);
    this.props.history.push(`/folder/${note.folderId}`)
  })
  .catch(error => {
    console.log(error);
  })
}

  updateNoteName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  updateNoteContent(content) {
    this.setState({content: {value: content, touched: true}});
  }

  updateFolderId(folderId) {
    this.setState({folderId: {value: folderId, touched: true}});
  }

  render() {
    const { folders=[] } = this.context
    return (
      <div>
        <form className="noteForm" onSubmit={e => this.handleSubmit(e)}>
          <h2>Create a Note</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="noteName"
            id="name"
            onChange={e => this.updateNoteName(e.target.value)}
            required
          />
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            className="noteContent"
            id="content"
            onChange={e => this.updateNoteContent(e.target.value)}
          />
          <label htmlFor="folderSelect">Folder</label>
          <select
            name="folderSelect"
            id="folderSelect"
            onChange={e => this.updateFolderId(e.target.value)}>
            <option value="null">...</option>
            {folders.map(folder =>
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            )}
          </select>
          <button
            type="submit"
            className="note-button"
          >
            Add Note
          </button>
        </form>
      </div>
    );
  }
}
