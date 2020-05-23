import React from 'react';
import { Link } from 'react-router-dom';
class HomePage extends React.Component {
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi!!!</h1>
        <p>You're logged in !!!</p>
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;