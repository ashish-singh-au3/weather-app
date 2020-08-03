import React, { Component } from "react";
import { ShowData } from "../weather/weather";
import "./getData.css";
import Footer from "../Footer/footer";

export default class GetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city,
      sunrise: "",
      sunset: "",
      humidity: "",
      pressure: "",
      temp: "",
      tempMax: "",
      tempMin: "",
      windDir: "",
      windSpeed: "",
      weatherDesc: "",
      weatherIcon: "",
      weatherMain: "",
      currTime: "",
      cityName: "",
      render: true,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.city);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.city !== nextProps.city) {
      this.fetchData(nextProps.city);
    }
  }

  changeTime = (time) => {
    let newTime = new Date(time * 1000),
      hours = newTime.getHours(),
      minutes = newTime.getMinutes(),
      minutesFixed,
      changedTime;

    if (minutes < 10) {
      minutesFixed = "0" + minutes.toString();
    } else {
      minutesFixed = minutes;
    }
    changedTime = hours + ":" + minutesFixed;

    return changedTime;
  };

  fetchData(cityName) {
    let main = this;
    //let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=169ff6a77b2eb60817b01d0bf02a63c0`;

    if (!window.fetch) {
      console.log("wrong");
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=169ff6a77b2eb60817b01d0bf02a63c0`,
      {
        method: "GET",
      }
    ).then(function (response) {
      if (response.status !== 200) {
        main.setState({
          cityName: "No results found",
          render: false,
        });
      } else {
        response.json().then(function (data) {
          main.setState({
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temp: data.main.temp,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            windDir: data.wind.deg,
            windSpeed: data.wind.speed,
            weatherDesc: data.weather[0].description,
            weatherIcon: data.weather[0].icon,
            weatherMain: data.weather[0].main,
            currTime: data.dt,
            cityName: data.name,
            render: true,
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="weatherInfo">
          <h2>{this.state.cityName}</h2>
          {this.state.render === true ? (
            <div className="dataBox">
              <ShowData
                mainClass="sunInfo"
                boxData={[
                  {
                    data: `${this.changeTime(this.state.sunrise)} a.m`,
                    name: "Sunrise:",
                    boxClass: "sunrise",
                  },
                  {
                    data: `${this.changeTime(this.state.sunset)} p.m`,
                    name: "Sunset:",
                    boxClass: "sunrise",
                  },
                ]}
              />
              <ShowData
                mainClass="weatherCond"
                boxData={[
                  {
                    data: this.state.weatherMain,
                    name: "Current weather:",
                    boxClass: "main",
                  },
                  {
                    data: this.state.weatherDesc,
                    name: "Description:",
                    boxClass: "description",
                  },
                  {
                    data: this.state.weatherIcon,
                    name: "",
                    boxClass: "icon",
                  },
                ]}
              />

              <ShowData
                mainClass="currentTime"
                boxData={[
                  {
                    data: this.changeTime(this.state.currTime),
                    name: "Time:",
                    boxClass: "time",
                  },
                ]}
              />

              <ShowData
                mainClass="mainWeather"
                boxData={[
                  {
                    data: `${this.state.humidity} %`,
                    name: "Humidity:",
                    boxClass: "humidity",
                  },
                  {
                    data: `${this.state.pressure} hPa`,

                    name: "Pressure:",
                    boxClass: "pressure",
                  },
                  {
                    data: `${this.state.temp}°C`,
                    name: "Temperature:",
                    boxClass: "temp",
                  },
                  {
                    data: `${this.state.tempMax}°C`,
                    name: "Max temperature:",
                    boxClass: "tempMax",
                  },
                  {
                    data: `${this.state.tempMin}°C`,
                    name: "Min temperature:",
                    boxClass: "tempMin",
                  },
                ]}
              />
              <ShowData
                mainClass="windInfo"
                boxData={[
                  {
                    data: `${this.state.windSpeed} km/h`,
                    name: "Wind Speed:",
                    boxClass: "windSpeed",
                  },
                  {
                    data: `${this.state.windDir}°`,
                    name: "Degree of wind:",
                    boxClass: "windDeg",
                  },
                ]}
              />
            </div>
          ) : null}
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}
