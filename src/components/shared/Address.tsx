import {GrLocation} from "react-icons/gr";
import {Flex, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {setupGeocode} from "@/helpers/geocode-setup";
import {fromLatLng} from "react-geocode";

const Address = (props: any) => {

  const [address, setAddress] = useState();

  useEffect(() => {
    setupGeocode();
    fromLatLng(props.lat, props.long)
      .then(({ results }) => {
        const address = results[0].formatted_address;
        setAddress(address);
      })
      .catch(console.error);
  }, []);



  return (
    <Flex mt="16px" gap="8px" align="center">
      <GrLocation size="32px" />
      <Text>{address}</Text>
    </Flex>
  )
}

export default Address;
