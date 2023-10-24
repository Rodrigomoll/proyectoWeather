import { useEffect, useState } from "react";
import location from './assets/location.svg'
import iconLocation from './assets/iconLocation.svg'
import iconClose from './assets/close.svg'
import DiasCLima from "./components/DiasCLima";
import buscarIcono from "./assets/search.svg"

import "./App.css";


function App() {
  const [data, setData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const [isSectionVisible, setSectionVisible] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [city, setCity] = useState("Lima");
  const [countryCode, setCountryCode] = useState("PE");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=8137c153500b2d740317c06f0ff49260&units=metric`
      );
      const datos = await response.json();

      console.log(datos);
      setData(datos);

      const mainWeather = datos.weather[0].main;
      const temperature = datos.main.temp;
      const icon = datos.weather[0].icon;


      setCurrentWeather({ mainWeather, temperature, icon });
      console.log(icon)
    };

    getData();
  }, [city, countryCode]);

  const getFechaActual = () => {
    const date = new Date();
    const options = {day: 'numeric', month: 'long'};
    const day = date.toLocaleDateString('en-US', options);
    return `Today . ${day}` 
  }

  const handleSearchClick = () => {
    setSectionVisible(true);
  }

  const handleCloseSection = () => {
    setSectionVisible(false);
  };

  const handleSearchLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleSearchCity = () => {
    setCity(searchLocation);
  };

  return (
    <>
      <div className ="contenedorMain">
        <div className="contenedorPapa">
          <section className="climaContenedor">
            <header className="climaHeader">
              <input className="climaBoton" type="button" value="buscar" onClick={handleSearchClick}/>
              <div className="climaIcono">
                <img src={location} alt="imagenLocation" />
              </div>
            </header>
            <div className="contenedor">
              <div className="imagenContenedor">
                <div className="contenedorIcon">
                  <img className="weatherPicture" src={`/assets/${currentWeather?.icon}.png`} alt="imagen1" id=""/>
                </div>
              </div>
              <div className="gradosContendor">
                <h2 className="numeroGrados">{currentWeather?.temperature}</h2>
                <h3 className="grados">°c</h3>
              </div>
              <h2 className="clima">{currentWeather?.mainWeather}</h2>
              <p className="climaDescription">{getFechaActual()}</p>
              <pre className="">
                Arequipa
                <img className="iconoFlecha "src={iconLocation} alt="" />
              </pre>
            </div>
          </section>
          {isSectionVisible  && (
            <section className="w-screen h-screen max-h-screen bg-[#1E213A] absolute top-0 left-0 md:w-[30vw] md:min-w-[380px]">
            <nav className="w-full h-24 flex items-end justify-around">
              <span className="absolute right-10 top-6 cursor-pointer" onClick={handleCloseSection}>
                <img alt="close icon" src={iconClose} width="20" height="20" style={{ color: "transparent" }} />
              </span>
              <div className="flex items-center w-[55%] max-w-[268px] h-9 bg-transparent border border-[#E7E7EB] font-medium text-base text-[#616475]">
                <img alt="Search Icon" src={buscarIcono} width="20" height="20" className="mx-2" />
                <input
                  className="bg-transparent outline-none w-[233px] h-8 pr-1"
                  placeholder="search location"
                  type="text"
                  value={searchLocation}
                  onChange={handleSearchLocationChange}
                />
              </div>
              <button className="w-20 h-9 bg-[#3C47E9] px-1 font-semibold text-base text-[#E7E7EB] hover:text-[#def341]" onClick={handleSearchCity}>
                Search
              </button>
            </nav>
            <ul className="flex flex-col items-center w-full h-fit mt-80px pb-5"></ul>
          </section>
          
          )}
          <DiasCLima city={city}/>
        </div>
      </div>
    </>
  );
}

export default App;
