import getAllCatalogs from "@/helpers/getAllCatalogs";
import FormState from "@/interfaces/job-posts/form-state.interface";
import { Box, Button, Flex, Heading, Input, Progress, Select, Text, Textarea, useSteps } from "@chakra-ui/react";
import Multiselect from "multiselect-react-dropdown";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import createJobPost from "@/helpers/createJobPost";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import Skill from "@/interfaces/shared/skill";

interface FormOptions {
  positions?: [{ id: number; position_name: string }];
  education?: [{ id: number; education_level: string }];
  skills?: [{ id: number; skill_name: string }];
  work_types?: [{ id: number; work_type: string }];
  contract_types?: [{ id: number; contract_type: string }];
}

export default function CreateJobPost() {
  const router = useRouter();

  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [skill, setSkill] = useState<Skill[]>([]);

  const [marker, setMarker] = useState({ lat: 0, lng: 0 });

  const [formData, setFormData] = useState<FormState>({
    id: undefined,
    description: undefined,
    skills: [],
    seniority_level: undefined,
    work_location: {
      longitude: undefined,
      latitude: undefined,
    },
    salary_min: undefined,
    salary_max: undefined,
    end_date: undefined,
    assignees: undefined,
    education_level_id: undefined,
    position_id: undefined,
    contract_type_id: undefined,
    work_type_id: undefined,
  });

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  const [clickedLatLng, setClickedLatLng] = useState(null);

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e: any) {
        setMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
        const newFormData = {
          ...formData,
          work_location: {
            longitude: e.latlng.lng,
            latitude: e.latlng.lat,
          },
        };
        setFormData(newFormData);
      },
    });
    return null;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const createPostData = async () => {
    return {
      position_id: formData.position_id,
      description: formData.description,
      education_level_id: formData.education_level_id,
      skill_ids: formData.skills?.map((skill) => skill.id).filter((id) => typeof id === "number") as number[],
      work_type_id: formData.work_type_id,
      seniority_level: formData.seniority_level,
      work_location: {
        longitude: formData.work_location?.longitude,
        latitude: formData.work_location?.latitude,
      },
      contract_type_id: formData.contract_type_id,
      salary_min: formData.salary_min,
      salary_max: formData.salary_max,
      end_date: formData.end_date ? formData.end_date + ":00.000Z" : "2025-06-07T23:59:59.000Z",
      assignees: formData.assignees,
    };
  };

  const handleSubmit = async () => {
    const postData = await createPostData();
    const res = await createJobPost(postData);
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

  const steps = [
    { title: "Skills" },
    { title: "Work preferences" },
    { title: "Salary & Description" },
    { title: "Assign colleagues" },
  ];

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });
  const progressPercent = (activeStep / (steps.length - 1)) * 100;

  return (
    <Flex minH="100vh" align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
      <Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
        Answer questions to create your job post.
      </Heading>
      <Box maxW="800px" minW="650px" border="solid" borderRadius="16px" borderColor="#E0EAF5" p="64px" bg="white">
        <Progress value={progressPercent} w="100%" height="4px" />
        {activeStep === 0 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Skills
            </Text>

            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Education level
                </Text>
                <Select
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
              </div>

              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Position
                </Text>
                <Select
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
              </div>
            </div>

            <Text fontSize="lg" paddingTop="32px" textAlign="center">
              Seniority level
            </Text>
            <Slider min={1} max={5} step={1} marks={marks} onChange={handleSliderChange} />

            <Text fontSize="lg" paddingTop="48px" textAlign="center">
              Skills
            </Text>
            <Multiselect
              options={formOptions.skills}
              selectedValues={skill}
              displayValue="skill_name"
              placeholder="Select"
              onSelect={handleSkills}
              onRemove={handleSkills}
            />
          </>
        )}
        {activeStep === 1 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Work preferences
            </Text>
            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Contract type
                </Text>
                <Select
                  id="contract_type_id"
                  value={formData.contract_type_id}
                  onChange={handleFormChange}
                  placeholder="Select"
                >
                  {formOptions &&
                    formOptions.contract_types?.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.contract_type}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Work type
                </Text>
                <Select
                  id="work_type_id"
                  value={formData.work_type_id}
                  onChange={handleFormChange}
                  placeholder="Select"
                >
                  {formOptions &&
                    formOptions.work_types?.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.work_type}
                      </option>
                    ))}
                </Select>
              </div>
            </div>

            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Latitude
                </Text>
                <Input id="lat" type="number" value={marker.lat} onChange={handleNumberFormChange} />
              </div>
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Longitude
                </Text>
                <Input id="lng" type="number" value={marker.lng} onChange={handleNumberFormChange} />
              </div>
            </div>
            <Text fontSize="lg" paddingTop="32px" textAlign="center">
              Click location on map to get Latitude/Longitude
            </Text>

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
          </>
        )}
        {activeStep === 2 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Job post description and salary
            </Text>
            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Min Salary
                </Text>
                <Input id="salary_min" type="number" value={formData.salary_min} onChange={handleFormChange} />
              </div>
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Max Salary
                </Text>
                <Input id="salary_max" type="number" value={formData.salary_max} onChange={handleFormChange} />
              </div>
            </div>
            <Text fontSize="lg" paddingTop="16px" textAlign="center">
              Description
            </Text>
            <Textarea id="description" value={formData.description} onChange={handleFormChange} />
            <Text fontSize="lg" paddingTop="16px" textAlign="center">
              End Date
            </Text>
            <div className="inputs-wrapper-center">
              <Input id="end_date" type="datetime-local" value={formData.end_date} onChange={handleFormChange} />
            </div>
          </>
        )}
        {activeStep === 3 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Assign colleagues
            </Text>
          </>
        )}

        <Flex paddingTop="32px" justifyContent="flex-end">
          {activeStep > 0 && activeStep < steps.length && (
            <Button
              color="white"
              bg="#2E77AE"
              _hover={{ color: "#0D2137", bg: "#6ba5d1" }}
              marginRight="8px"
              onClick={() => goToPrevious()}
            >
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button color="white" bg="#2E77AE" _hover={{ color: "#0D2137", bg: "#6ba5d1" }} onClick={() => goToNext()}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button color="white" bg="#FF8E2B" _hover={{ color: "#0D2137", bg: "#fdb16e" }} onClick={handleSubmit}>
              Finish
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
