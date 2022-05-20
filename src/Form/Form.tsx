import React, { useRef, useContext } from 'react'
import { CityContext } from '../Context/CityContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './Form.css'

export default function Form() {
  const cityInputRef = useRef<HTMLInputElement | null>(null);

  const { fetchCityData } = useContext(CityContext);

  const sendCityTofetch = (e : React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (cityInputRef.current instanceof HTMLInputElement) {
      fetchCityData(cityInputRef.current.value); 
    }
  }

  return (
    <form onSubmit={(e) => sendCityTofetch(e)}>
        <FontAwesomeIcon onClick={(e) => sendCityTofetch(e)} icon={faMagnifyingGlass} />
        <input ref={cityInputRef} type="text" name="search-city" id="search-city" placeholder="Type the city"/>
    </form>
  )
}
