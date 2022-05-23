import { IWeatherProps } from '../Constant/Constant'
import { useContext } from 'react'
import { CityContext } from '../Context/CityContext'
import DayMeteoBloc from '../DayMeteoBloc/DayMeteoBloc'

import './Results.css'

export default function Results({ getIconWeather } : IWeatherProps) {
  const { cityData } = useContext(CityContext);

  const displayForecast = (): any => {
    if (cityData?.fourNextDays !== undefined) {
      return cityData.fourNextDays.map((element : any, i) => { 
        if (i !== 0){
          return (
            <DayMeteoBloc 
            key={i}
            index={i}
            weather={element.Day.IconPhrase}
            temperature={element.Temperature}
            getIconWeather={getIconWeather}
            />
          )
        }
      });
    } else {
      return (<span style={{ textAlign: "center" }}>No more API calls for today !</span>);
    }
  }

  return (
    <main>
      <div id="details-meteo">
        {displayForecast()}
      </div>
    </main>
  )
}
