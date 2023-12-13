import getAllCatalogs from "@/helpers/getAllCatalogs";
import FormState from "@/interfaces/job-posts/form-state.interface";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Progress,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  Wrap,
  useSteps,
} from "@chakra-ui/react";
import Multiselect from "multiselect-react-dropdown";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import MapClickEvent from "@/interfaces/applicant/map-click-event";
import { useRouter } from "next/navigation";
import assignColleague from "@/helpers/assignColleague";
import createJobPost from "@/helpers/createJobPost";

interface FormOptions {
  positions?: [{ id: number; position_name: string }];
  education?: [{ id: number; education_level: string }];
  skills?: [{ id: number; skill_name: string }];
  work_types?: [{ id: number; work_type: string }];
  contract_types?: [{ id: number; contract_type: string }];
}

export default function CreateJobPost() {
  const router = useRouter();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);

  const [formOptions, setFormOptions] = useState<FormOptions>({});
  const [skills, setSkills] = useState<{ id: number; skill_name: string }[]>([]);

  const [marker, setMarker] = useState({ lat: 0, lng: 0 });

  const [formData, setFormData] = useState<FormState>({
    position_id: undefined,
    education_level_id: undefined,
    seniority_level: 0,
    skill_ids: [],
    work_type_id: undefined,
    contract_type_id: undefined,
    work_location: {
      longitude: undefined,
      latitude: undefined,
    },
    salary: undefined,
    description: undefined,
  });

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  const addEmails = (emailsToAdd: string[]) => {
    const validatedEmails = emailsToAdd
      .map((e) => e.trim())
      .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !emails.includes(email));

    setEmails((prevEmails) => [...prevEmails, ...validatedEmails]);
    setInputEmail("");
  };

  const removeEmail = (index: number) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ",", " "].includes(e.key)) {
      e.preventDefault();
      addEmails([inputEmail]);
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
    const newFormData = { ...formData, skill_ids: skillIdArray };
    setSkills(selectedList);
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    const res = await createJobPost(formData);
    if (res == 201) {
      emails.map((email) => {
        assignColleague(email);
      });
      router.push("/dashboard");
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
              id="skills"
              options={formOptions.skills}
              selectedValues={skills}
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
              </div>

              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Work type
                </Text>

                <Select
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
            <div style={{ height: "400px", width: "100%", paddingTop: "32px" }}>
              <GoogleMapReact defaultCenter={{ lat: 0, lng: 0 }} defaultZoom={3} onClick={handleMapClick} />
            </div>
          </>
        )}
        {activeStep === 2 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Job post description and salary
            </Text>

            <Text fontSize="lg" paddingTop="16px" textAlign="center">
              Salary
            </Text>
            <Input id="min_salary" type="number" value={formData.salary} onChange={handleNumberFormChange} />

            <Text fontSize="lg" paddingTop="16px" textAlign="center">
              Description
            </Text>
            <Textarea id="description" value={formData.description} onChange={handleFormChange} />
          </>
        )}
        {activeStep === 3 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Assign colleagues
            </Text>
            <Wrap>
              {emails.map((email, index) => (
                <Tag key={index} borderRadius="full" variant="solid" colorScheme="blue">
                  <TagLabel>{email}</TagLabel>
                  <TagCloseButton onClick={() => removeEmail(index)} />
                </Tag>
              ))}
            </Wrap>
            <Input
              id="email"
              type="email"
              placeholder="Enter emails"
              marginTop="16px"
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
              value={inputEmail}
            />
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
