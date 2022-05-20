import Form from '../Form/Form'
import { CityContext } from '../Context/CityContext';
import { useContext, useState, useEffect } from 'react';
import { IWeatherProps } from '../Constant/Constant'
import './Header.css'


export default function Header({ getIconWeather } : IWeatherProps) {
  const [ isCelsius, setIsCelsius ] = useState(true);
  const { cityData, getDateToDisplay } = useContext(CityContext);
  let dateAndHour = cityData?.cityTime;

  const dateHourHtmlElement = document.querySelector("#date-hour");

  const toggleIsCelsius = () => {
    setIsCelsius(prev => !prev);
  }

  const displayTemp = () : string => {
    let temp : string;
    if (cityData?.cityTempMetric && isCelsius) {
      temp = cityData?.cityTempMetric;
    } else if (cityData?.cityTempImperial && !isCelsius) {
      temp = cityData?.cityTempImperial;
    } else return "";

    if (parseFloat(temp) % 1 === 0) {
      temp = `${parseInt(temp)}.0°`;
    }

    return temp;
}

  useEffect(() => {
    const interval = setInterval(() => {
      let newDate : Date;
      if (typeof dateAndHour === "string") {
        newDate = new Date(dateAndHour);
      } else {
        return;
      }
      
      newDate.setSeconds(newDate.getSeconds() + 1);

      let newDateDisplay : string | undefined;
      if (getDateToDisplay !== undefined) {
        newDateDisplay = getDateToDisplay(String(newDate), false);
      }
  
      if (dateHourHtmlElement instanceof HTMLElement && typeof newDateDisplay === "string") {
        dateHourHtmlElement.textContent = newDateDisplay;
      }
  
      dateAndHour = String(newDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div id="city-data">
        <span id="temperature-display" onClick={toggleIsCelsius}>{displayTemp()}</span>
        <div id="city-infos">
          <h1>{getIconWeather(cityData?.cityWeather)} { cityData?.cityName }</h1>
          <h3>{ cityData?.countryName }</h3>
          <h4 id="date-hour">{ getDateToDisplay ? getDateToDisplay() : "" }</h4>
        </div>
      </div>
      <Form/>
    </header>
  )
}
