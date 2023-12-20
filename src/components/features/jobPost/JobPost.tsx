import getAllCatalogs from "@/helpers/getAllCatalogs";
import FormState from "@/interfaces/job-posts/form-state.interface";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import archiveJobPost from "@/helpers/archiveJobPost";

interface FormOptions {
  positions?: [{ id: number; position_name: string }];
  skills?: [{ id: number; skill_name: string }];
  education?: [{ id: number; education_level: string }];
  contract_types?: [{ id: number; contract_type: string }];
  work_types?: [{ id: number; work_type: string }];
}

interface JobPostProps extends FormState {
  openRestoreModal: () => void;
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
  openRestoreModal,
}: JobPostProps) {
  const router = useRouter();
  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [address, setAddress] = useState<string>("");
  const [archived, setArchived] = useState<boolean>(false);

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });

    setArchived(isArchived(end_date));
  }, []);

  const handleArchive = async () => {
    const response = await archiveJobPost(id);
    if (response == 200) {
      window.location.reload();
    }
  };

  function isArchived(endDateStr: any): boolean {
    const endDate = new Date(endDateStr);
    const now = new Date();
    return endDate < now;
  }
  return (
    <Flex direction="column" h="100%">
      <Card
        w="sm"
        h="100%"
        display="flex"
        color={isArchived(end_date) ? "gray.500" : "black"}
        backgroundColor={isArchived(end_date) ? "gray.200" : "white"}
        flexDirection="column"
      >
        <CardBody flex="1" display="flex" flexDirection="column">
          <Text fontSize="sm" color="gray" mb="8px">
            End date: {end_date?.substring(0, 10)}, {end_date?.substring(11, 16)}
          </Text>
          <Heading>{position?.position_name}</Heading>
          <Text fontSize="sm" color="gray.500" mt="2px" mb="8px">
            Address: {address ? address : `${work_location?.latitude}, ${work_location?.longitude}`}
          </Text>
          <Text mb="8px">{description}</Text>
          <Flex flexWrap="wrap">
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
                  backgroundColor={isArchived(end_date) ? "gray.500" : "blue.500"}
                  color="white"
                >
                  {skill.skill_name}
                </Text>
              ))}
          </Flex>
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
              {(contract_type?.id == 1 || contract_type?.id == 2 || contract_type?.id == 3) && <span>, hourly</span>}
              {contract_type?.id == 4 && <span>, monthly</span>}
            </Text>
          </Flex>

          <Text mt="16px" fontSize="xl">
            Assignees:
          </Text>
          <Flex flexWrap="wrap">
            {assignees &&
              assignees.map((assignee) => (
                <Flex key={assignee.account_id}>
                  <Avatar
                    size="sm"
                    style={{ filter: archived ? "blur(1px) grayscale(100%)" : "none" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3ztWTGwSgvZJvsA49k950OqfYRhhssQqaw&usqp=CAU"
                  />
                  <Text
                    display="inline-block"
                    px="2"
                    py="1"
                    mr="2"
                    mb="2"
                    borderRadius="md"
                    color={archived ? "gray.500" : "black"}
                  >
                    {assignee.first_name} {assignee.last_name}
                  </Text>
                </Flex>
              ))}
          </Flex>
        </CardBody>
        <Divider color="#2E77AE" />
        <CardFooter alignSelf="flex-end">
          <ButtonGroup spacing="2">
            {!archived && (
              <>
                <Button variant="ghost" colorScheme="blue" onClick={handleArchive}>
                  Archive
                </Button>
                <Button variant="solid" colorScheme="blue" onClick={() => router.push(`/update-job-post/${id}`)}>
                  Update
                </Button>
              </>
            )}
            {archived && (
              <Button variant="ghost" colorScheme="blue" onClick={openRestoreModal}>
                Restore
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
}
