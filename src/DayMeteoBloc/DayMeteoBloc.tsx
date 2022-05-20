import './DayMeteoBloc.css'
import { IDayMeteoBlocProps } from '../Constant/Constant'
import { useContext } from 'react'
import { CityContext } from '../Context/CityContext'

export default function DayMeteoBloc({index, weather, temperature, getIconWeather} : IDayMeteoBlocProps) {
  const { cityData } = useContext(CityContext);

  const displayDay = (): string => {
    if (cityData === undefined || cityData.cityTime === undefined) return "";
    let day = new Date(cityData.cityTime);
    day.setDate(day.getDate() + index);

    const dayNumb = day.getDate() < 10 ? `0${day.getDate()}` : `${day.getDate()}`;
    const monthNumb = day.getMonth() < 10 ? `0${day.getMonth()}` : `${day.getMonth()}`;

    return `${dayNumb}/${monthNumb}/${day.getFullYear()}`;
  }

  return (
    <article className="day-meteo-bloc">
      <h2 className='date-day'>{displayDay()}</h2>
      <h3 className='weather-day'>{getIconWeather(weather)}</h3>
      <h2 className='temp-day'>{temperature.Minimum.Value}° | {temperature.Maximum.Value}°</h2>
    </article>
  )
}
