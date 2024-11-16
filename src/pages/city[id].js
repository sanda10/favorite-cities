// pages/city/[id].js
import { Box, Heading, Text, Spinner, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Exemplu: Fetch datele orașului dintr-un API sau bază de date
  const response = await fetch(`https://api.example.com/cities/${id}`);
  const city = await response.json();

  if (!city) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
    },
  };
}

export default function CityPage({ city }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text>Încărcăm datele orașului...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        {city.name}
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        {city.description || "Descriere indisponibilă"}
      </Text>
      <VStack align="start" spacing={4}>
        <Text>
          <strong>Latitudine:</strong> {city.latitude}
        </Text>
        <Text>
          <strong>Longitudine:</strong> {city.longitude}
        </Text>
        <Text>
          <strong>Populație:</strong> {city.population || "N/A"}
        </Text>
      </VStack>
      <Link href="/search" passHref>
        <Button mt={6} colorScheme="teal">
          Înapoi la căutare
        </Button>
      </Link>
    </Box>
  );
}
