import React from 'react'
import './AddFolder.css'
import NotefulContext from '../NotefulContext'
import Config from '../Config'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types';

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
    .then(folder => {
      this.context.addFolder(folder);
      this.props.history.push(`/folder/${folder.id}`)
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
            aria-label="Name"
            onChange={e => this.updateFolderName(e.target.value)}/>
            {this.state.name.touched && (<ValidationError message={this.validateName()}/>)}
          <button
            type="submit"
            className="folder-button"
            disabled={this.validateName()}
          >
            Add Folder
          </button>
        </form>
      </div>
    );
  }
}

AddFolder.propTypes = {
  path: PropTypes.string,
  component: PropTypes.object
}
