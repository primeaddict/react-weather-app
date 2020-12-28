import { useEffect, useState } from "react";

const api = {
  key: "2b835e96643cb2d0009dacc574a55b24",
  base_url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base_url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const dateBuilder = () => {
    let newdate = String(new window.Date());
    newdate = newdate.slice(3, 15);
    setDate(newdate);
  };

  useEffect(() => {
    dateBuilder();
  }, []);



  return (
    <div className="app warm">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ?
          (
            <>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{date}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(Number(weather.main.temp))}°c
            </div>
                <div style={{ display: "inline-flex", textAlign: "center" }}>
                  <div className="weather">{weather.weather[0].description}</div>
                  <div id="icon">
                    <img
                      height="68px"
                      src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                      alt="Weather icon"
                    />
                  </div>
                </div>
              </div>
            </>
          ) :
          (
            <>
              {
                (
                  typeof weather.cod !== "undefined" && weather.cod !== "200"
                    ?
                    (
                      <>Oops...{weather.message} :(</>
                    ) :
                    (
                      <>Enter location to know weather condition</>
                    )
                )
              }
            </>
          )
        }



      </main>
    </div >
  );
}

export default App;
