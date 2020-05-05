import React, { useState } from 'react';
import './App.css';

const api = {
  key: "1dc1ca0dedd701cb4f8f1dc54f9067ff",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
    }
  };

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quart-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const weatherTranslate = (clima) => {
    if(clima === "Clear") {
      return "Limpo"
    }
    if(clima === "Clouds") {
      return "Nublado"
    }
    if(clima === "Rain") {
      return "Chuvoso"
    }
    if(clima === "Sun") {
      return "Ensolarado"
    }
    if(clima === "Snow") {
      return "Nevando"
    }
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
      ? ((weather.main.temp) > 18)
        ? 'app warm'
        : 'app'
      : 'app'
    }
      >
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar"
          placeholder="Buscar..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {( typeof weather.main != "undefined") ? (
        <div className="info">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weatherTranslate(weather.weather[0].main)}</div>
          </div>
        </div>
        ) : (
          <div className="new-search">
            <h1>Procure por uma cidade existente para ver a temperatura atual!</h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
