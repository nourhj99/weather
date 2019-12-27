import React, { Component } from 'react';
import Weather from './app-component/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import './App.css';
import Form from './app-component/form';
import News from './News';

const API_Key = "05c7ea1b2229b44528679656c577b8c2";


class App extends Component {


  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    }
    this.weatherIcon =
      {
        thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog"
      }

  }


  get_weatherIcons(rangId) {
    switch (true) {
      case rangId >= 200 && rangId <= 232:
        this.setState({ icon: this.weatherIcon.thunderstorm });
        break;
      case rangId >= 300 && rangId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangId >= 500 && rangId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangId >= 600 && rangId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangId >= 701 && rangId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangId >= 801 && rangId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });

    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      try {
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`);
        const response = await api_call.json();
        console.log(response);
        this.setState({
          city: `${response.name},${response.sys.country}`, celsius: this.calcelsius(response.main.temp),
          temp_max: this.calcelsius(response.main.temp_max), temp_min: this.calcelsius(response.main.temp_min),
          description: response.weather[0].description, error: false
        })
        this.get_weatherIcons(response.weather[0].id);
      }
      catch (error) { console.log(error); }
    }
    else {
      this.setState({ error: true })
    }
  }

  calcelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  


  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description}
          weatherIcon={this.state.icon} />
        <News city={this.state.city}></News>
      </div>

    );

  }
}


export default App;
