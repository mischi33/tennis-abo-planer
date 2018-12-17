import React from 'react';

class SubscriptionEvaluation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            evaluation: props.match.params.evaluation
        };

    }

    renderTable(event) {

    }

    render() {
        let evaluation = JSON.parse(this.state.evaluation.substr(1));
        console.log(evaluation);
        let table = [];
        for (let i = 0; i < Object.keys(evaluation).length; i++) {
            let playdayNr = i +1;
            let playday = evaluation["playday" + playdayNr];
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