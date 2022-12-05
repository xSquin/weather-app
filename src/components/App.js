import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      today: {},
      days: [],
      day1: {},
      day2: {},
      day3: {},
      day4: {},
      day5: {}
    }
  }
  componentDidMount(){
    window.addEventListener('load', this.tick())
  }
  tick = async () =>{
    const apiKey = `876b90b6ee972e22425ad62294ec52e6`;
    const apiToday = `https://api.openweathermap.org/data/2.5/weather?q=Olsztyn&appid=${apiKey}&units=metric&lang=pl`;
    const apiOtherDays = `http://api.openweathermap.org/data/2.5/forecast?q=Olsztyn&appid=${apiKey}&units=metric&lang=pl`

    await fetch(apiToday)
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
    
    await fetch(apiOtherDays)
      .then(response => response.json())
      .then(result => {
        let values = {date: '', temp: '', description: '', icon: ''}
        let arr = [];
        for(let i = 0; i < 40; i++){
          const d = new Date(result.list[i].dt * 1000).toLocaleString("pl-PL");
          if(d.split(' ')[1].toString() === "13:00:00"){
            values = {
              date: d,
              temp: result.list[i].main.temp,
              description: result.list[i].weather[0].description,
              icon: result.list[i].weather[0].icon
            }
            arr.push(values);
          } 
        }
        if(this.state.days.length === 0){
          this.setState({days:[...this.state.days, arr]})
        }
      })
    if(this.state.days.length === 1){
      this.setState({
        day1: this.state.days[0][0],
        day2: this.state.days[0][1],
        day3: this.state.days[0][2],
        day4: this.state.days[0][3],
        day5: this.state.days[0][4]
      })
    }
  }
  render(){
    console.log(this.state);
    return (
      <div className="App">
        <div className="weather-props">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

            <div id="column1">
                <div className="city">{this.state.today.city}</div>
                <div className="date">
                    <span className="material-symbols-outlined">schedule</span>
                    {this.state.today.date}</div>
            </div>
            <div id="column2">
                <div className="temp">
                    <span className="material-symbols-outlined">thermometer</span>
                    {this.state.today.temp} <span className="temp-text">o</span>C
                </div>
                <div className="description"><img className="description-img" src={`http://openweathermap.org/img/wn/${this.state.today.icon}@2x.png`} alt={this.state.today.description}></img>{this.state.today.description}</div>
            </div>
            <div id="column3">
            <div className="pressure">{this.state.today.pressure} hPa</div>
                <div className="wind">
                    <span className="material-symbols-outlined air">air</span>
                    {this.state.today.wind} m/s</div>
            </div>
            
            <div id="column4">
                <div className="box-other-days">
                    <div className="date-o">{this.state.day1.date}</div>
                    <div className="temp-o">
                      <span className="material-symbols-outlined thermometer">thermometer</span>
                      {this.state.day1.temp}<span className="temp-text">o</span>C</div>
                    <img className="description-img-o" src={`http://openweathermap.org/img/wn/${this.state.day1.icon}@2x.png`} alt={this.state.day1.description}></img>
                </div>
                <div className="box-other-days">
                    <div className="date-o">{this.state.day2.date}</div>
                    <div className="temp-o">
                      <span className="material-symbols-outlined thermometer">thermometer</span>
                      {this.state.day2.temp}<span className="temp-text">o</span>C
                      </div>
                    <img className="description-img-o" src={`http://openweathermap.org/img/wn/${this.state.day2.icon}@2x.png`} alt={this.state.day2.description}></img>
                </div>
                <div className="box-other-days">
                    <div className="date-o">{this.state.day3.date}</div>
                    <div className="temp-o">
                      <span className="material-symbols-outlined thermometer">thermometer</span>
                      {this.state.day3.temp}<span className="temp-text">o</span>C
                    </div>
                    <img className="description-img-o" src={`http://openweathermap.org/img/wn/${this.state.day3.icon}@2x.png`} alt={this.state.day3.description}></img>
                </div>
                <div className="box-other-days">
                    <div className="date-o">{this.state.day4.date}</div>
                    <div className="temp-o">
                      <span className="material-symbols-outlined thermometer">thermometer</span>
                      {this.state.day4.temp}<span className="temp-text">o</span>C
                    </div>
                    <img className="description-img-o" src={`http://openweathermap.org/img/wn/${this.state.day4.icon}@2x.png`} alt={this.state.day4.description}></img>
                </div>
                <div className="box-other-days">
                    <div className="date-o">{this.state.day5.date}</div>
                    <div className="temp-o">
                      <span className="material-symbols-outlined thermometer">thermometer</span>
                      {this.state.day5.temp}<span className="temp-text">o</span>C
                    </div>
                    <img className="description-img-o" src={`http://openweathermap.org/img/wn/${this.state.day5.icon}@2x.png`} alt={this.state.day5.description}></img>
                </div>
            </div>
        </div>
      </div>
    );
  };
}
export default App;