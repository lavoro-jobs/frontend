import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Flex, Heading, IconButton, Input, Select, Text } from "@chakra-ui/react";
import Experience from "@/interfaces/shared/experience";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import GoogleMapReact from "google-map-react";
import MapClickEvent from "@/interfaces/applicant/map-click-event";
import updateApplicantProfile from "@/helpers/updateApplicantProfile";
import { useRouter } from "next/navigation";
import Multiselect from "multiselect-react-dropdown";
import Slider from "rc-slider";
import { FiXCircle } from "react-icons/fi";
import FormOptions from "@/interfaces/shared/formOptions";
import Form from "@/interfaces/applicant/form-state-get-applicant.interface";
import FormState from "@/interfaces/applicant/form-state.interface";
import Skill from "@/interfaces/shared/skill";

export default function ApplicantProfileUpdate({
  first_name,
  last_name,
  education_level,
  age,
  gender,
  skills,
  experiences,
  cv,
  work_type,
  seniority_level,
  position,
  home_location,
  work_location_max_distance,
  contract_type,
  min_salary,
}: Form) {
  const router = useRouter();
  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [skill, setSkill] = useState<Skill[]>(skills);
  const [experience, setExperience] = useState<Experience[]>(experiences ? experiences : []);

  const [formData, setFormData] = useState<Form>({
    first_name: first_name,
    last_name: last_name,
    education_level: {
      id: education_level.id,
      education_level: education_level.education_level,
    },
    age: age,
    gender: gender,
    skills: skill,
    experiences: experience,
    cv: cv,
    work_type: {
      id: work_type.id,
      work_type: work_type.work_type,
    },
    seniority_level: seniority_level,
    position: {
      id: position.id,
      position_name: position.position_name,
    },
    home_location: {
      longitude: home_location.longitude,
      latitude: home_location.latitude,
    },
    work_location_max_distance: work_location_max_distance,
    contract_type: {
      id: contract_type.id,
      contract_type: contract_type.contract_type,
    },
    min_salary: min_salary,
  });

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  };

  const handleNumberFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: +e.target.value };
    setFormData(newFormData);
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      const newFormData = { ...formData, seniority_level: value - 1 };
      setFormData(newFormData);
    }
  };

  const handleSkills = (selectedList: [{ id: number; skill_name: string }]) => {
    const skillIdArray = selectedList.map((item) => item.id);
    const newFormData = { ...formData, skills: selectedList };
    setSkill(selectedList);
    setFormData(newFormData);
  };

  const handleMapClick = ({ x, y, lat, lng, event }: MapClickEvent) => {
    setMarker({ lat, lng });
    const newFormData = {
      ...formData,
      home_location: {
        longitude: lng,
        latitude: lat,
      },
    };
    setFormData(newFormData);
  };

  const addInput = () => {
    const newInputs = [...experience, {}];
    setExperience(newInputs);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = experience.filter((item, i) => index !== i);
    setExperience(updatedExperience);

    const newFormData = { ...formData, experiences: updatedExperience };
    setFormData(newFormData);
  };

  const handleExperience = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    property: string
  ) => {
    const value = e.target.value;

    const updatedExperience = [...experience];

    if (updatedExperience[index]) {
      updatedExperience[index] = {
        ...updatedExperience[index],
        [property]: property === "position_id" || property === "years" ? parseInt(value, 10) : value,
      };

      setExperience(updatedExperience);

      const newFormData = { ...formData, experiences: updatedExperience };
      setFormData(newFormData);
    }
  };

  const getPostData = async () => {
    return ({
      first_name: formData.first_name,
      last_name: formData.last_name,
      education_level_id: formData.education_level.id,
      age: formData.age,
      gender: formData.gender,
      skill_ids: formData.skills.map((skill) => skill.id).filter((id) => typeof id === "number") as number[],
      //experiences: formData.experiences,
      cv: formData.cv,
      work_type_id: formData.work_type.id,
      seniority_level: formData.seniority_level,
      position_id: formData.position.id,
      home_location: {
        longitude: formData.home_location.longitude,
        latitude: formData.home_location.latitude,
      },
      work_location_max_distance: formData.work_location_max_distance,
      contract_type_id: formData.contract_type.id,
      min_salary: formData.min_salary,
    });
  }
  

  const handleSubmit = async () => {
    const postData = await getPostData();
    const response = await updateApplicantProfile(postData);
    if (response == 200) {
      window.location.reload();
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
    <>
      <Flex gap="32px">
        <Box flex="1" pr="32px" borderRight="solid #2E77AE 1px">
          <Flex gap="8px" justify="center">
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                First name
              </Heading>
              <Input
                w="300px"
                borderColor="#2E77AE"
                id="first_name"
                value={formData.first_name}
                onChange={handleFormChange}
              />
            </Box>
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Last name
              </Heading>
              <Input
                w="300px"
                borderColor="#2E77AE"
                id="last_name"
                value={formData.last_name}
                onChange={handleFormChange}
              />
            </Box>
          </Flex>

          <Flex gap="8px" justify="center">
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Age
              </Heading>
              <Input
                w="300px"
                borderColor="#2E77AE"
                id="age"
                type="number"
                value={formData.age}
                onChange={handleNumberFormChange}
              />
            </Box>
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Gender
              </Heading>
              <Select
                w="300px"
                borderColor="#2E77AE"
                id="gender"
                value={formData.gender}
                onChange={handleFormChange}
                placeholder="Select"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </Box>
          </Flex>

          <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
            Education level
          </Heading>
          <Select
            paddingTop="16px"
            borderColor="#2E77AE"
            id="education_level_id"
            value={formData.education_level.id}
            onChange={handleNumberFormChange}
            placeholder="Select"
          >
            {formOptions &&
              formOptions.education?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.education_level}
                </option>
              ))}
          </Select>

          <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
            Position
          </Heading>
          <Select
            paddingTop="16px"
            borderColor="#2E77AE"
            id="position_id"
            value={formData.position.id}
            onChange={handleNumberFormChange}
            placeholder="Select"
          >
            {formOptions &&
              formOptions.positions?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.position_name}
                </option>
              ))}
          </Select>

          <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
            Seniority level
          </Heading>
          <Slider min={1} max={5} step={1} marks={marks} onChange={handleSliderChange} />

          <Heading fontSize="xl" pt="32px" pb="8px" color="#2E77AE">
            Skills
          </Heading>
          <Multiselect
            options={formOptions.skills}
            selectedValues={skills}
            displayValue="skill_name"
            placeholder="Select"
            onSelect={handleSkills}
            onRemove={handleSkills}
          />
        </Box>

        <Box flex="1">
          <Flex gap="8px" justify="center">
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Contract type
              </Heading>
              <Select
                id="contract_type_id"
                w="300px"
                borderColor="#2E77AE"
                value={formData.contract_type.id}
                onChange={handleNumberFormChange}
                placeholder="Select"
              >
                {formOptions &&
                  formOptions.contract_types?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.contract_type}
                    </option>
                  ))}
              </Select>
            </Box>
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Work type
              </Heading>
              <Select
                w="300px"
                borderColor="#2E77AE"
                id="work_type_id"
                value={formData.work_type.id}
                onChange={handleNumberFormChange}
                placeholder="Select"
              >
                {formOptions &&
                  formOptions.work_types?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.work_type}
                    </option>
                  ))}
              </Select>
            </Box>
          </Flex>

          <Flex gap="8px" justify="center">
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Minimum salary
              </Heading>
              <Input
                w="300px"
                borderColor="#2E77AE"
                id="min_salary"
                type="number"
                value={formData.min_salary}
                onChange={handleNumberFormChange}
              />
            </Box>
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Max distance
              </Heading>
              <Input
                id="work_location_max_distance"
                w="300px"
                borderColor="#2E77AE"
                type="number"
                value={formData.work_location_max_distance}
                onChange={handleNumberFormChange}
              />
            </Box>
          </Flex>

          <Flex gap="8px" justify="center">
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Latitude
              </Heading>
              <Input
                id="lat"
                w="300px"
                borderColor="#2E77AE"
                type="number"
                value={marker.lat || formData.home_location?.latitude}
                onChange={handleNumberFormChange}
              />
            </Box>
            <Box>
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Longitude
              </Heading>
              <Input
                id="lng"
                w="300px"
                borderColor="#2E77AE"
                type="number"
                value={marker.lng || formData.home_location?.longitude}
                onChange={handleNumberFormChange}
              />
            </Box>
          </Flex>

          <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE" textAlign="center">
            Click location on map to get Latitude/Longitude
          </Heading>
          <div style={{ height: "400px", width: "100%", paddingTop: "16px", paddingBottom: "16px" }}>
            <GoogleMapReact
              defaultCenter={{ lat: 0, lng: 0 }}
              defaultZoom={3}
              onClick={handleMapClick}
            ></GoogleMapReact>
          </div>
        </Box>
      </Flex>
      <Box borderTop="solid #2E77AE 1px" />
      <Box>
        <Flex flexFlow={"column"} align="center">
          {experience.map((input, index) => (
            <div key={index} className="experience-wrapper">
              <IconButton
                variant="outline"
                aria-label="remove"
                className="remove-btn"
                onClick={() => removeExperience(index)}
                icon={<FiXCircle />}
              />
              
              <Flex direction="column" justify="center" align="center">
                <Box>
                  <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE" textAlign="center">
                    Company name
                  </Heading>
                  <Input
                    alignSelf="center"
                    w="300px"
                    key={index}
                    value={input.company_name}
                    id="company_name"
                    type="text"
                    onChange={(e) => handleExperience(e, index, "company_name")}
                    placeholder="Company name"
                  />
                </Box>
                <Flex gap="8px" justify="center">
                  <Box>
                    <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE" textAlign="center">
                      Position
                    </Heading>

                    <Select
                      id="position_id"
                      value={input.position_id}
                      placeholder="Select"
                      onChange={(e) => handleExperience(e, index, "position_id")}
                    >
                      {formOptions &&
                        formOptions.positions?.map((item, innerIndex) => (
                          <option value={item.id} key={innerIndex}>
                            {item.position_name}
                          </option>
                        ))}
                    </Select>
                  </Box>

                  <Box>
                    <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE" textAlign="center">
                      Years
                    </Heading>
                    <Input
                      id="years"
                      value={input.years}
                      type="number"
                      onChange={(e) => handleExperience(e, index, "years")}
                    />
                  </Box>
                </Flex>
              </Flex>
            </div>
          ))}
          <Button marginTop="32px" onClick={addInput} colorScheme="blue">
            Add company
          </Button>
        </Flex>
        <Button mt="32px" colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
}
