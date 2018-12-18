import React from 'react';
import styles from '../Styles/FormStyles';

class TennisSubscrForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            numberOfPlayers: 4,
            players: [],
            day: '',
            single: 0,
            double: 0
        };
    }

    handleSubmit = (event) => {
        let errors = this.validateInputs();
        if (errors.length === 0) {
            let info = {
                "startDate": this.state.startDate,
                "endDate": this.state.endDate,
                "numberOfPlayers": this.state.numberOfPlayers,
                "players": this.state.players,
                "single": this.state.single,
                "double": this.state.doctype
            };
            //redirect to plan
            let path = 'plan' + JSON.stringify(info);
            this.props.history.push(path);
        } else {
            let msg = '';
            for (let i = 0; i < errors.length; i++) {
                msg = msg + errors[i] + '\n';
            }
            alert(msg);
            event.preventDefault();
        }
    };

    handlePlayerChange = (event) => {
        let players = this.state.players.slice();
        let player = {};
        if (!this.state.players[event.target.id]) {
            player.name = event.target.value;
            players.push(player);
        } else {
            players[event.target.id].name = event.target.value;
        }
        this.setState({players: players});
    };

    renderPlayers(numberOfPlayer) {
        if (numberOfPlayer >= 4 || numberOfPlayer === '') {
            let players = [];
            for (let i = 0; i < numberOfPlayer; i++) {
                players.push(<input key={i} id={i} type="text" onChange={this.handlePlayerChange}/>);
                players.push(<br/>);
            }
            return (
                <div>{players}</div>
            )
        } else {
            alert("Es müssen mindestens vier Spieler teilnehmen.");
        }
    }

    validateInputs() {
        let errors = [];
        if (!this.state.startDate) {
            errors.push("Bitte geben Sie ein Startdatum an.");
        }
        if (!this.state.endDate) {
            errors.push("Bitte geben Sie ein Enddatum an.");
        }
        if (this.state.single === 0 && this.state.double === 0) {
            errors.push("Bitte geben Sie mindestens ein Einzel- oder Doppelspiel an.");
        } else {
            let pattern = new RegExp("[0-9]+");
            if (!pattern.test(this.state.single)) {
                errors.push("Einzelspiele: Bitte geben Sie nur Zahlen ein.");
            } else if (!pattern.test(this.state.double)) {
                errors.push("Doppelspiele: Bitte geben Sie nur Zahlen ein.");
            }
        }
        if (this.state.players.length < this.state.numberOfPlayers - 1) {
            errors.push("Bitte geben Sie alle Spielernamen an.")
        } else {
            let players = this.state.players;
            for (let i = 0; i < players.length; i++) {
                let pattern = new RegExp("[a-zA-ZäöüÄÖÜ]+");
                if (!pattern.test(players[i])) {
                    errors.push("Spielernamen: Bitte nur Buchstaben.");
                    break;
                }
            }
        }
        return errors;
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <label style={styles.label}>Startdatum</label>
                        <input type="date"
                               defaultValue={this.state.startDate}
                               onChange={(event) => this.setState({startDate: event.target.value})}/>
                    </div>
                    <div>
                        <label style={styles.label}>Enddatum</label>
                        <input type="date"
                               onChange={(event) => this.setState({endDate: event.target.value})}/>
                    </div>
                    <div>
                        <label style={styles.label}>Anzahl der Spieler</label>
                        <input type="text"
                               value={this.state.numberOfPlayers}
                               onChange={(event) => this.setState({numberOfPlayers: event.target.value})}/>
                    </div>
                    <div>
                        <label>Namen der Spieler:</label>
                        {this.renderPlayers(this.state.numberOfPlayers)}
                    </div>
                    <div>
                        <label style={styles.label}>Anzahl der Einzelspiele</label>
                        <input type="text" value={this.state.single}
                               onChange={(event) => this.setState({single: event.target.value})}/>
                    </div>
                    <div>
                        <label style={styles.label}>Anzahl der Doppelspiele</label>
                        <input type="text" value={this.state.double}
                               onChange={(event) => this.setState({double: event.target.value})}/>
                    </div>
                    <button onSubmit={this.handleSubmit}>Plan erstellen!</button>
                </form>
            </div>
        );
    }
}

export default TennisSubscrForm;