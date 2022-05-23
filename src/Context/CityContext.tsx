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
    fourNextDays? : Object[];
}

export interface ICityContext {
    cityData? : ICityState;
    fetchCityData : ((city : string) => Promise<any>) | (() => void);
    getDateToDisplay? : ((dateToRender : string | void, firstRender : boolean | void) => string);
}

const reducer = (state : ICityState, newState : ICityState) : ICityState => {
    return newState;
}

export const CityContext = createContext<ICityContext>({ fetchCityData : () => null});

export const CityContextProvider = ({ children }: {children : any}) => {
    const [ cityData, dispatch ] = useReducer(reducer, {});
    
    const getDateToDisplay = (dateToRender : string | void, firstRender : boolean | void = true): string => {
        let time : Date;
        if (typeof cityData?.cityTime === "string" && firstRender) {
          time = new Date(cityData?.cityTime);
        } else if (typeof cityData?.cityTime === "string" && !firstRender && typeof dateToRender === "string") {
          time = new Date(dateToRender);
        } else {
          return "";
        }
    
        const day = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
        const month = time.getMonth() < 10 ? `0${time.getMonth() + 1}` : `${time.getMonth() + 1}`;
        const hours = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
        const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
        const seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : `${time.getSeconds()}`;
    
        return `${day}/${month}/${time.getFullYear()} - ${hours}:${minutes}:${seconds}`;
    }

    const fetchCityData = async(nameCity : string) : Promise<any> => {
        const apiKey = process.env.REACT_APP_API_KEY;

        const resFetchCity = await Axios(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${nameCity}`);
        const dataCity = resFetchCity.data[0];
        const cityKey = dataCity.Key;

        const resFetchWeather = await Axios(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`);
        const dataWeather = resFetchWeather.data[0];

        const resFetchForecast = await Axios(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=true`);
        const dataForecast : [] = resFetchForecast.data.DailyForecasts;

        const cityName = dataCity.EnglishName;
        const countryName = dataCity.Country.EnglishName;
        const stateName = dataCity.AdministrativeArea.EnglishName;
        const cityTime = dataWeather.LocalObservationDateTime;
        const cityWeather = dataWeather.WeatherText;
        const cityIsDayTime = dataWeather.IsDayTime;
        const cityTempMetric = `${dataWeather.Temperature.Metric.Value}°`;
        const cityTempImperial = `${dataWeather.Temperature.Imperial.Value}°`;

        const cityWeatherState = {
            cityName,
            countryName,
            stateName,
            cityTime,
            cityWeather,
            cityIsDayTime,
            cityTempMetric,
            cityTempImperial,
            fourNextDays: dataForecast
        };

        // const cityWeatherState = {
        //     cityIsDayTime: false,
        //     cityName: "Paris",
        //     cityTempImperial: "73°",
        //     cityTempMetric: "23°",
        //     cityTime: "2022-05-19T21:02:00+02:00",
        //     cityWeather: "Mostly sunny",
        //     countryName: "France",
        //     stateName: "Ville de Paris",
        //     fourNextDays: [
        //         {
        //             weather: "sunny",
        //             Temperature : {
        //                 Minimum:{
        //                     Value: 24
        //                 },
        //                 Maximum:{
        //                     Value: 32
        //                 },
        //             }
        //         },
        //         {
        //             Day : {
        //                 IconPhrase :  "sun"
        //             },
        //             Temperature : {
        //                 Minimum:{
        //                     Value: 24.2
        //                 },
        //                 Maximum:{
        //                     Value: 32.6
        //                 },
        //             }
        //         },
        //         {
        //             Day : {
        //                 IconPhrase :  "snow"
        //             },
        //             Temperature : {
        //                 Minimum:{
        //                     Value: 16.8
        //                 },
        //                 Maximum:{
        //                     Value: 28.5
        //                 },
        //             }
        //         },
        //         {
        //             Day : {
        //                 IconPhrase : "cloud"
        //             },
        //             Temperature : {
        //                 Minimum:{
        //                     Value: 17
        //                 },
        //                 Maximum:{
        //                     Value: 19.6
        //                 },
        //             }
        //         }
        //         ,{
        //             Day : {
        //                 IconPhrase : "thunder"
        //             },
        //             Temperature : {
        //                 Minimum:{
        //                     Value: 18
        //                 },
        //                 Maximum:{
        //                     Value: 24.2
        //                 },
        //             }
        //         }
        //     ]
        // }

        dispatch(cityWeatherState);
    }

    return (
        <CityContext.Provider value={{ cityData, fetchCityData, getDateToDisplay }}>
            {children}
        </CityContext.Provider>
    )
}