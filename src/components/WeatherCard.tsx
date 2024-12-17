import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import humidity from "../assets/icons/humidity.png";
import wind from "../assets/icons/wind.png";
import { WeatherData } from "@/types/weather";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { CloudOff, MapPin } from "lucide-react";
import WeatherCardSkeleton from "./WeatherCardSkeleton";

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const date = new Date();
  const getFormattedDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "long",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    return formattedDate.replace(String(day), `${day}${suffix}`);
  };

  const getOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="static z-10">
      <Card className="w-80 md:w-96 shadow-lg">
        <CardHeader className="pt-6 pb-3">
          <CardTitle className="flex items-center">
            <SearchBar
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              setIsSubmitting={setIsSubmitting}
            />
          </CardTitle>
        </CardHeader>
        {isSubmitting ? (
          <WeatherCardSkeleton />
        ) : !isSubmitting && weatherData ? (
          <>
            <CardDescription className="flex items-center justify-between mx-6">
              <p>
                {weatherData?.temp_min}° / {weatherData?.temp_max}°
              </p>
              <p>{weatherData?.description}</p>
            </CardDescription>
            <CardContent className="flex flex-col items-center gap-y-5">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`}
                alt={weatherData?.description}
                className="w-24"
              />
              <p className="text-3xl">{weatherData?.temp}°C</p>
              <p className="text-sm text-blue-500">{getFormattedDate()}</p>
              <div className="flex items-center gap-x-1">
                <p>{weatherData?.location}</p>
                <MapPin size={16} />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <img src={humidity} alt="humidity" className="w-6" />
                <div className="flex flex-col">
                  <p className="text-sm">{weatherData?.humidity}%</p>
                  <p className="text-sm">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <img src={wind} alt="wind" className="w-6" />
                <div className="flex flex-col">
                  <p className="text-sm">{weatherData?.wind_speed}km/h</p>
                  <p className="text-sm">Wind</p>
                </div>
              </div>
            </CardFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-6 h-64">
            <p className="md:text-xl text-red-500">
              Could not get weather data!
            </p>
            <CloudOff size={48} color="gray" />
          </div>
        )}
      </Card>
    </div>
  );
};

export default WeatherCard;
