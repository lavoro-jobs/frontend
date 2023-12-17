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
  id,
  position,
  description,
  education_level,
  skills,
  work_type,
  seniority_level,
  work_location,
  contract_type,
  salary_min,
  salary_max,
  end_date,
  assignees,
}: FormState) {
  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  return (
    <Flex direction="column" h="100%">
      <Card w="sm" h="100%" display="flex" flexDirection="column">
        <CardBody flex="1" display="flex" flexDirection="column">
          <Heading>{position?.position_name}</Heading>
          <Text fontSize="sm" color="gray.500" mt="2px" mb="8px">
            Address: {address}
          </Text>
          <Text mb="8px">{description}</Text>
          <p>
            {skills &&
              skills.map((skill) => (
                <Text
                  key={skill.id}
                  display="inline-block"
                  px="2"
                  py="1"
                  mr="2"
                  mb="2"
                  borderRadius="md"
                  backgroundColor="blue.500"
                  color="white"
                >
                  {skill.skill_name}
                </Text>
              ))}
          </p>
          <Flex mt="8px" align="center" gap="8px">
            <FaGraduationCap size="24px" />
            <Text>{education_level?.education_level}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <LiaCertificateSolid size="24px" />
            <Text>Seniority level - {seniority_level ? seniority_level + 1 : 0}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <FaLocationDot size="24px" />
            <Text>{work_type?.work_type}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <IoBriefcaseSharp size="24px" />
            <Text>{contract_type?.contract_type}</Text>
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
