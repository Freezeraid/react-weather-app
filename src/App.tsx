import React, {useState, useRef} from 'react';
import axios from 'axios';
import { setConstantValue } from 'typescript';
import './App.css';

function App() {

  const inputRef = useRef<HTMLInputElement>(null);

  const [country, setCountry] = useState<any>({});

  const fetchCountryData = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const countryName : string | undefined = inputRef?.current?.value;
    try {
      const cityData = await axios(`https://dataservice.accuweather.com/locations/v1/cities/search?q=${countryName}&apikey=${process.env.REACT_APP_API_KEY}&language=en-us`);
      const meteoData = await axios(`https://dataservice.accuweather.com/currentconditions/v1/${cityData.data[0].Key}/?&apikey=${process.env.REACT_APP_API_KEY}&language=en-us`);
      console.log(meteoData);
      setCountry({
        cityName: cityData.data[0].EnglishName,
        departmentName: cityData.data[0].AdministrativeArea.EnglishName,
        idDepartement: cityData.data[0].AdministrativeArea.ID,
        countryName: cityData.data[0].Country.EnglishName,
        weather: meteoData.data[0].WeatherText,
        temperature: meteoData.data[0].Temperature.Metric.Value,
        time: meteoData.data[0].LocalObservationDateTime,
      });
    } catch (err : unknown) {
      throw err;
    }
  }

  const renderData = () => {
    console.log(country);
    if (country?.cityName !== undefined) {
      return (
        <>
          <h1>{country?.cityName}</h1>
          <h1>{country?.departmentName}, {country?.idDepartement}, {country?.countryName}</h1>
          <h2>{country?.time}</h2>
          <h2>Meteo: {country?.weather}</h2>
          <h2>Temperature: {country?.temperature}°C</h2>
        </>
      )
    } else return null;
  }

  return (
    <div className="App">
      <form onSubmit={fetchCountryData}>
        <input ref={inputRef} type="text" name="countryInput" id="countryInput" required/>
        <input type="submit" value="Submit" />
      </form>
      {renderData()}
    </div>
  );
}

export default App;
