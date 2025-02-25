import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import WeatherSkeleton from "@/components/loading-skeleton";
import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import FavoriteButton from "@/components/favorite-button";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Fail to fetch data, try again</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div><FavoriteButton data={{...weatherQuery.data, name: params.cityName}} /></div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* Current Weather Component */}
          <CurrentWeather 
          data={weatherQuery.data}
          />
          {/* Hourly Temperature Component */}
          <HourlyTemperature 
            data={forecastQuery.data}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* Forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
	)
}

export default CityPage;