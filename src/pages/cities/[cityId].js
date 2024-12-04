import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Heading,
  Text,
  Spinner,
  Box,
  Button,
} from "@chakra-ui/react";

function WeatherDetails({ weather }) {
  return (
    <Box mt={8} p={4} borderRadius="md" bg="yellow.100" boxShadow="lg">
      <Heading size="md" mb={4} color="orange.600">
        Weather Information
      </Heading>
      <Text fontSize="lg" color="gray.700">
        <strong>Temperature:</strong> {weather.temperature}°C
      </Text>
      <Text fontSize="lg" color="gray.700">
        <strong>Wind Speed:</strong> {weather.windSpeed} km/h
      </Text>
      <Text fontSize="lg" color="gray.700">
        <strong>Humidity:</strong> {weather.humidity}%
      </Text>
    </Box>
  );
}

export default function CityPage() {
  const router = useRouter();
  const { cityId } = router.query;
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      console.log("Router not ready");
      return;
    }

    if (!cityId) {
      console.log("Id undefined", cityId);
      return;
    }

    const fetchCityData = async () => {
      const apiUrl = `https://geocoding-api.open-meteo.com/v1/get?id=${cityId}&language=en&format=json`;
      console.log("Fetching data from API:", apiUrl);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("City data fetched:", data);

        if (data.id) {
          const cityData = data;
          setCity(cityData);

          const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${cityData.latitude}&longitude=${cityData.longitude}&current_weather=true`;
          console.log("Fetching weather data from API:", weatherApiUrl);
          const weatherResponse = await fetch(weatherApiUrl);
          const weatherData = await weatherResponse.json();

          if (weatherData.current_weather) {
            setWeather({
              temperature: weatherData.current_weather.temperature,
              windSpeed: weatherData.current_weather.windspeed,
              humidity: weatherData.current_weather.humidity || "N/A",
            });
          } else {
            console.error("No weather data found for city:", cityData.name);
          }
        } else {
          console.log("No city data found for ID: ", cityId);
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCityData();
  }, [router.isReady, cityId]);

  useEffect(() => {
    const checkFavorite = async () => {
      const response = await fetch("/api/favorites");
      const favorites = await response.json();
      console.log("Favorites from console.log", favorites);

      if (Array.isArray(favorites)) {
        const isFav = favorites.some(
          (fav) => fav.cityName === city.name && fav.country === city.country
        );
        setIsFavorite(isFav);
      } else {
        console.error("Favorites is not an array", favorites);
        setIsFavorite(false);
      }
    };

    if (city) checkFavorite();
  }, [city]);

  const toggleFavorite = async () => {
    if (!city) return;

    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityName: city.name, country: city.country }),
    });

    const data = await response.json();
    setIsFavorite(data.message === "Favorite added");
  };

  if (!city) {
    return (
      <Container
        p={4}
        centerContent
        bg="teal.50"
        minH="100vh"
        justifyContent="center"
      >
        <Spinner size="xl" color="teal.400" />
        <Text mt={4} fontSize="lg" color="gray.600">
          Loading city data...
        </Text>
      </Container>
    );
  }

  return (
    <Container
      p={4}
      borderRadius="lg"
      bg="blue.50"
      boxShadow="xl"
      maxW="container.md"
      mt={8}
    >
      <Heading mb={4} color="blue.700" fontWeight="bold">
        {city.name}, {city.country}
      </Heading>
      <Text fontSize="lg" color="gray.700">
        Latitude: {city.latitude}
      </Text>
      <Text fontSize="lg" color="gray.700">
        Longitude: {city.longitude}
      </Text>
      <Text fontSize="lg" color="gray.700">
        Timezone: {city.timezone}
      </Text>
      {weather ? (
        <WeatherDetails weather={weather} />
      ) : (
        <Text mt={4} fontSize="lg" color="gray.600">
          Loading weather data...
        </Text>
      )}
      <Button
        onClick={toggleFavorite}
        colorScheme={isFavorite ? "red" : "blue"}
        mt={6}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </Container>
  );
}
