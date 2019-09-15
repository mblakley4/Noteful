import React from 'react'
import './AddFolder.css'
import NotefulContext from '../NotefulContext'
import Config from '../Config'

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      }}
    }

  static contextType = NotefulContext;

  handleSubmit(event) {
    event.preventDefault();
    const folder = {
      name: this.state.name.value
    }

    fetch(Config.API_ENDPOINT + '/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(folder),
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
      this.context.addFolder(folder);
      this.props.history.push(`/folder/${folder.id}`)
    })
    .catch(error => {
      console.log(error);
    })
  }

  updateFolderName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  render() {
    return (
      <div>
        <form className="folderForm" onSubmit={e => this.handleSubmit(e)}>
          <h2>Create Folder</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="folderName"
            id="name"
            onChange={e => this.updateFolderName(e.target.value)}/>
          <button
            type="submit"
            className="folder-button"
          >
            Add Folder
          </button>
        </form>
      </div>
    );
  }
}
