import React from 'react';
import Helper from '../Helper';

class SubscriptionEvaluation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            evaluation: {}
        };
        this.createPlan();
    }

    createPlan = () => {
        console.log(this.props.match.params.info);
        let info = JSON.parse(this.props.match.params.info);
        let start = new Date(info.startDate);
        let weekday = Helper.getWeekday(start.getDay());
        let weeks = Helper.weeksBetween(start, new Date(info.endDate));

        let evaluation = {};
        let playCounter = [];
        for (let i = 0; i < info.players.length; i++) {
            playCounter.push(0);
        }

        for (let i = 0; i < weeks; i++) {
            let playDay = {};
            let date = new Date(info.startDate);
            date.setDate(date.getDate() + i * 7);

            playDay.weekday = weekday;
            playDay.date = date;

            //determine single games
            let singles = [];
            for (let j = 0; j < info.single; j++) {
                let p1 = Helper.getRndInt(info.numberOfPlayers);
                let p2 = Helper.getRndInt(info.numberOfPlayers);
                while (p1 === p2) {
                    p2 = Helper.getRndInt(info.numberOfPlayers);
                }
                playCounter[p1]++;
                playCounter[p2]++;
                singles.push(info.players[p1] + ' - ' + info.players[p2]);
            }
            playDay.singles = singles;

            //determine double games
            let double = [];
            for (let k = 0; k < info.double; k++) {
                let d1 = Helper.getRndInt(singles.length);
                let d2 = Helper.getRndInt(singles.length);
                while (d1 === d2) {
                    d2 = Helper.getRndInt(singles.length);
                }
                double.push(singles[d1] + ' - ' + singles[d2]);
            }
            playDay.double = double;
            let playdayNr = i + 1;
            evaluation["playday" + playdayNr] = playDay;
        }
        this.setState({evaluation: evaluation});
    };

    render() {
        let table = [];
        for (let i = 0; i < Object.keys(this.state.evaluation).length; i++) {
            let playdayNr = i + 1;
            let playday = this.state.evaluation["playday" + playdayNr];
            let tableRows = [];
            for (let j = 0; j < playday.singles.length; j++) {
                let columns = [];
                columns.push(<td>{new Date(playday.date).toLocaleDateString("de-AT")}</td>);
                columns.push(<td>{playday.weekday}</td>);
                columns.push(<td>{playday.singles[j]}</td>);
                tableRows.push(<tr>{columns}</tr>);
            }
            for (let j = 0; j < playday.double.length; j++) {
                let columns = [];
                columns.push(<td>{new Date(playday.date).toLocaleDateString("de-AT")}</td>);
                columns.push(<td>{playday.weekday}</td>);
                columns.push(<td>{playday.double[j]}</td>);
                tableRows.push(<tr>{columns}</tr>);
            }
            table.push(
                <table>
                    <tbody>
                    {tableRows}
                    </tbody>
                </table>
            );
        }
        return (
            <div>
                <h1>Tennis Winterabo</h1>
                {table}
            </div>
        );
    }
}

export default SubscriptionEvaluation;