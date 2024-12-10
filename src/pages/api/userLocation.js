import { useEffect, useState } from "react";
import { Box, Button, Text, VStack, Spinner } from "@chakra-ui/react";

export default function UserLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationByIp = async () => {
    try {
      const response = await fetch(`https://ipinfo.io/json?token=YOUR_TOKEN`);
      const data = await response.json();
      const [latitude, longitude] = data.loc.split(",");
      setLocation({
        latitude,
        longitude,
        city: data.city,
        region: data.region,
      });
    } catch (err) {
      setError("Unable to fetch location from IP.");
      console.error(err);
    }
  };

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setError(
            "Permission denied for Geolocation. Using IP-based location."
          );
          fetchLocationByIp();
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      fetchLocationByIp();
      setLoading(false);
    }
  };

  return (
    <Box p="20px">
      <Button colorScheme="teal" onClick={handleGetLocation} mb={4}>
        Detect Location
      </Button>
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      {location && (
        <VStack align="start" spacing={2}>
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
        </VStack>
      )}
    </Box>
  );
}
