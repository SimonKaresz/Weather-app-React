import Sunny from "./dist/image/sunny.svg";
import Clouds from "./dist/image/clouds.svg";
import Rainy from "./dist/image/cloud_rainy.svg";
import Storm from "./dist/image/thunderstorm.svg";
import Foggy from "./dist/image/foggy.svg";
import Snow from "./dist/image/Snow.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Data } from "./interface";

function App() {
  const [weatherData, setWeatherData] = useState<
    Data | null | any | undefined
  >();
  const [city, setCity] = useState("Budapest");

  const API_KEY = "6577424427ed5da2a5a55e9b1de3208e";
  const lang = ["en", "hu", "fr", "de", "it", "pl", "pt", "sp"];
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&=${lang}`;

  const getWeather = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
        setCity("");
      });
  };

  const IconSelect = () => {
    return weatherData.weather[0].main === "Clear"
      ? Sunny
      : weatherData.weather[0].main === "Clouds"
      ? Clouds
      : weatherData.weather[0].main === "Rain"
      ? Rainy
      : weatherData.weather[0].main === "Thunderstorm"
      ? Storm
      : weatherData.weather[0].main === "Snow"
      ? Snow
      : weatherData.weather[0].main === "Fog" || "Mist"
      ? Foggy
      : "";
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col justify-center backdrop-blur-[5px] items-center w-screen h-screen bg-white/30 overflow-x-hidden">
        {weatherData?.name !== undefined ? (
          <div className="flex h-screen justify-around flex-col items-center">
            <img
              src={IconSelect()}
              alt={IconSelect()}
              className="min-w-[180px] opacity-90 drop-shadow-2xl"
            />
            <h2 className="text-white uppercase">
              {weatherData.weather[0].description}
            </h2>
            <h1 className="text-white text-2xl font-semibold">
              {weatherData?.name}, {weatherData.sys.country}
            </h1>
            <h1 className="text-5xl font-bold text-white">
              {Math.round(Number(weatherData?.main.temp))}°C
            </h1>
            <div className="flex flex-col items-center justify-center w-full">
              {
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  value={city}
                  type="text"
                  placeholder="City name..."
                  className="border-b-2 py-2 bg-transparent w-[80%] text-white text-center placeholder:text-white focus:outline-none"
                />
              }
              <button
                onClick={getWeather}
                className="mt-2 text-white hover:underline active:underline"
              >
                Search
              </button>
            </div>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-2 gap-16 text-white">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold">Min</h2>
                  <p>{Math.round(Number(weatherData?.main.temp_min))}°C</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold">Max</h2>
                  <p>{Math.round(Number(weatherData?.main.temp_max))}°C</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold">Wind speed</h2>
                  <p>{Math.round(Number(weatherData?.wind.speed))} km/h</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold">Humidity</h2>
                  <p>{Math.round(Number(weatherData?.main.humidity))}%</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-screen h-screen justify-evenly items-center">
            <h1 className="font-semibold text-4xl text-white text-center">
              Enter the citys name!
            </h1>
            <div className="flex flex-col items-center justify-center w-full">
              {
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  value={city}
                  type="text"
                  placeholder="City name..."
                  className="border-b-2 py-2 bg-transparent w-[80%] text-white text-center placeholder:text-white focus:outline-none"
                />
              }
              <button
                onClick={getWeather}
                className="mt-2 text-white hover:underline active:underline"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
