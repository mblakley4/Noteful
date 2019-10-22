import React from 'react'
import './AddNote.css'
import NotefulContext from '../NotefulContext'
import Config from '../Config'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types';

export default class AddNote extends React.Component {

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
      folder_id: {
        value: 'null',
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
      folder_id: this.state.folder_id.value,
      modified: new Date(),
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
  .then(note => {
    this.context.addNote(note);
    this.props.history.push(`/folder/${note.folder_id}`)
  })
  .catch(error => {
    console.log(error);
  })
}

  validateName(fieldValue) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'A name is required'
    }
  }

  validateFolderSelect() {
    const folderSelect = this.state.folder_id.value;
    console.log(folderSelect);
    if (folderSelect === "null") {
      return 'Please select a folder'
    }
  }

  updateNoteName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  updateNoteContent(content) {
    this.setState({content: {value: content, touched: true}});
  }

  updatefolder_id(folder_id) {
    this.setState({folder_id: {value: folder_id, touched: true}});
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
            aria-label="Name"
            onChange={e => this.updateNoteName(e.target.value)}
            required
          />
          {this.state.name.touched && (<ValidationError message={this.validateName()}/> )}
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            className="noteContent"
            id="content"
            required
            aria-required="true"
            aria-label="Content"
            onChange={e => this.updateNoteContent(e.target.value)}
          />
          <label htmlFor="folderSelect">Folder</label>
          <select
            name="folderSelect"
            id="folderSelect"
            aria-label="Folder"
            onChange={e => this.updatefolder_id(e.target.value)}>
            <option value="null">...</option>
            {folders.map(folder =>
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            )}
          </select>
          {this.state.folder_id.touched && (<ValidationError message={this.validateFolderSelect()}/> )}
          <button
            type="submit"
            className="note-button"
            disabled={
              this.validateName() ||
              this.validateFolderSelect()
            }
          >
            Add Note
          </button>
        </form>
      </div>
    );
  }
}

AddNote.propTypes = {
  path: PropTypes.string,
  component: PropTypes.object
}
