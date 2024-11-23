import { Container, Heading, Text, Box } from "@chakra-ui/react";
import MenuBar from "@/components/menuBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function City() {
  const router = useRouter();
  const cityId = router.query.cityId;

  const [listItems, setListItems] = useState([]);
  const [extraItems, setExtraItems] = useState([]);
  const [oneItem, setOneItem] = useState(null);

  const listStyle = {
    listStyleType: "circle",
    borderWidth: "1px",
    listStylePosition: "inside",
    padding: "10px",
    width: "524px",
    margin: "35px auto",
    backgroundColor: "purple.300",
    borderRadius: "md",
  };

  useEffect(() => {
    if (!cityId) return;

    const localValue = localStorage.getItem("cities");
    if (!localValue) return;

    const savedItems = JSON.parse(localValue);

    savedItems.forEach((item) => {
      if (item.city === cityId) {
        // Fetch weather data
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=auto&forecast_days=1`
        )
          .then((response) => response.json())
          .then((data) => {
            setExtraItems((prevItems) => [...prevItems, data]);
            setOneItem(data);
          });

        // Save the matched city
        setListItems((prevItems) => [...prevItems, item]);
      }
    });
  }, [cityId]);

  return (
    <>
      <MenuBar />
      <Container p="20px" centerContent>
        <Heading size="3xl">{cityId}</Heading>

        {listItems.length > 0 &&
          listItems.map((item) => (
            <Box as="ul" css={listStyle} key={item.city}>
              <li>City: {item.city}</li>
              <li>Country: {item.country}</li>
              <li>Latitude: {item.latitude}</li>
              <li>Longitude: {item.longitude}</li>
              <li>Population: {item.population}</li>
            </Box>
          ))}

        {oneItem && (
          <Box as="ul" css={listStyle}>
            <li>
              Max Temperature: {oneItem.daily.temperature_2m_max[0]}{" "}
              {oneItem.daily_units.temperature_2m_max}
            </li>
            <li>
              Min Temperature: {oneItem.daily.temperature_2m_min[0]}{" "}
              {oneItem.daily_units.temperature_2m_min}
            </li>
            <li>Date: {oneItem.daily.time[0]}</li>
          </Box>
        )}

        {extraItems.length > 0 &&
          extraItems.map((extraItem, index) => (
            <Box as="ul" css={listStyle} key={`extra-${index}`}>
              <li>
                Max Temperature: {extraItem.daily.temperature_2m_max[0]}{" "}
                {extraItem.daily_units.temperature_2m_max}
              </li>
              <li>
                Min Temperature: {extraItem.daily.temperature_2m_min[0]}{" "}
                {extraItem.daily_units.temperature_2m_min}
              </li>
              <li>Date: {extraItem.daily.time[0]}</li>
            </Box>
          ))}
      </Container>
    </>
  );
}
