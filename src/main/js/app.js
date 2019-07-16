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
			skills: [],
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
		fetch("/competence/list", {
			headers: {
				'Accept': 'application/json'
			},
		}).then(response =>
			response.json()
		).then(skills => {
			this.setState({
				skills
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

	addCollaborateur = (collaborateur) => {
        return fetch("/collaborateur/add", {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
            method: "POST",
            body: collaborateur
        }).then(response => {
            if (response.status === 200) {
				this.setState({mode: 'collaborateur-list'})
				this.loadFromServer();
            } else {
                this.setState({addCollaborateurError : true})
            }
        });
	}

	editCollaborateur = (collaborateur, id) => {
        return fetch("/collaborateur/edit/"+id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
            method: "PUT",
            body: collaborateur
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

		const collaborateurs = this.state.collaborateurs.map((c, index) => {
			return <div className="collaborateur__card searchitem" key={index}>
				<div className="collaborateur__card-actions">
					<a className="collaborateur__card-edit" onClick={() => {this.switchToEditMode(c)}}></a>
					<a className="collaborateur__card-delete" onClick={() => {this.deleteCollaborateur(c)}}></a>
				</div>
				<div className="collaborateur__card-picture">
					<img src={"../images/Avatars/"+c.picture}></img>
				</div>
				<div className="collaborateur__card-infos">
					<div className="collaborateur__card-infos-firstname">{c.firstname} {c.lastname}</div>
					<div className="collaborateur__card-infos-howlong"><img src="../images/calendrier.png"/>Chez nous depuis {c.age}</div>
					<div className="collaborateur__card-infos-mission"><img src="../images/mission.png"/>Actuellement en mission chez {c.mission.libelle}</div>
					<div className="collaborateur__card-infos-job"><img src="../images/poste.png"/>{c.job.libelle}</div>
					<div className="collaborateur__card-infos-skills">
						{c.skills && c.skills.map((s, index) => {
							return <div key={index} className="collaborateur__card-infos-skills-skill">{s.libelle}</div>
						})}
					</div>
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
						<img className="menu-logo" src="../images/logo.png"></img>
						<div className="search-form">
							<input type="search" defaultValue="" placeholder="Rechercher" className="search-input search" />
							<div className="search-button">
								<img src="../images/search.png"></img>
							</div>
						</div>
					</div>
					<div className="content">
						{collaborateurs}
						<button type="button" className="button white add" onClick={() => {this.switchToAddMode()}}>+</button>
					</div>
					{this.state.mode === 'collaborateur-add' &&
					<CollaborateurPopin 
						addCollaborateur={this.addCollaborateur} 
						onClose={this.onClose}
						addCollaborateurError={this.state.addCollaborateurError}
						clients={this.state.clients}
						postes={this.state.postes}
						skills={this.state.skills} /> }
					{this.state.mode === 'collaborateur-edit' &&
					<CollaborateurPopin 
						addCollaborateur={this.addCollaborateur} 
						editCollaborateur={this.editCollaborateur} 
						onClose={this.onClose} 
						clients={this.state.clients}
						postes={this.state.postes} 
						skills={this.state.skills}
						collabToEdit={this.state.collaborateur} /> }
				</section>
		)
	}
}

ReactDOM.render((
	<App />
), document.getElementById('react'));

