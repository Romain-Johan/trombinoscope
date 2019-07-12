import React, {Component} from "react";

export default class CollaborateurPopin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborateur: this.props.collabToEdit,
            selectedFile: null,
            imageUrl: null,
        };
    }

    submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        if(this.state.collaborateur != null) {
            formData.append("id", this.state.collaborateur.id)
            this.props.editCollaborateur(formData);
        } else {
            this.props.addCollaborateur(formData);
        }
    }

    onClickHandler = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        return fetch("/file/upload", {
            headers: {
                'Accept': 'application/json',
            },
            method: "POST",
            body: data
        }).then(response =>
			response.json()
		).then(image => {
            this.downloadImage(image.name);
		});
    }

    downloadImage(name) {
        console.log(name);
        fetch("/file/download/"+name, {
			headers: {
				'Accept': 'application/json'
			},
        }).then(response => {
            console.log(response.type)
        })
    }

    onChangeHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }

    render() {
        return (<div className="popin-container">
                <div className="popin-background" onClick={() => {this.props.onClose()}}></div>
                    <div className="popin" onClick={e => e.stopPropagation()}>
                        <div className="popin-content">
                            <div className="authent__content">
                                <div className="modal__header-close-button" onClick={() => {this.props.onClose()}}/>
                                <div className="authent__content-title">{this.state.collaborateur != null ? "Modifier un collaborateur" : "Ajouter un collaborateur"}</div>
                                <div className="authent__content-text">
                                    Veuillez remplir le formulaire pour ajouter un collaborateur 
                                </div>
                                {this.props.addCollaborateurError && (
                                    <div className="authent__content-error">
                                        Une erreur est survenue.
                                    </div>
                                )}
                                <form method="post" onSubmit={this.submit.bind(this)}>
                                    <div className="authent__content-mobile">
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="firstname" type="text" name="firstname" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.firstname : ''} placeholder="Prénom" />
                                            <label>Prénom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="lastname" type="text" name="lastname" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.lastname : ''} placeholder="Nom" />
                                            <label>Nom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="age" type="text" name="age" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.age : ''} placeholder="Année d'embauche" />
                                            <label>Année d'embauche</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="job" type="text" name="job" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.job.libelle : ''} placeholder="Poste occupé" />
                                            <label>Poste occupé</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="mission" type="text" name="mission" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.mission.libelle : ''} placeholder="Mission actuelle" />
                                            <label>Mission actuelle</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <input type="file" name="file" onChange={this.onChangeHandler}/>
                                        <img src={this.state.imageUrl}></img>
                                        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                                    </div>
                                    <div className="authent__content-footer">
                                        <button type="submit" className="button white">Valider</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}