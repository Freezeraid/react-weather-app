import { useContext, useState, useEffect, useCallback } from 'react'
import { CityContext } from '../Context/CityContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons'
import { faCloudShowersWater } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'

import './Results.css'

export default function Results() {
  const { cityData, fetchCityData } = useContext(CityContext);

  const firstFetch = useCallback(() => {
    const cityName = "Paris";
    fetchCityData(cityName);
  }, []);

  useEffect(() => {
    firstFetch();
  }, [firstFetch]);

  return (
    <main>
      <div id="details-meteo">
        <ul>
          <li><FontAwesomeIcon icon={faSun} /> { cityData?.cityWeather }</li>
        </ul>
      </div>
    </main>
  )
}
