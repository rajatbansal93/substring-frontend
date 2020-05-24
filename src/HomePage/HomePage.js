import React from 'react';
import CalculationManager from '../CalculationManager/CalculationManager';
import { Link } from 'react-router-dom';
class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi!!!</h1>
          <p>You're logged in !!!</p>
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
        <CalculationManager />
      </React.Fragment>
    );
  }
}

export default HomePage;