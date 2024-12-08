import { useState } from "react";
import {
  Container,
  Input,
  List,
  Heading,
  Text,
  Box,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const query = e.target.value.trim();
    setSearchTerm(query);

    if (!query) {
      setResults([]);
      return;
    }

    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      p={4}
      maxW="container.md"
      bg="orange.50"
      borderRadius="lg"
      boxShadow="xl"
      centerContent
    >
      <Box
        textAlign="center"
        p={6}
        borderRadius="md"
        bg="yellow.100"
        boxShadow="lg"
        mb={6}
      >
        <Heading size="xl" color="orange.600" mb={4}>
          Search Cities
        </Heading>
        <Stack gap="4">
          <Input
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={handleSearch}
            mb={4}
            p={4}
            size="lg"
            bg="white"
            borderColor="orange.300"
            _hover={{ borderColor: "orange.500" }}
          />
        </Stack>
      </Box>

      <Box width="100%" textAlign="left">
        {loading ? (
          <Spinner color="orange.500" />
        ) : results.length > 0 ? (
          <List.Root spacing={3}>
            {results.map((result) => (
              <List.Item
                key={result.id}
                border="1px"
                borderRadius="md"
                p={2}
                bg="white"
                boxShadow="sm"
              >
                <Link href={`/cities/${result.id}`} passHref>
                  <Text
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={{ color: "teal.500" }}
                  >
                    {result.name}, {result.country}
                  </Text>
                </Link>
              </List.Item>
            ))}
          </List.Root>
        ) : (
          searchTerm && <Text>No results found.</Text>
        )}
      </Box>
    </Container>
  );
}
