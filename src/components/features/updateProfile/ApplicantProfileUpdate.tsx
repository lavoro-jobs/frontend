import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Divider, Flex, Heading, IconButton, Image, Input, Select, Text } from "@chakra-ui/react";
import Experience from "@/interfaces/shared/experience.interface";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import MapClickEvent from "@/interfaces/applicant/map-click-event.interface";
import updateApplicantProfile from "@/helpers/updateApplicantProfile";
import { useRouter } from "next/navigation";
import Multiselect from "multiselect-react-dropdown";
import Slider from "rc-slider";
import { FiXCircle } from "react-icons/fi";
import FormOptions from "@/interfaces/shared/formOptions.interface";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import Form from "@/interfaces/applicant/form-state-get-applicant.interface";
import FormState from "@/interfaces/applicant/form-state.interface";
import Skill from "@/interfaces/shared/skill.interface";
import deleteExperience from "@/helpers/deleteExperience";
import createExperiences from "@/helpers/createExperiences";
import updateExperience from "@/helpers/updateExperience";

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
  profile_picture,
}: Form) {
  const router = useRouter();
  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [skill, setSkill] = useState<Skill[]>(skills);
  const [experience, setExperience] = useState<Experience[]>(experiences ? experiences : []);
  const [initialExperiences, setInitialExperiences] = useState<Experience[]>(experiences ? experiences : []);
  const [error, setError] = useState<boolean>(false);

  const [formData, setFormData] = useState<Form>({
    profile_picture: profile_picture,
    first_name: first_name,
    last_name: last_name,
    education_level: {
      id: education_level.id,
      education_level: education_level.education_level,
    },
    age: age,
    gender: gender,
    skills: skill,
    experiences: experiences,
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
    education_level_id: undefined,
    position_id: undefined,
    contract_type_id: undefined,
    work_type_id: undefined,
  });

  useEffect(() => {
    const newFormData = {
      ...formData,
      education_level_id: education_level.id,
      position_id: position.id,
      contract_type_id: contract_type.id,
      work_type_id: work_type.id,
    };
    setFormData(newFormData);
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
    setFileName("cv.pdf");
    setInitialExperiences(experiences);
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
      const newFormData = { ...formData, seniority_level: value };
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

  const removeExperience = async (index: number) => {
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

  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf"];

      if (allowedTypes.includes(file.type)) {
        setFileUrl(URL.createObjectURL(file));
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = async (event) => {
          if (event.target) {
            let base64String = event.target.result as string;
            base64String = base64String.split(",")[1];

            setFormData({
              ...formData,
              cv: base64String,
            });
          }
        };

        reader.readAsDataURL(file);
        setError(false);
      } else {
        setError(true);
      }
    }

    e.target.value = "";
  };

  const getApplicantPostData = async () => {
    return {
      profile_picture: formData.profile_picture,
      first_name: formData.first_name,
      last_name: formData.last_name,
      education_level_id: formData.education_level_id,
      age: formData.age,
      gender: formData.gender,
      skill_ids: formData.skills.map((skill) => skill.id).filter((id) => typeof id === "number") as number[],
      cv: formData.cv,
      work_type_id: formData.work_type_id,
      seniority_level: formData.seniority_level,
      position_id: formData.position_id,
      home_location: {
        longitude: formData.home_location.longitude,
        latitude: formData.home_location.latitude,
      },
      work_location_max_distance: formData.work_location_max_distance,
      contract_type_id: formData.contract_type_id,
      min_salary: formData.min_salary,
    };
  };

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e: any) {
        setMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
        const newFormData = {
          ...formData,
          home_location: {
            longitude: e.latlng.lng,
            latitude: e.latlng.lat,
          },
        };
        setFormData(newFormData);
      },
    });
    return null;
  };

  const findUpdatedExperiences = (initialExperiences: Experience[], currentExperiences: Experience[]) => {
    const updatedExperiences = currentExperiences.filter((currentExp) => {
      const initialExp = initialExperiences.find((exp) => exp.id === currentExp.id);
      if (!initialExp) return false;
      return (
        initialExp.position_id !== currentExp.position_id ||
        initialExp.years !== currentExp.years ||
        initialExp.company_name !== currentExp.company_name
      );
    });

    return updatedExperiences;
  };

  const handleSubmit = async () => {
    const applicantPostData = await getApplicantPostData();
    const applicantResponse = await updateApplicantProfile(applicantPostData);

    const currentExperienceIds = new Set(formData.experiences.map((exp) => exp.id));
    for (const exp of initialExperiences) {
      if (!currentExperienceIds.has(exp.id)) {
        await deleteExperience(exp.id);
      }
    }

    const initialExperienceIds = new Set(initialExperiences.map((exp) => exp.id));
    const newExperiences = formData.experiences.filter((exp) => !initialExperienceIds.has(exp.id));
    if (newExperiences.length > 0) {
      await createExperiences(newExperiences);
    }

    const updatedExperiences = findUpdatedExperiences(initialExperiences, formData.experiences);
    for (const exp of updatedExperiences) {
      const data = {
        id: exp.id,
        company_name: exp.company_name,
        position_id: exp.position_id,
        years: exp.years,
      };
      await updateExperience(data);
    }

    if (applicantResponse == 200) {
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
  const inputRef = useRef<HTMLInputElement>(null);
  const handleLogoUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const profileRef = useRef<HTMLInputElement>(null);
  const handlePictureUpload = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };
  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target) {
          let base64String = event.target.result as string;
          base64String = base64String.split(",")[1];

          setFormData({
            ...formData,
            profile_picture: base64String,
          });
        }
      };

      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  return (
    <>
      <Flex gap="32px" className="applicant-profile-update profile-update">
        <Box flex="1" pr="32px">
          <Flex gap="8px" justify="space-between">
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                First name
              </Heading>
              <Input
                w="100%"
                borderColor="#2E77AE"
                id="first_name"
                value={formData.first_name}
                onChange={handleFormChange}
              />
            </Box>
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Last name
              </Heading>
              <Input
                w="100%"
                borderColor="#2E77AE"
                id="last_name"
                value={formData.last_name}
                onChange={handleFormChange}
              />
            </Box>
          </Flex>

          <Flex gap="8px" justify="space-between">
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Age
              </Heading>
              <Input
                w="100%"
                borderColor="#2E77AE"
                id="age"
                type="number"
                value={formData.age}
                onChange={handleNumberFormChange}
              />
            </Box>
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Gender
              </Heading>
              <Select
                w="100%"
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
            value={formData.education_level_id}
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
            value={formData.position_id}
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
          <Slider min={1} max={5} step={1} defaultValue={seniority_level} marks={marks} onChange={handleSliderChange} />

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

          <Button
            mt="16px"
            w="300px"
            colorScheme="blue"
            value={formData.profile_picture ? formData.profile_picture : undefined}
            onClick={handlePictureUpload}
          >
            Upload new profile picture
          </Button>

          <Box mb="16px" mt="16px" w="100px" border="#2E77AE solid 2px" overflow="hidden" position="relative">
            <Image
              src={
                formData.profile_picture
                  ? `data:image/jpeg;base64,${formData.profile_picture}`
                  : "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              }
              alt="Profile picture"
            />
            <Button
              position="absolute"
              top="-5px"
              right="-5px"
              color="#2E77AE"
              bg="transparent"
              _hover={{ color: "#0D2137" }}
              onClick={() => {
                setFormData({
                  ...formData,
                  profile_picture: "",
                });
              }}
            >
              ✖
            </Button>
          </Box>

          <Input
            id="profile-picture"
            type="file"
            ref={profileRef}
            style={{ display: "none" }}
            onChange={handleProfileChange}
          />
        </Box>

        <Box flex="1">
          <Flex gap="8px" justify="space-between">
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Contract type
              </Heading>
              <Select
                id="contract_type_id"
                w="100%"
                borderColor="#2E77AE"
                value={formData.contract_type_id}
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
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Work type
              </Heading>
              <Select
                w="100%"
                borderColor="#2E77AE"
                id="work_type_id"
                value={formData.work_type_id}
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

          <Flex gap="8px" justify="space-between">
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Min salary (€) {formData.contract_type_id == 4 && <span>by month</span>}
                {(formData.contract_type_id == 1 ||
                  formData.contract_type_id == 2 ||
                  formData.contract_type_id == 3) && <span>by hour</span>}
              </Heading>

              <Input
                w="100%"
                borderColor="#2E77AE"
                id="min_salary"
                type="number"
                value={formData.min_salary}
                onChange={handleNumberFormChange}
              />
            </Box>
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Max distance
              </Heading>
              <Input
                id="work_location_max_distance"
                w="100%"
                borderColor="#2E77AE"
                type="number"
                value={formData.work_location_max_distance}
                onChange={handleNumberFormChange}
              />
            </Box>
          </Flex>

          <Flex gap="8px" justify="space-between">
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Latitude
              </Heading>
              <Input
                id="lat"
                w="100%"
                borderColor="#2E77AE"
                type="number"
                value={marker.lat || formData.home_location?.latitude}
                onChange={handleNumberFormChange}
              />
            </Box>
            <Box w="49%">
              <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                Longitude
              </Heading>
              <Input
                id="lng"
                w="100%"
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
          <div
            style={{
              height: "400px",
              width: "100%",
            }}
          >
            <MapContainer center={[0, 0]} zoom={2} style={{ height: "350px", width: "100%" }}>
              <LocationFinderDummy />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
          </div>
        </Box>
      </Flex>
      <Box borderTop="solid #2E77AE 1px" />
      <Box>
        <Flex direction="column" justify="center" mt="48px" align="center" gap="0px">
          <Input id="logo" type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />

          <Button colorScheme="blue" value={formData.cv} onClick={handleLogoUpload}>
            Upload {formData.cv ? "new" : ""} CV
          </Button>
          {error && <Text color="red">Please upload a PDF file!</Text>}

          {formData.cv && (
            <>
              <Flex align="center">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  {fileName}
                </a>
                <Button
                  color="#2E77AE"
                  bg="transparent"
                  _hover={{ color: "#0D2137" }}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      cv: "",
                    });
                  }}
                >
                  ✖
                </Button>
              </Flex>
            </>
          )}
        </Flex>
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
                    w="100%"
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
                      placeholder={input.position?.position_name ? input.position.position_name : "Select"}
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
        <Flex justify="flex-end">
          <Button mt="32px" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" onClick={handleSubmit}>
            Finish
          </Button>
        </Flex>
      </Box>
    </>
  );
}
