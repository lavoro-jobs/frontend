import { Box, Button, Flex, Heading, IconButton, Input, Select, Text } from "@chakra-ui/react";
import MultiSelect from "multiselect-react-dropdown";
import React, { useEffect, useState, useRef } from "react";
import FormState from "@/interfaces/applicant/form-state.interface";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapClickEvent from "@/interfaces/applicant/map-click-event.interface";
import createApplicantProfile from "@/helpers/createApplicantProfile";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import Experience from "@/interfaces/shared/experience.interface";
import { useRouter } from "next/navigation";
import { CgBoy, CgGirl } from "react-icons/cg";
import { IoHappyOutline } from "react-icons/io5";
import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import { FiXCircle } from "react-icons/fi";
import Slider from "rc-slider";
import { useMapEvents } from "react-leaflet/hooks";

interface FormOptions {
  positions?: [{ id: number; position_name: string }];
  skills?: [{ id: number; skill_name: string }];
  education?: [{ id: number; education_level: string }];
  contract_types?: [{ id: number; contract_type: string }];
  work_types?: [{ id: number; work_type: string }];
}

export default function ApplicantProfileSetup() {
  const router = useRouter();
  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [skills, setSkills] = useState<{ id: number; skill_name: string }[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [idArticle, setIdArticle] = useState(1);
  const [btn, setBtn] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
  const [formData, setFormData] = useState<FormState>({
    first_name: "",
    last_name: "",
    education_level_id: undefined,
    age: undefined,
    gender: "",
    skill_ids: [],
    cv: "",
    work_type_id: undefined,
    seniority_level: undefined,
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
      const newFormData = { ...formData, seniority_level: value };
      setFormData(newFormData);
    }
  };

  const handleSkills = (selectedList: [{ id: number; skill_name: string }]) => {
    const skillIdArray = selectedList.map((item) => item.id);
    const newFormData = { ...formData, skill_ids: skillIdArray };
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

  const handleLogoUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf", ,];

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  const mainStyle = {
    "--x": `${mousePosition.x}px`,
    "--y": `${mousePosition.y}px`,
  };

  const handleSubmit = async () => {
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
      <Heading p="0 32px" marginBottom="32px" maxW="512px" textAlign="center" color="#fff">
        <Text fontSize={{ base: "25px", sm: "30px", md: "40px" }} as="span">
          Welcome! Answer questions to get your job matches.
        </Text>
      </Heading>

      <Box position="relative" id="card" justifyContent="center">
        <Button
          borderRadius="20px"
          display={idArticle !== 4 && btn ? "" : "none"}
          position="absolute"
          className="nxt-prev-btn prev-btn"
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
          borderRadius="20px"
          display={idArticle !== 1 && btn ? "" : "none"}
          position="absolute"
          className="nxt-prev-btn next-btn"
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
            <Heading color="#2E77AE" textAlign="center">
              <Text fontSize={{ base: "30px", sm: "30px", md: "40px" }} as="span">
                Personal information
              </Text>
            </Heading>

            <Heading fontSize="xl" pt="16px" color="#2E77AE">
              <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                First name
              </Text>
            </Heading>
            <Input borderColor="#2E77AE" id="first_name" value={formData.first_name} onChange={handleFormChange} />

            <Heading fontSize="xl" pt="16px" color="#2E77AE">
              <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                Last name
              </Text>
            </Heading>
            <Input borderColor="#2E77AE" id="last_name" value={formData.last_name} onChange={handleFormChange} />

            <Flex direction="column" align="center">
              <Heading fontSize="xl" pt="16px" color="#2E77AE">
                <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                  Age
                </Text>
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

            <Heading fontSize="xl" pt="16px" color="#2E77AE">
              <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                Gender
              </Text>
            </Heading>
            <Flex justify="center" gap="16px" className="gender-icons">
              <Flex
                border={formData.gender == "female" ? "#2E77AE 2px solid" : "#E0EAF5 2px solid"}
                _hover={{ cursor: "pointer", border: "#2E77AE 1px solid" }}
                borderRadius="16px"
                w={{ base: "100px", md: "180px" }}
                h={{ base: "100px", md: "200px" }}
                p="16px"
                direction="column"
                align="center"
                onClick={() => setFormData({ ...formData, gender: "female" })}
              >
                <CgGirl color={formData.gender == "female" ? "#2E77AE" : "#E0EAF5"} size="140px" pb="16px" />
                <Heading size="md" color={formData.gender == "female" ? "#2E77AE" : "#E0EAF5"}>
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Female
                  </Text>
                </Heading>
              </Flex>
              <Flex
                border={formData.gender == "male" ? "#2E77AE 2px solid" : "#E0EAF5 2px solid"}
                _hover={{ cursor: "pointer", border: "#2E77AE 1px solid" }}
                borderRadius="16px"
                w={{ base: "100px", md: "180px" }}
                h={{ base: "100px", md: "200px" }}
                p="16px"
                direction="column"
                align="center"
                onClick={() => setFormData({ ...formData, gender: "male" })}
              >
                <CgBoy color={formData.gender == "male" ? "#2E77AE" : "#E0EAF5"} size="140px" pb="16px" />
                <Heading size="md" color={formData.gender == "male" ? "#2E77AE" : "#E0EAF5"}>
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Male
                  </Text>
                </Heading>
              </Flex>
              <Flex
                border={formData.gender == "other" ? "#2E77AE 2px solid" : "#E0EAF5 2px solid"}
                _hover={{ cursor: "pointer", border: "#2E77AE 1px solid" }}
                borderRadius="16px"
                w={{ base: "100px", md: "180px" }}
                h={{ base: "100px", md: "200px" }}
                p="16px"
                direction="column"
                align="center"
                onClick={() => setFormData({ ...formData, gender: "other" })}
              >
                <IoHappyOutline color={formData.gender == "other" ? "#2E77AE" : "#E0EAF5"} size="140px" pb="16px" />
                <Heading size="md" color={formData.gender == "other" ? "#2E77AE" : "#E0EAF5"}>
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Other
                  </Text>
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
            <Heading color="#2E77AE" textAlign="center">
              <Text fontSize={{ base: "30px", sm: "30px", md: "40px" }} as="span">
                Skills & Experience
              </Text>
            </Heading>

            <Heading fontSize="xl" pt="16px" color="#2E77AE">
              <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                Education level
              </Text>
            </Heading>

            <Select
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

            <Heading fontSize="xl" color="#2E77AE">
              <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                Position
              </Text>
            </Heading>

            <Select
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
            <Heading fontSize="xl" pt="32px" pb="8px" color="#2E77AE">
              <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                Seniority level
              </Text>
            </Heading>

            <Slider min={1} max={5} step={1} marks={marks} onChange={handleSliderChange} />

            <Heading fontSize="xl" pt="48px" color="#2E77AE">
              <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                Skills
              </Text>
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
            <Heading color="#2E77AE" pb="16px" textAlign="center">
              <Text fontSize={{ base: "30px", sm: "30px", md: "40px" }} as="span">
                Work experience
              </Text>
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

                  <Heading fontSize="xl" pt="16px" color="#2E77AE">
                    <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                      Company name
                    </Text>
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
                      <Heading fontSize="xl" pt="16px" color="#2E77AE">
                        <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                          Position
                        </Text>
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
                      <Heading fontSize="xl" pt="16px" color="#2E77AE">
                        <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                          Years
                        </Text>
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
            <Heading color="#2E77AE" textAlign="center">
              <Text fontSize={{ base: "30px", sm: "30px", md: "40px" }} as="span">
                Preferences
              </Text>
            </Heading>

            <Flex className="map-container" justify="center" align="flex-start" gap="16px">
              <Box>
                <Heading fontSize="xl" pt="16px" color="#2E77AE">
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Contract type
                  </Text>
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

                <Heading fontSize="xl" pt="16px" color="#2E77AE">
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Min salary (€)
                  </Text>
                </Heading>
                {formData.contract_type_id == 4 && (
                  <Text color="#2E77AE" pl="2px">
                    by month
                  </Text>
                )}
                {(formData.contract_type_id == 1 ||
                  formData.contract_type_id == 2 ||
                  formData.contract_type_id == 3) && (
                  <Text color="#2E77AE" pl="2px">
                    by hour
                  </Text>
                )}
                <Input
                  borderColor="#2E77AE"
                  id="min_salary"
                  type="number"
                  value={formData.min_salary}
                  onChange={handleNumberFormChange}
                />

                <Heading fontSize="xl" pt="16px" color="#2E77AE">
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Work type
                  </Text>
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

                <Heading fontSize="xl" pt="16px" color="#2E77AE">
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Max distance
                  </Text>
                </Heading>
                <Input
                  borderColor="#2E77AE"
                  id="work_location_max_distance"
                  type="number"
                  value={formData.work_location_max_distance}
                  onChange={handleNumberFormChange}
                />

                <Heading fontSize="xl" pt="16px" color="#2E77AE">
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Latitude
                  </Text>
                </Heading>
                <Input
                  borderColor="#2E77AE"
                  id="lat"
                  type="number"
                  value={marker.lat}
                  onChange={handleNumberFormChange}
                />

                <Heading fontSize="xl" pt="16px" color="#2E77AE">
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Longitude
                  </Text>
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
                <Heading fontSize="xl" pt="16px" color="#2E77AE" textAlign="center">
                  <Text fontSize={{ base: "18px", sm: "18px", md: "20px" }} as="span">
                    Click location on map to get Latitude/Longitude
                  </Text>
                </Heading>
                <div style={{ height: "400px", width: "100%", paddingTop: "32px", marginBottom: "32px" }}>
                  <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
                    <LocationFinderDummy />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {clickedLatLng && (
                      <Marker position={clickedLatLng}>
                        <Popup>
                          Latitude: {clickedLatLng.lat}
                          <br />
                          Longitude: {clickedLatLng.lng}
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
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
