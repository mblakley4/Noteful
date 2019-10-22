import React from 'react';
import { Route, Link } from 'react-router-dom';
import NoteList from './NoteList/NoteList';
import FolderList from './FolderList/FolderList';
import NoteViewMain from './NoteViewMain/NoteViewMain';
import NoteViewNav from './NoteViewNav/NoteViewNav';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import Config from './Config';
import MainError from './MainError';
import NavError from './NavError';
import './App.css';



class App extends React.Component {
	state = {
		notes: [],
		folders: [],
	}


	deleteNote = noteId => {
		console.log(typeof noteId);
		const newNotes = this.state.notes.filter(n =>
			n.id !== noteId
		)
		this.setState({
			notes: newNotes
		})
	}

	handleAddFolder = folder => {
		this.setState({
			folders: [...this.state.folders, folder]
		})
	}

	handleAddNote = note => {
		this.setState({
			notes: [...this.state.notes, note]
		})
	}

	componentDidMount() {
		fetch(`${Config.API_ENDPOINT}/folders`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			}
		})
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
			.then(folders => {
				this.setState({ folders })
			})
      .catch(error => this.setState({ error }))

			fetch(`${Config.API_ENDPOINT}/notes`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				}
			})
				.then(res => {
					if (!res.ok) {
						throw new Error(res.status)
					}
					return res.json()
				})
				.then(notes => {
					this.setState({ notes })
				})
				.catch(error => this.setState({ error }))
		}

	renderNavRoutes(){
		return (
			<>
				{['/', '/folder/:folder_id'].map(path => (
					<Route
						exact
						key={path}
						path={path}
						component={FolderList}
						/>
					))}
					<Route path="/note/:note_id" component={NoteViewNav} />
					<Route path="/add-folder" component={NoteViewNav} />
					<Route path="/add-note" component={NoteViewNav} />
			</>
		)}

	renderMainRoutes(){
		return (
			<>
				{['/', '/folder/:folder_id'].map(path => (
					<Route
						exact
						key={path}
						path={path}
						component={NoteList}
						/>
					))}
					<Route path="/note/:note_id" component={NoteViewMain} />
					<Route path='/add-folder' component={AddFolder}	/>
					<Route path="/add-note" component={AddNote} />
			</>
		)
	}

	render() {
		const contextValue = {
			notes: this.state.notes,
			folders: this.state.folders,
			addFolder: this.handleAddFolder,
			addNote: this.handleAddNote,
			deleteNote: this.deleteNote,
		}
		return (
			<NotefulContext.Provider value={contextValue}>
				<div className='App'>
					<NavError>
						<nav className="App__nav">{this.renderNavRoutes()}</nav>
					</NavError>
					<header className='App__header'>
						<h1>
							<Link to='/'>
								Noteful
							</Link>
						</h1>
					</header>
					<MainError>
						<main className="App__main">{this.renderMainRoutes()}</main>
					</MainError>
				</div>
			</NotefulContext.Provider>
		);
	}
}

export default App;
