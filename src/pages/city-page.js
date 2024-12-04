import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

export default function CityPage() {
  const cities = [
    { name: "New York", description: "The city that never sleeps." },
    { name: "Paris", description: "The city of love and lights." },
    {
      name: "Tokyo",
      description: "A bustling metropolis with rich traditions.",
    },
  ];

  return (
    <Container p="20px" centerContent>
      <Heading size="3xl" mb="10px" color="teal.500">
        City Page
      </Heading>
      <Text mb="20px" fontSize="lg" color="gray.600">
        Discover amazing cities around the world.
      </Text>
      <VStack
        spacing={6}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
        w="100%"
        maxW="600px"
      >
        {cities.map((city, index) => (
          <Box
            key={index}
            bg="purple.100"
            p="15px"
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: "md", bg: "purple.200" }}
          >
            <Heading size="lg" mb="5px" color="purple.700">
              {city.name}
            </Heading>
            <Text fontSize="md" color="gray.700">
              {city.description}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}
