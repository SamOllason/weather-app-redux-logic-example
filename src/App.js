import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementNumberOfRequestsMade, getWeatherData} from './actions'
import cityTypes from './static/cityTypes';
import appStyles from './styles/appStyles';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCity: '-'
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log({
            nextProps: nextProps
        });
    }

    handleClick(city){
        this.props.actions.incrementNumberOfRequestsMade();

        this.setState({
            selectedCity: city
        });

        this.props.actions.getWeatherData(city);
    }
  render() {

      const weatherSummaryComponent = this.props.isFetching ?
          <div>
              Fetching...
          </div>
          :
          <div>
            <b>{this.props.weatherSummary}</b>
          </div>;


    return (
      <div style={appStyles.wholeApp}>

          {/*<div >*/}
            <h1 style={appStyles.titleContainerStyle}>Weather app</h1>
          {/*</div>*/}


          <div style={appStyles.headerContainerStyle}>
              <p>Simple exmaple of Redux and Redux-Logic</p>
              <p>Article and source code</p>
          </div>


          <div style={appStyles.topContainerStyle}>
            <div>Click on a city to show the weather there</div>

            <button
                onClick={() => this.handleClick(cityTypes.London)}
                style={appStyles.buttonStyle}
            >
                {cityTypes.London}
            </button>


            <button
                onClick={() => this.handleClick(cityTypes.Paris)}
                style={appStyles.buttonStyle}
            >
                {cityTypes.Paris}
            </button>

            <button
                onClick={() => this.handleClick(cityTypes.New_York)}
                style={appStyles.buttonStyle}
            >
                {cityTypes.New_York}
            </button>

        </div>
          <div style={appStyles.bottomContainerStyle}>
              <div>Selected City: <div><b>{this.state.selectedCity}</b></div></div>
            <div>Weather in Selected City: {weatherSummaryComponent}</div>
            <div>Number of requests made:<b>{this.props.numberOfRequests}</b></div>
          </div>
      </div>
    );
  }
}

/*
     mapDispatchToProps

     Allows us to pass the dispatch methods as callbacks via props
     into our view layer. This way our component can easily
     dispatch actions through action-creator functions. This is cleaner
     than having components dispatch actions themselves

 */

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            incrementNumberOfRequestsMade,
            getWeatherData,

        }, dispatch)
    };
};

/*
    mapStateToProps

    Allows us to pass central application state as read-only props to our component.
 */

const mapStateToProps = (state) => {
    return {
        isFetching: state.weatherDataHandling.isFetching,
        weatherSummary: state.weatherDataHandling.weatherSummary,

        numberOfRequests: state.requestLogging.numberOfRequests
    };
};

// We use the connect feature of react-redux to bind and subscribe our component
// to our Redux Store. This way, whenever the state is changed in the Store
// the relevant changes will be automatically propagated to this component

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
