import getAllCatalogs from "@/helpers/getAllCatalogs";
import FormState from "@/interfaces/job-posts/form-state.interface";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";

interface FormOptions {
  positions?: [{ id: number; position_name: string }];
  skills?: [{ id: number; skill_name: string }];
  education?: [{ id: number; education_level: string }];
  contract_types?: [{ id: number; contract_type: string }];
  work_types?: [{ id: number; work_type: string }];
}

export default function JobPost({
  position_id,
  education_level_id,
  seniority_level,
  skill_ids,
  work_type_id,
  contract_type_id,
  work_location,
  salary_min,
  salary_max,
  description,
}: FormState) {
  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  useEffect(() => {
    if (work_location && work_location.latitude && work_location.longitude) {
      const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${work_location.latitude},${work_location.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;

      fetch(geocodeApiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results[0]) {
            setAddress(data.results[0].formatted_address);
          }
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    }
  }, [work_location]);

  const getNameById = (id: number | number[], category: keyof FormOptions): string => {
    let categoryOptions = formOptions[category] || [];
    let foundOption = categoryOptions.find((option) => option.id === id);
    let dynamicProperty;
    if (category == "positions" || category == "skills") {
      dynamicProperty = `${category.slice(0, -1)}_name` as keyof typeof foundOption;
    } else if (category == "education") {
      dynamicProperty = `${category}_level` as keyof typeof foundOption;
    } else {
      dynamicProperty = `${category.slice(0, -1)}` as keyof typeof foundOption;
    }
    return foundOption ? (foundOption[dynamicProperty] as string) || "" : "";
  };

  return (
    <Flex direction="column" h="100%">
      <Card w="sm" h="100%" display="flex" flexDirection="column">
        <CardBody flex="1" display="flex" flexDirection="column"> {/* This will make the card body flex and take available space */}
          <Heading>{position_id && getNameById(position_id, "positions")}</Heading>
          <Text fontSize="sm" color="gray.500" mt="2px" mb="8px">
            Address: {address}
          </Text>
          <Text mb="8px">{description}</Text>
          <p>
            {skill_ids &&
              skill_ids.map((skillId, index) => (
                <Text
                  key={index}
                  display="inline-block"
                  px="2"
                  py="1"
                  mr="2"
                  mb="2"
                  borderRadius="md"
                  backgroundColor="blue.500"
                  color="white"
                >
                  {getNameById(skillId, "skills")}
                </Text>
              ))}
          </p>
          <Flex mt="8px" align="center" gap="8px">
            <FaGraduationCap size="24px" />
            <Text>{education_level_id && getNameById(education_level_id, "education")}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <LiaCertificateSolid size="24px" />
            <Text>Seniority level - {seniority_level}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <FaLocationDot size="24px" />
            <Text>{work_type_id && getNameById(work_type_id, "work_types")}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <IoBriefcaseSharp size="24px" />
            <Text>{contract_type_id && getNameById(contract_type_id, "contract_types")}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <FaMoneyBillWave size="24px" />
            <Text>
              {salary_min !== undefined && salary_max !== undefined
                ? `$${salary_min} - $${salary_max}`
                : salary_min !== undefined
                  ? `From $${salary_min}`
                  : salary_max !== undefined
                    ? `Up to $${salary_max}`
                    : "Salary not specified"}
            </Text>
          </Flex>
        </CardBody>
        <Divider color="#2E77AE" />
        <CardFooter alignSelf="flex-end">
          <ButtonGroup spacing="2">
            <Button variant="ghost" colorScheme="blue">
              Archive
            </Button>
            <Button variant="solid" colorScheme="blue">
              Update
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
}
