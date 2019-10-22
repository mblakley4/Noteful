import React from 'react'
import './FolderList.css'
import { NavLink, Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import CircleButton from '../CircleButton/CircleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';


const countNotesForFolder = (notes=[], folder_id) =>
  notes.filter(note => note.folder_id === folder_id).length

class FolderList extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { notes, folders } = this.context

    return (
      <div className='FolderList'>
        <ul className='FolderList__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='FolderList__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='FolderList__num-notes'>
                    {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='FolderList__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              aria-label="Add Folder"
              className='FolderList__add-folder-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Folder
            </CircleButton>
          </div>
        </div>
    )
  }
}

FolderList.propTypes = {
  key: PropTypes.string,
  path: PropTypes.string,
  component: PropTypes.object
}

export default FolderList
