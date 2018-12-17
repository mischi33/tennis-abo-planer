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
            double: 0,
            evaluation: []
        };
    }

    getRndInt(number) {
        return Math.floor(Math.random() * number);
    }

    handleSubmit = (event) => {
        if (this.validateInputs()) {
            let start = new Date(this.state.startDate);
            let weekday = getWeekday(start.getDay());
            let weeks = weeksBetween(start, new Date(this.state.endDate));

            let evaluation = {};
            let playCounter = [];
            for (let i = 0; i < this.state.players.length; i++) {
                playCounter.push(0);
            }

            for (let i = 0; i < weeks; i++) {
                let playDay = {};
                let date = new Date(this.state.startDate);
                date.setDate(date.getDate() + i * 7);

                playDay.weekday = weekday;
                playDay.date = date;

                //determine single games
                let singles = [];
                for (let j = 0; j < this.state.single; j++) {
                    let p1 = this.getRndInt(this.state.numberOfPlayers);
                    let p2 = this.getRndInt(this.state.numberOfPlayers);
                    while (p1 === p2) {
                        p2 = this.getRndInt(this.state.numberOfPlayers);
                    }
                    playCounter[p1]++;
                    playCounter[p2]++;
                    singles.push(this.state.players[p1] + ' - ' + this.state.players[p2]);
                }
                playDay.singles = singles;

                //determine double games
                let double = [];
                for (let k = 0; k < this.state.double; k++) {
                    let d1 = this.getRndInt(singles.length);
                    let d2 = this.getRndInt(singles.length);
                    while (d1 === d2) {
                        d2 = this.getRndInt(singles.length);
                    }
                    double.push(singles[d1] + ' - ' + singles[d2]);
                }
                playDay.double = double;
                let playdayNr = i + 1;
                evaluation["playday" + playdayNr] = playDay;
            }

            //redirect to plan
            let path = 'plan:' + JSON.stringify(evaluation);
            this.props.history.push(path);
        }
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

function weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

function getWeekday(i) {
    switch (i) {
        case 0:
            return 'Sonntag';
        case 1:
            return 'Montag';
        case 2:
            return 'Dienstag';
        case 3:
            return 'Mittwoch';
        case 4:
            return 'Donnerstag';
        case 5:
            return 'Freitag';
        case 6:
            return 'Samstag';
        default:
            return 'No weekday';
    }
}

export default TennisSubscrForm;