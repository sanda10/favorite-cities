import { Box, Heading, Text, Container } from "@chakra-ui/react";
import MenuBar from "@/components/menuBar";

export default function CityPage() {
  return (
    <>
      <MenuBar />
      <Container p="20px" centerContent="true">
        <Heading size="3xl">City Page</Heading>
        <Text mt="3.5" bg="purple.500" color="white" p="10px 20px">
          This is the city page
        </Text>
      </Container>
    </>
  );
}
