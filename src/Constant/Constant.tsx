export interface IWeatherProps {
    getIconWeather: ((weatherText : string | undefined) => JSX.Element | string | undefined );
}

export interface IDayMeteoBlocProps {
    index: number;
    weather: string;
    temperature: any;
    getIconWeather: ((weatherText : string | undefined) => JSX.Element | string | undefined );
}