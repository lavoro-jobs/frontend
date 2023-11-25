import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Progress,
  Select,
  Text,
  useSteps,
} from "@chakra-ui/react"
import MultiSelect from "multiselect-react-dropdown"
import React, {useEffect, useState} from "react"
import FormState from "@/interfaces/form-state.interface"
import GoogleMapReact from 'google-map-react';
import MapClickEvent from "@/interfaces/map-click-event";
import createApplicantProfile from "@/helpers/createApplicantProfile";

interface FormOptions {
  positions?: [{id: number, position_name: string}]
  skills?: [{id: number, skill_name: string}]
  education?: [{id: number, education_level: string}]
  contract_types?: [{id: number, contract_type: string}]
  work_types?: [{id: number, work_type: string}]
}

export default function ApplicantProfileSetup() {
  const [formData, setFormData] = useState<FormState>({
    first_name: '',
    last_name: '',
    education_level_id: undefined,
    age: undefined,
    gender: '',
    skill_id_list: [],
    cv: '',
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

  const [marker, setMarker] = useState({lat: 0, lng: 0});

  const [skills, setSkills] = useState<{id: number, skill_name: string}[]>([]);
  
  const getAllCatalogs = async ()=> {
    fetch("http://localhost:8000/api/v1/config/get_all_catalogs")
      .then((res) => res.json())
      .then((json) => {
        setFormOptions(json);
      });
  }

  useEffect(()=> {
    getAllCatalogs()
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    setFormData(newFormData)
  }

  const handleNumberFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: +e.target.value }
    setFormData(newFormData)
  }

  const handleSkills = (selectedList: [{id: number, skill_name: string}], selectedItem: {id: number, skill_name: string}) => {
    const skillIdArray = selectedList.map(item => item.id);
    const newFormData = { ...formData, skill_id_list: skillIdArray }
    setSkills(selectedList)
    setFormData(newFormData)
  };

  const handleMapClick = ({ x, y, lat, lng, event }: MapClickEvent) => {
    setMarker({lat, lng})
    const newFormData = { ...formData, home_location: {
      longitude: lng,
      latitude: lat
    }}
    setFormData(newFormData)
  };

  const handleSubmit = async () => {
    const payload = formData;

    createApplicantProfile(formData)
    const response = await fetch("http://localhost:8000/api/v1/applicant/create_applicant_profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  }

  const steps = [
    { title: "Personal info" },
    { title: "Education & skills" },
    { title: "Preferences" }
  ]
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  })
  const progressPercent = (activeStep / (steps.length - 1)) * 100

  return (
    <Flex minH="100vh" align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
      <Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
        Welcome! Answer questions to get your job matches.
      </Heading>
      <Box maxW="800px" minW="650px" border="solid" borderRadius="16px" borderColor="#E0EAF5" p="64px" bg="white">
        <Progress value={progressPercent} w="100%" height="4px" />
        {activeStep === 0 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Personal information
            </Text>

            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  First name
                </Text>
                <Input id="first_name" value={formData.first_name} onChange={handleFormChange} />
              </div>

              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Last name
                </Text>
                <Input id="last_name" value={formData.last_name} onChange={handleFormChange} />
              </div>
            </div>

            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Age
                </Text>
                <Input id="age" type="number" value={formData.age} onChange={handleNumberFormChange} />
              </div>
              
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Gender
                </Text>
                <Select id="gender" value={formData.gender} onChange={handleFormChange} placeholder="Select">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>
            </div>
          </>
        )}
        {activeStep === 1 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Skills & experience
            </Text>

            <Text fontSize="lg" paddingTop="16px" textAlign="center">
              Education level
            </Text>

            <Select paddingTop="16px" id="education_level_id" value={formData.education_level_id} onChange={handleNumberFormChange} placeholder="Select">
              {formOptions && formOptions.education?.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.education_level}
                </option>
              ))}
            </Select>


            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Position
                </Text>

                <Select paddingTop="16px" id="position_id" value={formData.position_id} onChange={handleNumberFormChange} placeholder="Select">
                  {formOptions && formOptions.positions?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.position_name}
                    </option>
                  ))}
                </Select>  
              </div>
              
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Seniority level
                </Text>

                <Select paddingTop="16px" id="seniority_level_id" value={formData.seniority_level_id} onChange={handleNumberFormChange} placeholder="Select">
                  <option value="0">Junior (L1)</option>
                  <option value="1">Junior (L2)</option>
                  <option value="2">Junior (L3)</option>
                  <option value="3">Mid</option>
                  <option value="4">Senior</option>
                </Select>
              </div>
            </div>

            <Text fontSize="lg" paddingTop="16px" textAlign="center">
              Skills
            </Text>

            <MultiSelect
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
        {activeStep === 2 && (
          <>
            <Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
              Preferences
            </Text>

            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Contract type
                </Text>

                <Select id="contract_type_id" value={formData.contract_type_id} onChange={handleNumberFormChange} placeholder="Select">
                  {formOptions && formOptions.contract_types?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.contract_type}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Minimum salary
                </Text>  
                <Input id="min_salary" type="number" value={formData.min_salary} onChange={handleNumberFormChange} />
              </div>
            </div>

            
            <div className="inputs-wrapper">
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Work type
                </Text>
                
                <Select id="work_type_id" value={formData.work_type_id} onChange={handleNumberFormChange} placeholder="Select">
                  {formOptions && formOptions.work_types?.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.work_type}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div className="input-box w-50">
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  Max distance
                </Text>  
                <Input id="work_location_max_distance" type="number" value={formData.work_location_max_distance} onChange={handleNumberFormChange} />
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
            <div style={{ height: '400px', width: '100%', paddingTop: "32px"}}>
              <GoogleMapReact
                defaultCenter={{ lat: 0, lng: 0 }}
                defaultZoom={3}
                onClick={handleMapClick}
              >
              </GoogleMapReact>
            </div>

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
            <Button
            color="white" bg="#2E77AE" _hover={{ color: "#0D2137", bg: "#6ba5d1" }} onClick={() => goToNext()}>
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
  )
}
