import React, {Component} from "react";

export default class CollaborateurPopin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborateur: this.props.collabToEdit,
            postes: this.props.postes,
            clients: this.props.clients,
            skills: this.props.skills,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMultipleInputChange = this.handleMultipleInputChange.bind(this);
    }

    submit(event) {
        event.preventDefault();
        var collaborateur = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            picture: this.state.picture,
            mission: {"id": this.state.mission},
            job: {"id": this.state.job},
            skills: this.state.competences
        }
        if(this.state.collaborateur != null) {
            this.props.editCollaborateur(JSON.stringify(collaborateur), this.state.collaborateur.id);
        } else {
            this.props.addCollaborateur(JSON.stringify(collaborateur));
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleMultipleInputChange(event) {
        var value = ([...event.target.options].filter(option => option.selected).map(option => option.value))
        var elements = [];
        for(var i = 0; i<value.length; i++) {
            var element = {};
            element.id = value[i];
            elements.push(element);
        }
        this.setState({
            competences: elements
        });
    }

    onImageHandler = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        return fetch("/file/upload", {
            headers: {
                'Accept': 'application/json',
            },
            method: "POST",
            body: data
        }).then(response =>
			response.json()
		).then(image => {
            this.setState({
                picture: image.name
            });
		});
    }

    render() {

        const postes = this.state.postes.map((p, index) => {
            return <option key={index} value={p.id}>{p.libelle}</option>
        });
        const clients = this.state.clients.map((c, index) => {
            return <option key={index} value={c.id}>{c.libelle}</option>
        });
        const skills = this.state.skills.map((s, index) => {
            return <option key={index} value={s.id}>{s.libelle}</option>
        });

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
                                            <input className="effect-16" id="firstname" type="text" name="firstname" 
                                            value={this.state.collaborateur != null ? this.state.collaborateur.firstname : this.state.value} 
                                            onChange={this.handleInputChange}
                                            placeholder="Prénom" />
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="lastname" type="text" name="lastname" 
                                            value={this.state.collaborateur != null ? this.state.collaborateur.lastname : this.state.value} 
                                            onChange={this.handleInputChange} 
                                            placeholder="Nom"/>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="age" type="text" name="age" 
                                            value={this.state.collaborateur != null ? this.state.collaborateur.age : this.state.value} 
                                            onChange={this.handleInputChange}
                                            placeholder="Année d'embauche" />
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <select name="job"
                                            value={this.state.collaborateur != null ? this.state.collaborateur.job.libelle : this.state.value}
                                            onChange={this.handleInputChange} >
                                                <option></option>
                                                {postes}
                                            </select>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <select name="mission"
                                            value={this.state.collaborateur != null ? this.state.collaborateur.mission.libelle : this.state.value}
                                            onChange={this.handleInputChange} >
                                                <option></option>
                                                {clients}
                                            </select>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <select multiple={true} name="competences"
                                            value={this.state.value}
                                            onChange={this.handleMultipleInputChange} >
                                                {skills}
                                            </select>
                                        </div>
                                        <input type="file" name="file" onChange={this.onImageHandler}/>
                                        <img src={this.state.imageUrl}></img>
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