import { useReducer, createContext } from "react";
import Axios from "axios";

export interface ICityState {
    cityName? : string;
    countryName? : string;
    stateName? : string;
    cityTime? : string;
    cityWeather? : string;
    cityIsDayTime? : boolean;
    cityTempMetric? : string;
    cityTempImperial? : string;
}

export interface ICityContext {
    cityData? : ICityState;
    fetchCityData : ((city : string) => Promise<any>) | (() => void);
}

const reducer = (state : ICityState, newState : ICityState) : ICityState => {
    return newState;
}

export const CityContext = createContext<ICityContext>({ fetchCityData : () => null});



export const CityContextProvider = ({ children }: {children : any}) => {
    const [ cityData, dispatch ] = useReducer(reducer, {});

    const fetchCityData = async(nameCity : string) : Promise<any> => {
        // const apiKey = process.env.REACT_APP_API_KEY;

        // const resFetchCity = await Axios(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${nameCity}`);
        // const dataCity = resFetchCity.data[0];
        // const cityKey = dataCity.Key;

        // const resFetchWeather = await Axios(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`);
        // const dataWeather = resFetchWeather.data[0];

        // const cityName = dataCity.EnglishName;
        // const countryName = dataCity.Country.EnglishName;
        // const stateName = dataCity.AdministrativeArea.EnglishName;
        // const cityTime = dataWeather.LocalObservationDateTime;
        // const cityWeather = dataWeather.WeatherText;
        // const cityIsDayTime = dataWeather.IsDayTime;
        // const cityTempMetric = `${dataWeather.Temperature.Metric.Value}°C`;
        // const cityTempImperial = `${dataWeather.Temperature.Imperial.Value}°F`;

        // const cityWeatherState = {
        //     cityName,
        //     continentName,
        //     countryName,
        //     stateName,
        //     cityTime,
        //     cityWeather,
        //     cityIsDayTime,
        //     cityTempMetric,
        //     cityTempImperial
        // };

        const cityWeatherState = {
            cityIsDayTime: true,
            cityName: "Paris",
            cityTempImperial: "73°",
            cityTempMetric: "23°",
            cityTime: "2022-05-19T21:02:00+02:00",
            cityWeather: "Mostly sunny",
            countryName: "France",
            stateName: "Ville de Paris"
        }

        dispatch(cityWeatherState);
    }

    return (
        <CityContext.Provider value={{ cityData, fetchCityData }}>
            {children}
        </CityContext.Provider>
    )
}