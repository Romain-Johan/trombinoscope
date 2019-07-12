'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
import CollaborateurPopin from "./components/CollaborateurPopin";
import './fonctions/simplesearch';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mode: 'collaborateur-list',
			collaborateurs: [],
			clients: [],
			postes: [],
			collaborateur: '',
			selectedFile: null
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
		fetch("/client/list", {
			headers: {
				'Accept': 'application/json'
			},
		}).then(response =>
			response.json()
		).then(clients => {
			this.setState({
				clients
			})
		});
		fetch("/poste/list", {
			headers: {
				'Accept': 'application/json'
			},
		}).then(response =>
			response.json()
		).then(postes => {
			this.setState({
				postes
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

	addCollaborateur = (formData) => {
        return fetch("/collaborateur/add", {
            headers: {
                'Accept': 'application/json',
            },
            method: "POST",
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

	editCollaborateur = (formData) => {
        return fetch("/collaborateur/edit", {
            headers: {
                'Accept': 'application/json',
            },
            method: "PUT",
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
	
	switchToAddMode = () => {
		this.setState({mode: 'collaborateur-add'});
	}
	
	switchToEditMode = (collabToEdit) => {
		this.setState({mode: 'collaborateur-edit', collaborateur: collabToEdit});
	}
	
	onClose = () => {
		this.setState({mode: 'collaborateur-list', addCollaborateurError: false});
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
			return <div className="collaborateur__card searchitem" key={index}>
				<div className="collaborateur__card-actions">
					<a className="collaborateur__card-edit" onClick={() => {this.switchToEditMode(c)}}></a>
					<a className="collaborateur__card-delete" onClick={() => {this.deleteCollaborateur(c)}}></a>
				</div>
				<div className="collaborateur__card-picture">
					<img src={randomImages[Math.floor(Math.random()*randomImages.length)]}></img>
				</div>
				<div className="collaborateur__card-infos">
					<div className="collaborateur__card-infos-firstname">{c.firstname} {c.lastname}</div>
					<div className="collaborateur__card-infos-howlong">Chez nous depuis {c.age}</div>
					<div className="collaborateur__card-infos-mission"><img src="../images/mission.png" width="20px" height="20px"/>{c.mission.libelle}</div>
					<div className="collaborateur__card-infos-job"><img src="../images/poste.png" width="20px" height="20px"/>{c.job.libelle}</div>
				</div>
			</div>
		});
		Array.from(document.querySelectorAll('.searchable')).forEach(searcheable => {
			const searchInputs = Array.from(searcheable.querySelectorAll('.search'));
			searchInputs.forEach(searchInput => {
				searchInput.addEventListener('keyup', event => {
					const query = event.target.value;
					Array.from(searcheable.querySelectorAll('.searchitem')).forEach(item => {
						if (!query || item.innerText.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
							item.style.display = '';
						} else {
							item.style.display = 'none';
						}
					});
				})
			})
		});
		return (
				<section className="wrapper searchable">
					<div className="menu">
						<button type="button" className="button white" onClick={() => {this.switchToAddMode()}}>+</button>
						<div className="search-form">
							<input type="search" defaultValue="" placeholder="Rechercher" className="search-input search" />
							<div className="search-button">
								<img src="../images/search.png"></img>
							</div>
						</div>
					</div>
					<div className="content">
						{collaborateurs}
					</div>
					{this.state.mode === 'collaborateur-add' &&
					<CollaborateurPopin 
						addCollaborateur={this.addCollaborateur} 
						onClose={this.onClose}
						addCollaborateurError={this.state.addCollaborateurError}
						clients={this.state.clients}
						postes={this.state.postes} 
						selectedFile={this.state.selectedFile}/> }
					{this.state.mode === 'collaborateur-edit' &&
					<CollaborateurPopin 
						addCollaborateur={this.addCollaborateur} 
						editCollaborateur={this.editCollaborateur} 
						onClose={this.onClose} 
						collabToEdit={this.state.collaborateur} /> }
				</section>
		)
	}
}

ReactDOM.render((
	<App />
), document.getElementById('react'));

