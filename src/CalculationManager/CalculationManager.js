import React from 'react';
import classes from './CalculationManager.module.css';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class CalculationManager extends React.Component {
  state = {
    string: {
      base: '',
      candidate: ''
    },
    submitted: false
  }

  componentDidMount () {
    this.props.getAll();
  };

  handleDeleteCal(id) {
    return (e) => this.props.deleteCal(id);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    const { string } = this.state;
    this.setState({
        string: {
            ...string,
            [name]: value
        }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ submitted: true });
    const { string } = this.state;
    if (string.base && string.candidate) {
      this.props.createCal(string);
      this.setState({
        string: {
          base: '',
          candidate: ''
        },
        submitted: false
      })
    }
  }

  render() {
    const { string, submitted } = this.state;
    let calculations = [];
    
    if (this.props.calculations) {
      calculations = this.props.calculations
    }
    return(
      <React.Fragment>  
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={['row', classes.CalculationManager].join(' ')}>
            <div className="col-md-4">
              <label htmlFor="base_string">Base String:</label>
              <input type="text" id="base_string" name='base' value={string.base} onChange={this.handleChange}></input>
              {submitted && !string.base &&
                              <div className="help-block">Base String is required</div>
                          }
            </div>
            <div className="col-md-4 col-md-offset-2">
              <label htmlFor="base_string" >Candidate String:</label>
              <input type="text" id="candidate_string" name='candidate' value={string.candidate} onChange={this.handleChange}></input>
              {submitted && !string.base &&
                <div className="help-block">Candidate String is required</div>
              }
            </div>
            <div className="col-md-2">  
              <button className={[classes.testButton, 'btn-primary'].join(' ')}>
                Test
              </button>
            </div>
          </div>
        </form>
        <h2>History</h2>
        {calculations.map((calculation, index) =>
          <div key={calculation.id} className={[classes.historyRow, 'row'].join(' ')}>
            <div className="col-md-4">{calculation.main_string}</div>
            <div className="col-md-2">{calculation.sub_string}</div>
            <div className="col-md-2">{calculation.result.toString()}</div>
            <div className="col-md-2">
              <button className={[classes.deleteButton, 'btn-danger'].join(' ')} onClick={this.handleDeleteCal(calculation.id)}>X</button>
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
  getAll: userActions.getAllCalculations,
  deleteCal: userActions.deleteCal,
  createCal: userActions.createCal
};

export default connect(mapState, actionCreators)(CalculationManager);