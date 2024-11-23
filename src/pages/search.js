import { Button, Container, Heading, Input, Box } from "@chakra-ui/react";
import MenuBar from "@/components/menuBar";
import { useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";

const listStyle = {
  listStyleType: "circle",
  borderWidth: "1px",
  listStylePosition: "inside",
  p: "10px",
  w: "524px",
  m: "35px",
  bg: "purple.300",
  rounded: "md",
};

export default function Search({ data }) {
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=3&language=en&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.results)
        if (!data.results)
          return alert(
            "incorect city name. Please check spelling and try again."
          );
        setListItems(
          data.results.map((result) => ({
            city: result.name,
            country: result.country,
            latitude: result.latitude,
            longitude: result.longitude,
            population: result.population,
          }))
        );
      })

      .catch((error) => alert(error));

    setInputValue("");
  };

  useEffect(() => {
    if (listItems.length > 0) {
      localStorage.setItem("cities", JSON.stringify(listItems));
    }

    console.log(listItems);
  }, [listItems]);

  useEffect(() => {
    const localValue = localStorage.getItem("cities");
    if (localValue === null) return;
    const savedItems = JSON.parse(localValue);
    setListItems(savedItems);
  }, []);
  return (
    <>
      <MenuBar />
      <Container p="20px" centerContent="true">
        <Heading size="3xl" mb="7">
          Search page
        </Heading>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>City name</label>
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="City name"
            w="350px"
            ml="3"
            _hover={{ borderColor: "purple.500", borderWidth: "3px" }}
          />

          <Button
            ml="3"
            p="10px 20px"
            _hover={{ bg: "purple.500" }}
            type="submit"
          >
            Submit
          </Button>
        </form>

        {listItems.map((item) => {
          return (
            <Box
              as="ul"
              css={listStyle}
              key={item.city + item.latitude + item.longitude}
            >
              <li>City: {item.city}</li>
              <li>Country: {item.country}</li>
              <li>Latitude: {item.latitude}</li>
              <li>Longitude: {item.longitude}</li>
              <li>Population: {item.population}</li>
              <li>
                <Link variant="underline" href={`./cities/${item.city}`}>
                  Link
                </Link>
              </li>
            </Box>
          );
        })}
      </Container>
    </>
  );
}
