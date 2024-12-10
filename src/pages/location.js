import { useState } from "react";
import { Box, Button, Text, VStack, Spinner, Heading } from "@chakra-ui/react";

export default function LocationPage() {
  const [location, setLocation] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationByIp = async () => {
    try {
      const response = await fetch(`https://ipinfo.io/json?token=YOUR_TOKEN`);
      const data = await response.json();
      const [latitude, longitude] = data.loc.split(",");
      return {
        latitude,
        longitude,
        city: data.city,
        region: data.region,
        country: data.country,
      };
    } catch (err) {
      console.error("Error fetching IP location:", err);
      throw new Error("Unable to fetch location from IP.");
    }
  };

  const handleGetLocation = async () => {
    setLoading(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        async (err) => {
          console.warn(
            "Geolocation permission denied, falling back to IP.",
            err
          );
          try {
            const ipLocation = await fetchLocationByIp();
            setLocation(ipLocation);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        }
      );
    } else {
      try {
        const ipLocation = await fetchLocationByIp();
        setLocation(ipLocation);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveToFavorites = () => {
    if (!location) {
      alert("No location to save!");
      return;
    }

    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      favorites.push(location);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavorites(favorites); // Actualizează starea locală
      alert("Location saved to favorites!");
    } catch (error) {
      console.error("Error saving to favorites:", error);
      alert("Failed to save location.");
    }
  };

  return (
    <Box p="20px" textAlign="center">
      <Heading mb="6">Detect Your Location</Heading>
      <Button colorScheme="teal" onClick={handleGetLocation} mb={4}>
        Detect Location
      </Button>
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      {location && (
        <VStack align="center" spacing={4}>
          <Text>
            <strong>Latitude:</strong> {location.latitude}
          </Text>
          <Text>
            <strong>Longitude:</strong> {location.longitude}
          </Text>
          {location.city && (
            <Text>
              <strong>City:</strong> {location.city}
            </Text>
          )}
          {location.region && (
            <Text>
              <strong>Region:</strong> {location.region}
            </Text>
          )}
          {location.country && (
            <Text>
              <strong>Country:</strong> {location.country}
            </Text>
          )}
          <Button colorScheme="purple" mt={4} onClick={handleSaveToFavorites}>
            Save to Favorites
          </Button>
        </VStack>
      )}
      {favorites.length > 0 && (
        <Box mt={10}>
          <Heading size="md" mb={4}>
            Your Favorite Locations
          </Heading>
          <VStack spacing={4}>
            {favorites.map((fav, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg="gray.50"
              >
                <Text>
                  <strong>City:</strong> {fav.city || "N/A"}
                </Text>
                <Text>
                  <strong>Latitude:</strong> {fav.latitude}
                </Text>
                <Text>
                  <strong>Longitude:</strong> {fav.longitude}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
}
