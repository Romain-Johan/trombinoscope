import React, {Component} from "react";

export default class CollaborateurPopin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborateur: this.props.collabToEdit,
            postes: this.props.postes,
            clients: this.props.clients,
            imageUrl: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    submit(event) {
        event.preventDefault();
        var collaborateur = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            mission: {"libelle": this.state.mission},
            job: {"libelle": this.state.job},
        }
        this.props.addCollaborateur(JSON.stringify(collaborateur));
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onImageHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
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
            console.log(image.name);
		});
    }

    render() {

        const postes = this.state.postes.map((p, index) => {
            return <option key={index} value={p.libelle}>{p.libelle}</option>
        });
        const clients = this.state.clients.map((c, index) => {
            return <option key={index} value={c.libelle}>{c.libelle}</option>
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
                                            <input className="effect-16" id="firstname" type="text" name="firstname" value={this.state.value} onChange={this.handleInputChange} />
                                            <label>Prénom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="lastname" type="text" name="lastname" value={this.state.value} onChange={this.handleInputChange} />
                                            <label>Nom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="age" type="text" name="age" value={this.state.value} onChange={this.handleInputChange} />
                                            <label>Année d'embauche</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <select onChange={this.handleInputChange} value={this.state.value} name="job">
                                                {postes}
                                            </select>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <select onChange={this.handleInputChange} value={this.state.value} name="mission">
                                                {clients}
                                            </select>
                                        </div>
                                        <input type="file" name="file" onChange={this.onImageHandler}/>
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