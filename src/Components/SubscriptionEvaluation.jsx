import React from 'react';
import Helper from '../Helper';

class SubscriptionEvaluation extends React.Component {

    createPlan = () => {
        let info = JSON.parse(this.props.match.params.info);
        let start = new Date(info.startDate);
        let weekday = Helper.getWeekday(start.getDay());
        let weeks = Helper.weeksBetween(start, new Date(info.endDate));
        let evaluation = {};

        for (let i = 0; i < weeks; i++) {
            let playDay = {};
            let date = new Date(info.startDate);
            date.setDate(date.getDate() + i * 7);

            playDay.weekday = weekday;
            playDay.date = date;

            //determine single games
            let singles = [];
            for (let j = 0; j < info.single; j++) {
                let minPlayers1 = this.getPlayerWithLowestMatches(info.players);
                let i1 = Helper.getRndInt(minPlayers1.length);
                let p1 = minPlayers1[i1];
                p1.matchCounter++;
                let minPLayers2 = this.getPlayerWithLowestMatches(info.players);
                let i2 = Helper.getRndInt(minPLayers2.length);
                let p2 = minPLayers2[i2];
                p2.matchCounter++;
                let singleMatch = {
                    "player1": p1,
                    "player2": p2
                };
                singles.push(singleMatch);
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
                let single1 = singles[d1];
                let single2 = singles[d2];
                while (single1.player1 === single2.player1 || single1.player1 === single2.player2 || single1.player2 === single2.player1 || single1.player2 === single2.player2) {
                    d2 = Helper.getRndInt(singles.length);
                    single2 = singles[d2];
                }
                let doubleMatch = {
                    "single1": singles[d1],
                    "single2": singles[d2]
                };
                double.push(doubleMatch);
            }
            playDay.double = double;
            let playdayNr = i + 1;
            evaluation["playday" + playdayNr] = playDay;
        }
        return evaluation;
    };

    getPlayerWithLowestMatches(players) {
        let min = Number.MAX_SAFE_INTEGER;
        let minIndex = 0;
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            if (player.matchCounter < min) {
                min = player.matchCounter;
                minIndex = i;
            }
        }
        let minPlayers = [];
        for (let j = 0; j < players.length; j++) {
            if (players[j].matchCounter === players[minIndex].matchCounter) {
                minPlayers.push(players[j]);
            }
        }
        return minPlayers;
    }

    render() {
        let evaluation = this.createPlan();
        let table = [];
        for (let i = 0; i < Object.keys(evaluation).length; i++) {
            let playdayNr = i + 1;
            let playday = evaluation["playday" + playdayNr];
            let tableRows = [];
            for (let j = 0; j < playday.singles.length; j++) {
                let columns = [];
                columns.push(<td>{new Date(playday.date).toLocaleDateString("de-AT")}</td>);
                columns.push(<td>{playday.weekday}</td>);
                columns.push(<td>{playday.singles[j].player1.name + ' - ' + playday.singles[j].player2.name}</td>);
                tableRows.push(<tr>{columns}</tr>);
            }
            for (let j = 0; j < playday.double.length; j++) {
                let columns = [];
                columns.push(<td>{new Date(playday.date).toLocaleDateString("de-AT")}</td>);
                columns.push(<td>{playday.weekday}</td>);
                columns.push(<td>{playday.double[j].single1.player1.name + '/' + playday.double[j].single1.player2.name
                + ' - ' + playday.double[j].single2.player1.name + '/' + playday.double[j].single2.player2.name}</td>);
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