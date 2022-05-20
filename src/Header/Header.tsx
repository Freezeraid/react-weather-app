import Form from '../Form/Form'
import { CityContext } from '../Context/CityContext';
import { useContext, useState, useEffect } from 'react';
import './Header.css'


export default function Header() {
  const [ isCelsius, setIsCelsius ] = useState(true);
  const { cityData } = useContext(CityContext);
  let dateAndHour = cityData?.cityTime;

  const dateHourHtmlElement = document.querySelector("#date-hour");

  const getDateToDisplay = (dateToRender : string | void, firstRender : boolean = true) => {
    let time : Date;
    if (typeof cityData?.cityTime === "string" && firstRender) {
      time = new Date(cityData?.cityTime);
    } else if (typeof cityData?.cityTime === "string" && !firstRender && typeof dateToRender === "string") {
      time = new Date(dateToRender);
    } else {
      return;
    }

    const day = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
    const month = time.getMonth() < 10 ? `0${time.getMonth() + 1}` : `${time.getMonth() + 1}`;
    const hours = time.getDate() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
    const minutes = time.getMonth() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
    const seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : `${time.getSeconds()}`;

    return `${day}/${month}/${time.getFullYear()} - ${hours}:${minutes}:${seconds}`;
}

  const toggleIsCelsius = () => {
    setIsCelsius(prev => !prev);
  }

  const displayTemp = () => {
    if (isCelsius === true) {
      return cityData?.cityTempMetric;
    } else {
      return cityData?.cityTempImperial;
    }
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
  
      const newDateDisplay : string | undefined = getDateToDisplay(String(newDate), false);
  
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
          <h1>{ cityData?.cityName }</h1>
          <h3>{ cityData?.countryName }</h3>
          <h4 id="date-hour">{getDateToDisplay()}</h4>
        </div>
      </div>
      <Form/>
    </header>
  )
}
