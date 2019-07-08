'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
import CollaborateurPopin from "./components/CollaborateurPopin";

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mode: 'collaborateur-list',
			collaborateurs: [],
			collaborateur: '',
		};
	}
	
	componentDidMount() {
		this.loadFromServer();
	}
	
	loadFromServer = () => {
		fetch("/collaborateur/list", {
			headers: {
				'Accept': 'application/json'
			},
		}).then(response =>
			response.json()
		).then(collaborateurs => {
			this.setState({
				collaborateurs
			})
		});
	}
	
	deleteCollaborateur = (collaborateur) => {
		return fetch("/collaborateur/delete", {
			headers: {
				'Accept': 'application/json',
		        'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(collaborateur)
		}).then(response => {
			if(response.status === 200) {
				this.loadFromServer();
			} else {
			}
		});
	}

	addNewCollaborateur = (formData, edit) => {
        return fetch("/collaborateur/add", {
            headers: {
                'Accept': 'application/json',
            },
            method: edit ? "PUT" : "POST",
            body: formData
        }).then(response => {
            if (response.status === 200) {
				this.setState({mode: 'collaborateur-list'})
				this.loadFromServer();
            } else {
                this.setState({addCollaborateurError : true})
            }
        });
	}
	
	addCollaborateur = () => {
		this.setState({mode: 'collaborateur-add'});
	}
	
	editCollaborateur = (collabToEdit) => {
		this.setState({mode: 'collaborateur-edit', collaborateur: collabToEdit});
	}
	
	onClose = () => {
		this.setState({mode: 'collaborateur-list'});
	}

	render() {

		const randomImages = [
			"../images/man1.png",
			"../images/man2.png",
			"../images/man3.png",
			"../images/man4.png",
			"../images/woman1.png",
			"../images/woman2.png",
			"../images/woman3.png",
		];

		const collaborateurs = this.state.collaborateurs.map((c, index) => {
			return <div className="collaborateur__card" key={index}>
				<div className="collaborateur__card-actions">
					<a className="collaborateur__card-edit" onClick={() => {this.editCollaborateur(c)}}></a>
					<a className="collaborateur__card-delete" onClick={() => {this.deleteCollaborateur(c)}}></a>
				</div>
				<div className="collaborateur__card-picture">
					<img src={randomImages[Math.floor(Math.random()*randomImages.length)]}></img>
				</div>
				<div className="collaborateur__card-infos">
					<p>{c.firstname} {c.lastname}</p>
					<p>{c.age} ans</p>
					<p>{c.job}</p>
					<p>{c.mission}</p>
				</div>
			</div>
		});

		return (
				<section className="wrapper">
					<div className="menu">
					<button type="button" className="button" onClick={() => {this.addCollaborateur()}}>Ajouter</button>
					</div>
					<div className="content">
						{collaborateurs}
					</div>
					{this.state.mode === 'collaborateur-add' &&
					<CollaborateurPopin 
						addNewCollaborateur={this.addNewCollaborateur} 
						onClose={this.onClose}
						addCollaborateurError={this.state.addCollaborateurError} /> }
					{this.state.mode === 'collaborateur-edit' &&
					<CollaborateurPopin 
						addNewCollaborateur={this.addNewCollaborateur} 
						onClose={this.onClose} 
						collabToEdit={this.state.collaborateur} /> }
				</section>
		)
	}



}

ReactDOM.render((
	<App />
), document.getElementById('react'));

