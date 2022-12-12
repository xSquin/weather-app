import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      today: {city: '', date: '', temp: '', description: '', pressure: '', wind: '', icon: ''},
      days: [0, 0, 0, 0, 0]
    }
  }
  componentDidMount(){
    this.tickToday()
    this.tickDays()
  }
  tickToday = () => {
    const apiToday = `https://api.openweathermap.org/data/2.5/weather?q=Olsztyn&appid=876b90b6ee972e22425ad62294ec52e6&units=metric&lang=pl`;
    fetch(apiToday)
      .then(response => response.json())
      .then(result => {
        const time = new Date().toLocaleString()
        this.setState({
          today: {
            city: result.name,
            date: time,
            temp: result.main.temp,
            description: result.weather[0].description,
            pressure: result.main.pressure,
            wind: result.wind.speed,
            icon: result.weather[0].icon
          }
        })
      })
  }
  tickDays = () => {
    const apiOtherDays = `http://api.openweathermap.org/data/2.5/forecast?q=Olsztyn&appid=876b90b6ee972e22425ad62294ec52e6&units=metric&lang=pl`;
    fetch(apiOtherDays)
      .then(response => response.json())
      .then(result => {
        let values = {}
        let days = [];
        for(let i = 0; i < 40; i++){
          const d = new Date(result.list[i].dt * 1000).toLocaleString("pl-PL");
          if(d.split(' ')[1].toString() === "13:00:00"){
            values = {
              date: d,
              temp: result.list[i].main.temp,
              description: result.list[i].weather[0].description,
              icon: result.list[i].weather[0].icon
            }
            days.push(values);
          } 
        }
        this.setState({...this.state, days})
      })
  }
  render(){
    return (
      <div className="App">
        <div className="weather-props">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <div id="row-weather-props">
              <div className="city">{this.state.today.city}</div>
              <div className="date-today">
                <span className="material-symbols-outlined">schedule</span>
                {this.state.today.date}
              </div>
            </div>
            <div id="row-weather-props">
              <div className="temp-today">
                <span className="material-symbols-outlined">thermometer</span>
                {this.state.today.temp} <span className="temp-text">o</span>C
              </div>
              <div className="description-today">
                <img className="description-img" src={`http://openweathermap.org/img/wn/${this.state.today.icon}@2x.png`} alt={this.state.today.description}></img>
                {this.state.today.description}
              </div>
            </div>
            <div id="row-weather-props">
              <div className="pressure-today">
                {this.state.today.pressure} hPa
              </div>
              <div className="wind-today">
                <span className="material-symbols-outlined air">air</span>
                {this.state.today.wind} m/s
              </div>
            </div>
            <div id="row-weather-props">
              {this.state.days.map(e => 
                <div className="box-other-days">
                  <div className="date-other-days">{e.date}</div>
                  <div className="temp-other-days">
                    <span className="material-symbols-outlined thermometer">thermometer</span>
                    {e.temp}<span className="temp-text">o</span>C
                  </div>
                  <img src={`http://openweathermap.org/img/wn/${e.icon}@2x.png`} alt={e.description}></img>
                </div>
              )}
            </div>
        </div>
      </div>
    );
  };
}
export default App;
