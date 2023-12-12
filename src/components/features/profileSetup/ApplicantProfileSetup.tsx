import { Box, Button, Flex, Heading, IconButton, Input, Select, Text } from "@chakra-ui/react";
import MultiSelect from "multiselect-react-dropdown";
import React, { useEffect, useState, useRef } from "react";
import FormState from "@/interfaces/applicant/form-state.interface";
import GoogleMapReact from "google-map-react";
import MapClickEvent from "@/interfaces/applicant/map-click-event";
import createApplicantProfile from "@/helpers/createApplicantProfile";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import Experience from "@/interfaces/shared/experience";
import { useRouter } from "next/navigation";
import { CgBoy, CgGirl } from "react-icons/cg";
import { IoHappyOutline } from "react-icons/io5";
import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import { FiXCircle } from "react-icons/fi";
import Slider from "rc-slider";

interface FormOptions {
  positions?: [{ id: number; position_name: string }];
  skills?: [{ id: number; skill_name: string }];
  education?: [{ id: number; education_level: string }];
  contract_types?: [{ id: number; contract_type: string }];
  work_types?: [{ id: number; work_type: string }];
}

export default function ApplicantProfileSetup() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormState>({
    first_name: "",
    last_name: "",
    education_level_id: undefined,
    age: undefined,
    gender: "",
    skill_id_list: [],
    cv: "",
    work_type_id: undefined,
    seniority_level_id: undefined,
    position_id: undefined,
    home_location: {
      longitude: undefined,
      latitude: undefined,
    },
    work_location_max_distance: undefined,
    contract_type_id: undefined,
    min_salary: undefined,
    experiences: [],
  });

  const [formOptions, setFormOptions] = useState<FormOptions>({});

  const [marker, setMarker] = useState({ lat: 0, lng: 0 });

  const [skills, setSkills] = useState<{ id: number; skill_name: string }[]>([]);

  const [experience, setExperience] = useState<Experience[]>([]);

  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

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
      const newFormData = { ...formData, seniority_level_id: value - 1 };
      setFormData(newFormData);
    }
  };

  const handleSkills = (selectedList: [{ id: number; skill_name: string }]) => {
    const skillIdArray = selectedList.map((item) => item.id);
    const newFormData = { ...formData, skill_id_list: skillIdArray };
    setSkills(selectedList);
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

  const inputRef = useRef<HTMLInputElement>(null);
  const handleLogoUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

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

  const marks = {
    1: "Novice",
    2: "Apprentice",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert",
  };

  const [articles, setArticles] = useState([
    { id: 1, isActive: true },
    { id: 2, isActive: false },
    { id: 3, isActive: false },
    { id: 4, isActive: false },
  ]);
  const [idArticle, setIdArticle] = useState(1);
  const [btn, setBtn] = useState(true);

  const handleClick = (id: number) => {
    setIdArticle(id);
    setBtn(false);
    setTimeout(() => {
      setBtn(true);
    }, 400);

    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id ? { ...article, isActive: true } : { ...article, isActive: false }
      )
    );
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  const mainStyle = {
    "--x": `${mousePosition.x}px`,
    "--y": `${mousePosition.y}px`,
  };

  const handleSubmit = async () => {
    console.log(formData)
    const response = await createApplicantProfile(formData);
    if (response == 201) {
      router.push("/dashboard");
    }
  };

  return (
    <Flex
      className="main"
      onMouseMove={handleMouseMove}
      style={mainStyle as React.CSSProperties}
      minH="100vh"
      align="center"
      padding="100px 0"
      justify="center"
      direction="column"
    >
      <Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
        Welcome! Answer questions to get your job matches.
      </Heading>

      <Button
        borderRadius="50%"
        display={idArticle !== 4 && btn ? "" : "none"}
        position="absolute"
        top="50%"
        left="calc(50% + 330px)"
        zIndex={3}
        color="white"
        bg="#FF8E2B"
        _hover={{ color: "#0D2137", bg: "#fdb16e" }}
        onClick={() => {
          handleClick(idArticle + 1);
        }}
      >
        <IoArrowRedo />
      </Button>
      <Button
        borderRadius="50%"
        display={idArticle !== 1 && btn ? "" : "none"}
        position="absolute"
        top="50%"
        right="calc(50% + 330px)"
        zIndex={3}
        color="white"
        bg="#FF8E2B"
        _hover={{ color: "#0D2137", bg: "#fdb16e" }}
        onClick={() => {
          handleClick(idArticle - 1);
        }}
      >
        <IoArrowUndo />
      </Button>

      <Box id="card" justifyContent="center">
        <section className="backgrounds">
          <Box
            onClick={() => {
              handleClick(1);
            }}
            className="background"
            border="solid"
            borderRadius="16px"
            borderColor="#E0EAF5"
            data-active={articles[0].isActive}
          ></Box>
          <Box
            onClick={() => {
              handleClick(2);
            }}
            className="background"
            border="solid"
            borderRadius="16px"
            borderColor="#E0EAF5"
            data-active={articles[1].isActive}
          ></Box>
          <Box
            onClick={() => {
              handleClick(3);
            }}
            className="background"
            border="solid"
            borderRadius="16px"
            borderColor="#E0EAF5"
            data-active={articles[2].isActive}
          ></Box>
          <Box
            onClick={() => {
              handleClick(4);
            }}
            className="background"
            border="solid"
            borderRadius="16px"
            borderColor="#E0EAF5"
            data-active={articles[3].isActive}
          ></Box>
        </section>

        <section className="content">
          <article
            className="article"
            onClick={() => {
              !articles[0].isActive && handleClick(1);
            }}
            data-active={articles[0].isActive}
            data-id="1"
          >
            <Heading color="#2E77AE" paddingBottom="16px" textAlign="center">
              Personal information
            </Heading>

            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              First name
            </Heading>
            <Input borderColor="#2E77AE" id="first_name" value={formData.first_name} onChange={handleFormChange} />

            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              Last name
            </Heading>
            <Input borderColor="#2E77AE" id="last_name" value={formData.last_name} onChange={handleFormChange} />

            <Flex direction="column" align="center">
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
            </Flex>

            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              Gender
            </Heading>
            <Flex justify="center" gap="16px">
              <Flex
                border={formData.gender == "female" ? "#2E77AE 2px solid" : "#E0EAF5 2px solid"}
                _hover={{ cursor: "pointer", border: "#2E77AE 1px solid" }}
                borderRadius="16px"
                w="180px"
                h="200px"
                p="16px"
                direction="column"
                align="center"
                onClick={() => setFormData({ ...formData, gender: "female" })}
              >
                <CgGirl color={formData.gender == "female" ? "#2E77AE" : "#E0EAF5"} size="140px" pb="16px" />
                <Heading size="md" color={formData.gender == "female" ? "#2E77AE" : "#E0EAF5"}>
                  Female
                </Heading>
              </Flex>
              <Flex
                border={formData.gender == "male" ? "#2E77AE 2px solid" : "#E0EAF5 2px solid"}
                _hover={{ cursor: "pointer", border: "#2E77AE 1px solid" }}
                borderRadius="16px"
                w="180px"
                h="200px"
                p="16px"
                direction="column"
                align="center"
                onClick={() => setFormData({ ...formData, gender: "male" })}
              >
                <CgBoy color={formData.gender == "male" ? "#2E77AE" : "#E0EAF5"} size="140px" pb="16px" />
                <Heading size="md" color={formData.gender == "male" ? "#2E77AE" : "#E0EAF5"}>
                  Male
                </Heading>
              </Flex>
              <Flex
                border={formData.gender == "other" ? "#2E77AE 2px solid" : "#E0EAF5 2px solid"}
                _hover={{ cursor: "pointer", border: "#2E77AE 1px solid" }}
                borderRadius="16px"
                w="180px"
                h="200px"
                p="16px"
                direction="column"
                align="center"
                onClick={() => setFormData({ ...formData, gender: "other" })}
              >
                <IoHappyOutline color={formData.gender == "other" ? "#2E77AE" : "#E0EAF5"} size="140px" pb="16px" />
                <Heading size="md" color={formData.gender == "other" ? "#2E77AE" : "#E0EAF5"}>
                  Other
                </Heading>
              </Flex>
            </Flex>
          </article>
          <article
            className="article"
            onClick={() => {
              !articles[1].isActive && handleClick(2);
            }}
            data-active={articles[1].isActive}
            data-id="2"
          >
            <Heading color="#2E77AE" paddingBottom="16px" textAlign="center">
              Skills & Experience
            </Heading>

            <Heading fontSize="xl" pt="16px" color="#2E77AE">
              Education level
            </Heading>

            <Select
              borderColor="#2E77AE"
              paddingTop="16px"
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

            <Heading fontSize="xl" pt="16px" color="#2E77AE">
              Position
            </Heading>

            <Select
              borderColor="#2E77AE"
              paddingTop="16px"
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
            <Heading fontSize="xl" pt="32px" pb="8px" color="#2E77AE">
              Seniority level
            </Heading>

            <Slider min={1} max={5} step={1} marks={marks} onChange={handleSliderChange} />

            <Heading fontSize="xl" pt="48px" color="#2E77AE">
              Skills
            </Heading>

            <MultiSelect
              id="skills"
              options={formOptions.skills}
              selectedValues={skills}
              displayValue="skill_name"
              placeholder="Select"
              onSelect={handleSkills}
              onRemove={handleSkills}
            />
          </article>
          <article
            className="article"
            onClick={() => {
              !articles[2].isActive && handleClick(3);
            }}
            data-active={articles[2].isActive}
            data-id="3"
          >
            <Heading color="#2E77AE" paddingBottom="16px" textAlign="center">
              Work experience
            </Heading>

            <div className="inputs-wrapper-center">
              <Flex direction="column" w="500px" justify="center" align="center" gap="16px">
                <Input id="logo" type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />

                <Button
                  color="white"
                  bg="#2E77AE"
                  _hover={{ color: "#0D2137", bg: "#6ba5d1" }}
                  value={formData.cv}
                  onClick={handleLogoUpload}
                >
                  Upload {formData.cv ? "new" : ""} CV
                </Button>
                {error && <Text color="red">Please upload a PDF or DOC file!</Text>}

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
            </div>

            <Flex flexFlow={"column"} align={"center"}>
              {experience.map((input, index) => (
                <div key={index} className="experience-wrapper">
                  <IconButton
                    variant="outline"
                    aria-label="remove"
                    className="remove-btn"
                    onClick={() => removeExperience(index)}
                    icon={<FiXCircle color="#2E77AE" />}
                  />

                  <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                    Company name
                  </Heading>
                  <Input
                    borderColor="#2E77AE"
                    key={index}
                    value={input.company_name}
                    id="company_name"
                    type="text"
                    onChange={(e) => handleExperience(e, index, "company_name")}
                    placeholder="Company name"
                  />

                  <div className="inputs-wrapper">
                    <div className="input-box w-50">
                      <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                        Position
                      </Heading>

                      <Select
                        borderColor="#2E77AE"
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
                    </div>

                    <div className="input-box w-50">
                      <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
                        Years
                      </Heading>
                      <Input
                        borderColor="#2E77AE"
                        id="years"
                        value={input.years}
                        type="number"
                        onChange={(e) => handleExperience(e, index, "years")}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button marginTop="32px" onClick={addInput} colorScheme="blue">
                Add company
              </Button>
            </Flex>
          </article>
          <article
            className="article"
            onClick={() => {
              !articles[3].isActive && handleClick(4);
            }}
            data-active={articles[3].isActive}
            data-id="4"
          >
            <Heading color="#2E77AE" paddingBottom="16px" textAlign="center">
              Preferences
            </Heading>

            <Flex justify="center" align="flex-start" gap="16px">
              <Box>
                <Heading fontSize="xl" pt="24px" pb="8px" color="#2E77AE">
                  Contract type
                </Heading>

                <Select
                  borderColor="#2E77AE"
                  id="contract_type_id"
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

                <Heading fontSize="xl" pt="24px" pb="8px" color="#2E77AE">
                  Minimum salary
                </Heading>
                <Input
                  borderColor="#2E77AE"
                  id="min_salary"
                  type="number"
                  value={formData.min_salary}
                  onChange={handleNumberFormChange}
                />

                <Heading fontSize="xl" pt="24px" pb="8px" color="#2E77AE">
                  Work type
                </Heading>
                <Select
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

                <Heading fontSize="xl" pt="24px" pb="8px" color="#2E77AE">
                  Max distance
                </Heading>
                <Input
                  borderColor="#2E77AE"
                  id="work_location_max_distance"
                  type="number"
                  value={formData.work_location_max_distance}
                  onChange={handleNumberFormChange}
                />

                <Heading fontSize="xl" pt="24px" pb="8px" color="#2E77AE">
                  Latitude
                </Heading>
                <Input
                  borderColor="#2E77AE"
                  id="lat"
                  type="number"
                  value={marker.lat}
                  onChange={handleNumberFormChange}
                />

                <Heading fontSize="xl" pt="24px" pb="8px" color="#2E77AE">
                  Longitude
                </Heading>
                <Input
                  borderColor="#2E77AE"
                  id="lng"
                  type="number"
                  value={marker.lng}
                  onChange={handleNumberFormChange}
                />
              </Box>

              <Box>
                <Heading fontSize="xl" pt="24px" pb="8px" color="#2E77AE" textAlign="center">
                  Click location on map to get Latitude/Longitude
                </Heading>
                <div style={{ height: "400px", width: "100%", paddingTop: "32px" }}>
                  <GoogleMapReact
                    defaultCenter={{ lat: 0, lng: 0 }}
                    defaultZoom={3}
                    onClick={handleMapClick}
                  ></GoogleMapReact>
                </div>
                <Flex paddingTop="32px" justifyContent="flex-end">
                  <Button
                    color="white"
                    bg="#FF8E2B"
                    _hover={{ color: "#0D2137", bg: "#fdb16e" }}
                    onClick={handleSubmit}
                  >
                    Finish
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </article>
        </section>
      </Box>
    </Flex>
  );
}
