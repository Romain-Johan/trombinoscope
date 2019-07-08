import React, {Component} from "react";

export default class CollaborateurPopin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborateur: this.props.collabToEdit
        };
    }

    submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        var edit = this.state.collaborateur != null ? true : false;
        this.props.addNewCollaborateur(formData, edit);
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
                                        Tous les champs doivent être remplis pour finaliser l'ajout d'un nouveau collaborateur.
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
                                            <label>Prénom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="age" type="text" name="age" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.age : ''} placeholder="Âge" />
                                            <label>Prénom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="job" type="text" name="job" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.job : ''} placeholder="Poste" />
                                            <label>Prénom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                        <div className="col-3 input-effect">
                                            <input className="effect-16" id="mission" type="text" name="mission" defaultValue={this.state.collaborateur != null ? this.state.collaborateur.mission : ''} placeholder="Mission" />
                                            <label>Prénom</label>
                                            <span className="focus-border"></span>
                                        </div>
                                    </div>
                                    <div className="authent__content-footer">
                                        <button type="submit" className="button black">Valider</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}