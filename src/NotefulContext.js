import React from 'react'

const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
})

export default NotefulContext
