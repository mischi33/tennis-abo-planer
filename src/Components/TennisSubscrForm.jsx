import React from 'react';
import styles from '../Styles/FormStyles';

class TennisSubscrForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: null,
            numberOfPlayers: 4,
            players: [],
            day: '',
            single: 0,
            double: 0
        };
    }

    handleSubmit = (event) => {
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
    };

    handlePlayerChange = (event) => {
        let players = this.state.players.slice();
        if (!this.state.players[event.target.id]) {
            players.push(event.target.value);
        } else {
            players[event.target.id] = event.target.value;
        }
        this.setState({players});
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
        return true;
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
                    <button onClick={this.handleSubmit}>Plan erstellen!</button>
                </form>
            </div>
        );
    }
}

export default TennisSubscrForm;