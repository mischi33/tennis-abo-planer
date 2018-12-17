import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import TennisSubscriptionForm from './Components/TennisSubscrForm';
import SubscriptionEvaluation from './Components/SubscriptionEvaluation';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={TennisSubscriptionForm}/>
                    <Route path="/plan:info" component={SubscriptionEvaluation}/>
                </div>
            </Router>
        );
    }
}

export default App;
