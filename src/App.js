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
            selectedCity: 'not city selected'
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log({
            nextProps: nextProps
        });
    }

    handleClick(city){
        console.log({
            city_clicked: city
        });

        this.props.actions.incrementNumberOfRequestsMade();

        this.setState({
            selectedCity: city
        });

        // WE WILL UNCOMMENT TO THIS WHEN WE ADD REDUX_LOGIC!!
        this.props.actions.getWeatherData(city);
    }
  render() {

      const weatherSummaryComponent = this.props.isFetching ?
          // we want to display a loading message to user while async data fetch happens
          <div>
              Fetching...
          </div>
          :

          <b>{this.props.weatherSummary}</b>;


    return (
      <div>
        <div style={appStyles.topContainerStyle}>
            <div>Click on a city to show the weather there</div>
            <button onClick={() => this.handleClick(cityTypes.London)}>{cityTypes.London}</button>
            <button onClick={() => this.handleClick(cityTypes.Paris)}>{cityTypes.Paris}</button>
            <button onClick={() => this.handleClick(cityTypes.New_York)}>'{cityTypes.New_York}</button>
        </div>
          <div style={appStyles.bottomContainerStyle}>
              <div>Selected City: <b>{this.state.selectedCity}</b></div>
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
     than having them dispatch actions themselves

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

    Allows us to pass application state as read-only props to our component.
 */

const mapStateToProps = (state) => {
    return {
        isFetching: state.weatherDataHandling.isFetching,
        weatherSummary: state.weatherDataHandling.weatherSummary,

        numberOfRequests: state.requestLogging.numberOfRequests
    };
};

// We use the connect feature of react-redux to bind to subscribe our component
// to the application store. This way, whenever the state is changed in the app store
// the relevant changes (as determined by what properties of the application state we map above)
// will be automatically propagated to this component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
