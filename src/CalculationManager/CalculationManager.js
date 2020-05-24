import React from 'react';
import classes from './CalculationManager.module.css';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class CalculationManager extends React.Component {
  componentDidMount () {
    this.props.getAll();
  }

  render() {
    let calculations = [];
    if (this.props.calculations) {
      calculations = this.props.calculations
    }
    console.log(calculations)
    console.log("hi")
    return(
      <React.Fragment>  
        <div className={['row', classes.CalculationManager].join(' ')}>
          <div className="col-md-4">
            <label htmlFor="base_string">Base String:</label>
            <input type="text" id="base_string"></input>
          </div>
          <div className="col-md-4 col-md-offset-2">
            <label htmlFor="base_string">Candidate String:</label>
            <input type="text" id="candidate_string"></input>
          </div>
          <div className="col-md-2">  
            <button className={[classes.testButton, 'btn-primary'].join(' ')}>
              Test
            </button>
          </div>
        </div>
        <h2>History</h2>
        {calculations.map((calculation, index) =>
          <div key={calculation.id} className={[classes.historyRow, 'row'].join(' ')}>
            <div className="col-md-4">{calculation.main_string}</div>
            <div className="col-md-2">{calculation.sub_string}</div>
            <div className="col-md-2">{calculation.result.toString()}</div>
            <div className="col-md-2">
              <button className={[classes.deleteButton, 'btn-danger'].join(' ')}>X</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

function mapState(state) {
  return { calculations: state.users.calculations, user: state.user };
}

const actionCreators = {
  getAll: userActions.getAllCalculations
};

export default connect(mapState, actionCreators)(CalculationManager);