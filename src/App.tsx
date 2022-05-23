import './App.css';
import { useContext, useEffect, useCallback } from 'react';
import { CityContext } from './Context/CityContext';
import Header from './Header/Header';
import Results from './Results/Results';
import Footer from './Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons'
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'

function App() {
  const { cityData, fetchCityData } = useContext(CityContext);

  const setTheme = () : void => {
    const appElement : HTMLElement | null = document.querySelector(".App");
    if (cityData?.cityIsDayTime === true || cityData?.cityIsDayTime === undefined) {
      appElement?.classList.replace("Night", "Day")
    } else {
      appElement?.classList.replace("Day", "Night")
    }
  }

  const getIconWeather = (weatherText : string | undefined): JSX.Element | string | undefined => {
    if (typeof weatherText !== "string") {
      return "";
    } 

    let weatherIcon : JSX.Element | undefined;

    if (weatherText.toLowerCase().includes("snow")) {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    }
    if (weatherText.toLowerCase().includes("sun")) {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
      if (weatherText.toLowerCase().includes("cloud")) {
        weatherIcon = <FontAwesomeIcon icon={faCloudSun} />;
      }
    }
    if (weatherText.toLowerCase().includes("cloud")) {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
      if (weatherText.toLowerCase().includes("sun")) {
        weatherIcon = <FontAwesomeIcon icon={faCloudSun} />;
      }
    }
    if (weatherText.toLowerCase().includes("bolt") || weatherText.toLowerCase().includes("thund")) {
      weatherIcon = <FontAwesomeIcon icon={faCloudBolt} />;
    }
    if (weatherText.toLowerCase().includes("rain") || weatherText.toLowerCase().includes("shower")) {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    }

    return weatherIcon;
  }

  useEffect(() => {
    setTheme();
  }, [cityData]);

  const firstFetch = useCallback(() => {
    const cityName = "Paris";
    fetchCityData(cityName);
  }, []);

  useEffect(() => {
    firstFetch();
  }, [firstFetch]);

  return (
    <div className="App Day">
      <Header getIconWeather={getIconWeather} />
      <Results getIconWeather={getIconWeather}/>
      <Footer/>
    </div>
  );
}

export default App;
