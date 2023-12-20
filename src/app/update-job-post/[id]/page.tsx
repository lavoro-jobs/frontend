"use client";

import Sidenav from "@/components/features/dashboard/Sidenav";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import getJobPostsByRecruiter from "@/helpers/getJobPosts";
import getRecruitersAndCompany from "@/helpers/getRecruitersAndCompany";
import updateJobPost from "@/helpers/updateJobPost";
import MapClickEvent from "@/interfaces/applicant/map-click-event.interface";
import CompanyRecruitersState from "@/interfaces/company/form-state-get-company-with-recruiters.interface";
import CurrentUserState from "@/interfaces/current-user/form-state.interface";
import FormState from "@/interfaces/job-posts/form-state.interface";
import FormOptions from "@/interfaces/shared/formOptions.interface";
import Recruiter from "@/interfaces/shared/recruiter.interface";
import Skill from "@/interfaces/shared/skill.interface";
import {
  Box,
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
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from "next/navigation";
import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaMoneyBillWave } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoBriefcaseSharp } from "react-icons/io5";
import { LiaCertificateSolid } from "react-icons/lia";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import getCurrentUser from "@/helpers/getCurrentUser";
import assignJobPost from "@/helpers/assignJobPost";

export default function PostUpdate({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [companyRecruiters, setCompanyRecruiters] = useState<CompanyRecruitersState>({});
  const [user, setUser] = useState<CurrentUserState>({});

  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [selectedJobPost, setSelectedJobPost] = useState<FormState>();

  const [endDate, setEndDate] = useState<string>();
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [skill, setSkill] = useState<Skill[]>();
  const [error, setError] = useState({
    end_date: false,
    salary: false,
  });

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  useEffect(() => {
    getRecruitersAndCompany().then((resp) => {
      setCompanyRecruiters(resp);
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

  useEffect(() => {
    getCurrentUser().then((resp) => {
      setUser(resp);
    });
  }, []);

  useEffect(() => {
    if (
      selectedJobPost &&
      selectedJobPost.salary_min &&
      selectedJobPost.salary_max &&
      Number(selectedJobPost.salary_min) > Number(selectedJobPost.salary_max)
    ) {
      setError({ ...error, salary: true });
    } else setError({ ...error, salary: false });
  }, [selectedJobPost?.salary_min, selectedJobPost?.salary_max]);

  useEffect(() => {
    if (endDate) {
      const end_date = new Date(endDate);
      const today = new Date();
      if (end_date < today) {
        setError({ ...error, end_date: true });
      } else {
        setError({ ...error, end_date: false });
      }
    } else {
      setError({ ...error, end_date: false });
    }
  }, [endDate]);

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

  const handleSkills = (selectedList: [{ id: number; skill_name: string }]) => {
    const newFormData = { ...selectedJobPost, skills: selectedList };
    setSkill(selectedList);
    setSelectedJobPost(newFormData);
  };

  const handleAssignees = (selectedList: Recruiter[]) => {
    setCompanyRecruiters({ ...companyRecruiters, recruiters: selectedList });
    setSelectedJobPost({ ...selectedJobPost, assignees: selectedList });
  };

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e: any) {
        setMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
        const newFormData = {
          ...selectedJobPost,
          work_location: {
            longitude: e.latlng.lng,
            latitude: e.latlng.lat,
          },
        };
        setSelectedJobPost(newFormData);
      },
    });
    return null;
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
    };
  };

  const assigneePostData = async () => {
    let data;
    if (selectedJobPost?.id && selectedJobPost?.assignees) {
      data = {
        id: selectedJobPost?.id,
        assignees: {
          assignees: selectedJobPost.assignees
            .filter((assignee) => assignee.account_id !== user?.account_id)
            .map((assignee) => assignee.account_id),
        },
      };
    }
    return data;
  };

  const handleSubmit = async () => {
    if (!error.salary && !error.end_date) {
      const postData = await createPostData();
      const res = await updateJobPost(postData);
      if (res == 200) {
        const data = await assigneePostData();
        if (data) {
          const res2 = await assignJobPost(data);
        }
        router.push("/job-posts");
      }
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
      <Flex align="center" justify="center">
        <Card p="32px">
          <Flex gap="48px">
            <Box>
              <Text fontSize="sm" color="gray">
                End date: {endDate?.substring(0, 10)}, {endDate?.substring(11, 16)}
              </Text>
              <Text fontSize="xl" mt="16px" color="#2E77AE">
                End date
              </Text>
              <Input
                borderColor="#2E77AE"
                w="500px"
                id="end_date"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              {error.end_date && (
                <Text mt="4px" color="red">
                  The end date should be ahead of today's date.
                </Text>
              )}

              <Heading mt="16px">{getNameById(selectedJobPost?.position?.id, "positions")}</Heading>
              <Text fontSize="xl" mt="16px" color="#2E77AE">
                Position
              </Text>
              <Select
                borderColor="#2E77AE"
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

              <Text fontSize="xl" mt="16px" color="#2E77AE">
                Description
              </Text>
              <Textarea
                maxLength={150}
                borderColor="#2E77AE"
                id="description"
                value={selectedJobPost?.description}
                onChange={handleFormChange}
              />

              <Flex mt="8px" align="center" gap="8px">
                <LiaCertificateSolid size="24px" />
                <Text>
                  Seniority level - {selectedJobPost?.seniority_level ? selectedJobPost?.seniority_level + 1 : 0}
                </Text>
              </Flex>
              <Flex mt="8px" align="center" gap="8px">
                <FaGraduationCap size="24px" />
                <Text>{getNameById(selectedJobPost?.education_level?.id, "education")}</Text>
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
                  {(selectedJobPost?.contract_type?.id == 1 ||
                    selectedJobPost?.contract_type?.id == 2 ||
                    selectedJobPost?.contract_type?.id == 3) && <span>, hourly</span>}
                  {selectedJobPost?.contract_type?.id == 4 && <span>, monthly</span>}
                </Text>
              </Flex>

              <Text fontSize="xl" mt="32px" mb="8px" color="#2E77AE">
                Seniority level
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

              <Text fontSize="xl" mt="48px" color="#2E77AE">
                Education level
              </Text>
              <Select
                borderColor="#2E77AE"
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

              <Text fontSize="xl" mt="16px" color="#2E77AE">
                Work type
              </Text>
              <Select
                borderColor="#2E77AE"
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
              <Text fontSize="xl" mt="16px" color="#2E77AE">
                Contract type
              </Text>
              <Select
                borderColor="#2E77AE"
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

              {(selectedJobPost?.contract_type?.id == 1 ||
                selectedJobPost?.contract_type?.id == 2 ||
                selectedJobPost?.contract_type?.id == 3) && (
                <Heading size="lg" mt="16px" color="#2E77AE">
                  Salary by hour
                </Heading>
              )}
              {selectedJobPost?.contract_type?.id == 4 && (
                <Heading size="lg" mt="16px" color="#2E77AE">
                  Salary by month
                </Heading>
              )}

              <Text fontSize="xl" mt="4px" color="#2E77AE">
                Min salary (€)
              </Text>
              <Input
                borderColor="#2E77AE"
                id="salary_min"
                type="number"
                value={selectedJobPost?.salary_min}
                onChange={handleFormChange}
              />

              <Text fontSize="xl" mt="16px" color="#2E77AE">
                Max salary (€)
              </Text>
              <Input
                borderColor="#2E77AE"
                id="salary_max"
                type="number"
                value={selectedJobPost?.salary_max}
                onChange={handleFormChange}
              />

              {error.salary && (
                <Text mt="4px" color="red">
                  Max salary should be greater than min salary.
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                Address: {selectedJobPost?.work_location?.latitude}, {selectedJobPost?.work_location?.longitude}
              </Text>
              <Flex gap="8px" justify="space-between">
                <Box w="50%">
                  <Text fontSize="xl" mt="16px" color="#2E77AE">
                    Latitude
                  </Text>
                  <Input
                    id="lat"
                    w="100%"
                    borderColor="#2E77AE"
                    type="number"
                    value={marker.lat || selectedJobPost?.work_location?.latitude}
                    onChange={(e) => {
                      setSelectedJobPost({
                        ...selectedJobPost,
                        work_location: {
                          latitude: +e.target.value,
                        },
                      });
                    }}
                  />
                </Box>
                <Box w="50%">
                  <Text fontSize="xl" mt="16px" color="#2E77AE">
                    Longitude
                  </Text>
                  <Input
                    id="lng"
                    w="100%"
                    borderColor="#2E77AE"
                    type="number"
                    value={marker.lng || selectedJobPost?.work_location?.longitude}
                    onChange={(e) => {
                      setSelectedJobPost({
                        ...selectedJobPost,
                        work_location: {
                          longitude: +e.target.value,
                        },
                      });
                    }}
                  />
                </Box>
              </Flex>

              <Text fontSize="xl" mt="16px" color="#2E77AE" textAlign="center">
                Click location on map to get Latitude/Longitude
              </Text>
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  marginBottom: "8px",
                }}
              >
                <MapContainer center={[0, 0]} zoom={2} style={{ height: "350px", width: "100%" }}>
                  <LocationFinderDummy />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
              </div>

              <Text fontSize="xl" color="#2E77AE">
                Skills
              </Text>
              <Multiselect
                options={formOptions.skills}
                selectedValues={selectedJobPost?.skills}
                displayValue="skill_name"
                placeholder="Select"
                onSelect={handleSkills}
                onRemove={handleSkills}
              />

              <Text fontSize="xl" mt="16px" color="#2E77AE">
                Assignees
              </Text>
              <Multiselect
                options={companyRecruiters.recruiters}
                selectedValues={selectedJobPost?.assignees}
                displayValue={`last_name`}
                placeholder="Select"
                onSelect={handleAssignees}
                onRemove={handleAssignees}
              />
            </Box>
          </Flex>

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
