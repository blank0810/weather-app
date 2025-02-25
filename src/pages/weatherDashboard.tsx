import WeatherSkeleton from "@/components/loading-skeleton";
import { Button,  } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useGeolocation } from "@/hooks/use-geolocation";
import { RefreshCcw, AlertTriangle, MapPin } from "lucide-react";
import { useReverseGeocodeQuery, useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import  CurrentWeather  from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import FavoriteCities from "@/components/favorite-cities";

const WeatherDashboard = () => {
  const {coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const weatherQuery = useWeatherQuery(coordinates)

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      // reload weather data
      locationQuery.refetch()
      forecastQuery.refetch()
      weatherQuery.refetch()
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>        
        </AlertDescription>
      </Alert>
    )
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access for your local weather information.</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>        
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error)
  {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Fail to fetch data, try again</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>        
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data)
  {
    return <WeatherSkeleton />
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities Card */}
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"}
        onClick={handleRefresh}
        disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Current Weather Component */}
          <CurrentWeather 
          data={weatherQuery.data}
          locationName={locationName}
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
  );
};

export default WeatherDashboard;
