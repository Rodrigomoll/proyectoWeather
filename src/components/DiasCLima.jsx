import React, { useEffect, useState } from "react";
import navigationIcon from "../assets/navigation.svg";
import "../DiasClima.css";

function DiasCLima({ city }) {
  const [data, setData] = useState([]);
  const [clima, setClima] = useState(null);

  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [pressure, setPressure] = useState(null);

  //   const weatherImagen = {
  //     "01d.png": "Clear.png",
  //     "01n.png": "Clear.png",
  //     "02d.png": "LightCloud.png",
  //     "02n.png": "LightCloud.png",
  //     "03d.png": "HeavyCloud.png",
  //     "03n.png": "HeavyCloud.png",
  //     "04d.png": "Shower.png",
  //     "04n.png": "Shower.png",
  //     "09d.png": "LightRain.png",
  //     "09n.png": "LightRain.png",
  //     "10d.png": "HeavyRain.png",
  //     "10n.png": "HeavyRain.png",
  //     "11d.png": "Thunderstorm.png",
  //     "11n.png": "Thunderstorm.png",
  //     "13d.png": "Snow.png",
  //     "13n.png": "Snow.png",
  //     "50d.png": "Sleet.png",
  //     "50n.png": "Sleet.png",
  //   };

  useEffect(() => {
    const getDias = async () => {
      const responseDias = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8137c153500b2d740317c06f0ff49260&units=metric`
      );
      const dias = await responseDias.json();

    //   console.log(dias);
      setClima(dias);
    };

    getDias();
  }, [clima]);

  useEffect(() => {
    if (clima) {
      const primerosDias = clima.list.slice(0, 5);
      setData(primerosDias);
    }
  }, [clima]);

  //   data.map((item) => {
  //     console.log(item?.weather[0].icon);
  //   });

  useEffect(() => {
    const getWeatherData = async () => {
      const responseWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8137c153500b2d740317c06f0ff49260&units=metric`
      );
      const weatherData = await responseWeather.json();

      console.log(weatherData);
      console.log("Wind Speed:", weatherData.wind.speed);
      console.log("Humidity:", weatherData.main.humidity);
      console.log("Visibility:", weatherData.visibility);
      console.log("Pressure:", weatherData.main.pressure);

      setWindSpeed(weatherData.wind.speed);
      setHumidity(weatherData.main.humidity);
      setVisibility(weatherData.visibility);
      setPressure(weatherData.main.pressure);
    };

    getWeatherData();
  }, [city]);

  return (
    <div className="secondContainer">
      <div className="secondHeader">
        <button className="celsiusBoton">°C</button>
        <button className="farBoton">°F</button>
      </div>
      <section className="sectionDays">
        <ul className="">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <li className="diasClima" key={item.dt}>
                <h3 className="dateClima">{item.dt_txt}
                </h3>
                <span className="spanClima">
                  <img
                    src={`src/assets/${item?.weather[0].icon}.png`}
                    //src={`assets/${weatherImagen[item?.weather[0].icon]}`}
                    alt={`Clima: ${item.weather[0].main}`}
                  />
                </span>
                <div className="diasTemps">
                  <p>{item.main.temp_min}°C</p>
                  <p>{item.main.temp_max}°C</p>
                </div>
              </li>
            ))
          ) : (
            <p>No data</p>
          )}
        </ul>
      </section>

      <div className="containerToday">
        <h2 className="titleToday">Today's hightlights</h2>
        <div className="thirdContainer">
          <div className="windStatus">
            <h2 className="windTitle">Wind Status</h2>
            <div className="msStatus">
              <h3 className="dataNumbers">{windSpeed}</h3>
              <h4 className="valuesOperators">ms</h4>
            </div>
            <div className="navigationContainer">
              <span className="navigationSpan">
                <img className="navigationIcon" src={navigationIcon} alt="" />
              </span>
              ENE
            </div>
          </div>
          <div className="humidityContainer">
            <h2 className="humidityTitle">Humidity</h2>
            <div className="percentageContainer">
              <h3 className="humidityNumbers">{humidity}</h3>
              <h4 className="valuesOperators">%</h4>
            </div>
            <div className="percentage">
              <p>0</p>
              <p>50</p>
              <p>100</p>
            </div>
            <div className="barritaPercentage">
              <div className="innerPercentage"></div>
            </div>
            <div className="percentageSigno">%</div>
          </div>

          <div className="visibilityContainer">
            <h2 className="visibilityTitle">Visibility</h2>
            <div className="visibilitySpeed">
              <h3 className="visiNumbers">{visibility}</h3>
              <h4 className="kmNumbers">km</h4>
            </div>
          </div>

          <div className="pressureContainer">
            <h2 className="pressureTitle">Air Pressure</h2>
            <div className="pressureValues">
              <h3 className="pressureNumbers">{pressure}</h3>
              <h4 className="pressureMb">mb</h4>
            </div>
          </div>
        </div>

        <footer className="footerContainer">
          <h4 className="footerText">Creado por Rodrigo Mollocondo</h4>
        </footer>
      </div>
    </div>
  );
}

export default DiasCLima;
