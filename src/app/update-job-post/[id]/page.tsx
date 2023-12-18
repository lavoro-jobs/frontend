"use client";

import Sidenav from "@/components/features/dashboard/Sidenav";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import getJobPostsByRecruiter from "@/helpers/getJobPosts";
import updateJobPost from "@/helpers/updateJobPost";
import FormState from "@/interfaces/job-posts/form-state.interface";
import FormOptions from "@/interfaces/shared/formOptions";
import {
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaMoneyBillWave } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoBriefcaseSharp } from "react-icons/io5";
import { LiaCertificateSolid } from "react-icons/lia";

export default function PostUpdate({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [selectedJobPost, setSelectedJobPost] = useState<FormState>();
  const [endDate, setEndDate] = useState<string>();

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const data = await getJobPostsByRecruiter();
        setJobPosts(data);
      } catch (error) {
        console.error("Failed to fetch job posts", error);
      }
    };

    fetchJobPosts();
  }, []);

  useEffect(() => {
    const post = jobPosts.find((jobPost) => jobPost.id === params.id);
    if (post) {
      setSelectedJobPost(post);
      setEndDate(post.end_date?.substring(0, 16));
    }
  }, [jobPosts, params.id]);

  const getNameById = (id: number | number[] | undefined, category: keyof FormOptions): string => {
    if (id) {
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
    }
    return "";
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const newFormData = { ...selectedJobPost, [e.target.id]: e.target.value };
    setSelectedJobPost(newFormData);
  };

  const createPostData = async () => {
    return {
      id: selectedJobPost?.id,
      position_id: selectedJobPost?.position?.id,
      description: selectedJobPost?.description,
      education_level_id: selectedJobPost?.education_level?.id,
      skill_ids: selectedJobPost?.skills?.map((skill) => skill.id).filter((id) => typeof id === "number") as number[],
      work_type_id: selectedJobPost?.work_type?.id,
      seniority_level: selectedJobPost?.seniority_level,
      work_location: {
        longitude: selectedJobPost?.work_location?.longitude,
        latitude: selectedJobPost?.work_location?.latitude,
      },
      contract_type_id: selectedJobPost?.contract_type?.id,
      salary_min: selectedJobPost?.salary_min,
      salary_max: selectedJobPost?.salary_max,
      end_date: endDate ? endDate + ":00.000Z" : "2025-06-07T23:59:59.000Z",
      assignees: selectedJobPost?.assignees,
    };
  };

  const handleSubmit = async () => {
    const postData = await createPostData();
    const res = await updateJobPost(postData);
    if (res == 200) {
      router.push("/job-posts");
    }
  };

  const marks = {
    1: "Novice",
    2: "Apprentice",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert",
  };

  return (
    <Sidenav>
      <Flex direction="column" align="center">
        <Card p="32px">
          <Text fontSize="sm" color="gray">
            End date: {endDate?.substring(0, 10)}, {endDate?.substring(11, 16)}
          </Text>
          <Text fontSize="lg" pt="8px">
            Choose new end date
          </Text>
          <Input
            w="500px"
            id="end_date"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Heading mt="16px">{getNameById(selectedJobPost?.position?.id, "positions")}</Heading>
          <Text fontSize="lg" pt="16px">
            Choose new position
          </Text>
          <Select
            id="position_id"
            value={selectedJobPost?.position?.id}
            onChange={(e) => {
              setSelectedJobPost({
                ...selectedJobPost,
                position: {
                  ...selectedJobPost?.position,
                  id: +e.target.value,
                },
              });
            }}
            placeholder="Select"
          >
            {formOptions &&
              formOptions.positions?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.position_name}
                </option>
              ))}
          </Select>

          <Text fontSize="sm" color="gray.500" mt="4px">
            Address: {selectedJobPost?.work_location?.longitude}, {selectedJobPost?.work_location?.latitude}
          </Text>

          <Text fontSize="lg" pt="16px">
            Description
          </Text>
          <Textarea id="description" value={selectedJobPost?.description} onChange={handleFormChange} />

          <Flex gap="4px" mt="16px">
            {selectedJobPost?.skills?.map((skill) => (
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
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <FaGraduationCap size="24px" />
            <Text>{getNameById(selectedJobPost?.education_level?.id, "education")}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <LiaCertificateSolid size="24px" />
            <Text>Seniority level - {selectedJobPost?.seniority_level ? selectedJobPost?.seniority_level + 1 : 0}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <FaLocationDot size="24px" />
            <Text>{getNameById(selectedJobPost?.work_type?.id, "work_types")}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <IoBriefcaseSharp size="24px" />
            <Text>{getNameById(selectedJobPost?.contract_type?.id, "contract_types")}</Text>
          </Flex>
          <Flex mt="8px" align="center" gap="8px">
            <FaMoneyBillWave size="24px" />
            <Text>
              {selectedJobPost?.salary_min !== undefined && selectedJobPost?.salary_max !== undefined
                ? `$${selectedJobPost?.salary_min} - $${selectedJobPost?.salary_max}`
                : selectedJobPost?.salary_min !== undefined
                ? `From $${selectedJobPost?.salary_min}`
                : selectedJobPost?.salary_max !== undefined
                ? `Up to $${selectedJobPost?.salary_max}`
                : "Salary not specified"}
            </Text>
          </Flex>

          <Text fontSize="lg" mt="32px" mb="8px">
            Choose new seniority level
          </Text>
          <Slider
            min={1}
            max={5}
            step={1}
            marks={marks}
            onChange={(value: number | number[]) => {
              if (typeof value === "number") {
                setSelectedJobPost({
                  ...selectedJobPost,
                  seniority_level: value - 1,
                });
              }
            }}
          />

          <Text fontSize="lg" mt="48px">
            Choose new education level
          </Text>
          <Select
            id="education_level_id"
            value={selectedJobPost?.education_level?.id}
            onChange={(e) => {
              setSelectedJobPost({
                ...selectedJobPost,
                education_level: {
                  ...selectedJobPost?.education_level,
                  id: +e.target.value,
                },
              });
            }}
            placeholder="Select"
          >
            {formOptions &&
              formOptions.education?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.education_level}
                </option>
              ))}
          </Select>

          <Text fontSize="lg" mt="16px">
            Choose new work type
          </Text>
          <Select
            id="work_type_id"
            value={selectedJobPost?.work_type?.id}
            onChange={(e) => {
              setSelectedJobPost({
                ...selectedJobPost,
                work_type: {
                  ...selectedJobPost?.work_type,
                  id: +e.target.value,
                },
              });
            }}
            placeholder="Select"
          >
            {formOptions &&
              formOptions.work_types?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.work_type}
                </option>
              ))}
          </Select>
          <Text fontSize="lg" pt="16px">
            Choose new contract type
          </Text>
          <Select
            id="contract_type_id"
            value={selectedJobPost?.contract_type?.id}
            onChange={(e) => {
              setSelectedJobPost({
                ...selectedJobPost,
                contract_type: {
                  ...selectedJobPost?.contract_type,
                  id: +e.target.value,
                },
              });
            }}
            placeholder="Select"
          >
            {formOptions &&
              formOptions.contract_types?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.contract_type}
                </option>
              ))}
          </Select>

          <Divider mt="32px" mb="32px" color="#2E77AE" />
          <CardFooter alignSelf="flex-end">
            <ButtonGroup spacing="2">
              <Button variant="ghost" colorScheme="blue" onClick={() => router.push("/job-posts")}>
                Cancel
              </Button>
              <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Flex>
    </Sidenav>
  );
}
