import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Select,
  Text,
  VStack,
  useSteps,
} from "@chakra-ui/react"
import { useState } from "react"

interface FormState {
  status: "highSchool" | "inUni" | "finishedUni"
  degree: "associate" | "bachelors" | "masters" | "doctoral"
  uniName: string
  uniYear: number
  age: number
  gender: "male" | "female"
}

interface PostData {
  status: "highSchool" | "inUni" | "finishedUni"
  degree: "associate" | "bachelors" | "masters" | "doctoral"
  uniName: string
  uniYear: number
  age: number
  gender: "male" | "female"
}

export default function ProfileSetup() {
  const [formData, setFormData] = useState<FormState>({
    status: "highSchool",
    degree: "associate",
    uniName: "",
    uniYear: 3,
    age: 25,
    gender: "male",
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    setFormData(newFormData)
  }

  const handleUniYearChange = (valueAsString: string, valueAsNumber: number) => {
    setFormData((formData) => ({
      ...formData,
      uniYear: valueAsNumber,
    }))
  }
  const handleAgeChange = (valueAsString: string, valueAsNumber: number) => {
    setFormData((formData) => ({
      ...formData,
      age: valueAsNumber,
    }))
  }

  const handleSubmit = async () => {
    const payload: PostData = {
      status: formData.status,
      degree: formData.degree,
      uniName: formData.uniName,
      uniYear: formData.uniYear,
      age: formData.age,
      gender: formData.gender,
    }

    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  }

  const steps = [
    { title: "Status" },
    { title: "Age" },
    { title: "Gender" },
    { title: "Experience" },
    { title: "Knowledge" },
    { title: "Preferences" },
  ]
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  })
  const progressPercent = (activeStep / (steps.length - 1)) * 100

  return (
    <Flex minH="100vh" align="center" justify="center" direction="column" bg="#E0EAF5">
      <Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
        Welcome! Answer questions to get your job matches.
      </Heading>
      <Box border="solid" borderRadius="16px" borderColor="#E0EAF5" p="64px" bg="white">
        <Progress value={progressPercent} w="512px" height="4px" />

        {activeStep === 0 && (
          <>
            <Text fontSize="lg" paddingTop="32px" textAlign="center">
              STATUS
            </Text>
            <Select paddingTop="16px" id="status" value={formData.status} onChange={handleFormChange}>
              <option value="highSchool">Currently in High School</option>
              <option value="inUni">Currently in University</option>
              <option value="finishedUni">Finished University</option>
            </Select>
            {formData.status === "inUni" && (
              <>
                <Divider paddingTop="16px" />
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  UNIVERSITY NAME
                </Text>
                <Input id="uniName" value={formData.uniName} onChange={handleFormChange} />

                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  CURRENT YEAR
                </Text>
                <NumberInput id="uniYear" value={formData.uniYear} onChange={handleUniYearChange} min={1} max={5}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper>+</NumberIncrementStepper>
                    <NumberDecrementStepper>-</NumberDecrementStepper>
                  </NumberInputStepper>
                </NumberInput>
              </>
            )}

            {formData.status === "finishedUni" && (
              <>
                <Divider paddingTop="16px" />
                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  UNIVERSITY NAME
                </Text>
                <Input id="uniName" value={formData.uniName} onChange={handleFormChange} />

                <Text fontSize="lg" paddingTop="16px" textAlign="center">
                  DEGREE
                </Text>
                <Select value={formData.degree} onChange={handleFormChange} id="degree">
                  <option value="associate">Associate degree</option>
                  <option value="bachelors">Bachelors degree</option>
                  <option value="masters">Masters degree</option>
                  <option value="doctoral">Doctoral degree</option>
                </Select>
              </>
            )}
          </>
        )}
        {activeStep === 1 && (
          <>
            <Text fontSize="lg" paddingTop="32px" textAlign="center">
              AGE
            </Text>
            <NumberInput id="age" value={formData.age} onChange={handleAgeChange} min={16} max={99}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper>+</NumberIncrementStepper>
                <NumberDecrementStepper>-</NumberDecrementStepper>
              </NumberInputStepper>
            </NumberInput>

            <Text fontSize="lg" paddingTop="16px" textAlign="center">
              GENDER
            </Text>
            <Select id="gender" value={formData.gender} onChange={handleFormChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </>
        )}
        {activeStep === 2 && (
          /*experience*/
          <VStack paddingTop="32px" gap="16px">
            <Input />
          </VStack>
        )}
        {activeStep === 3 && (
          /*knowledge*/
          <VStack paddingTop="32px" gap="16px">
            <Input />
          </VStack>
        )}
        {activeStep === 4 && (
          /*preferences*/
          <VStack paddingTop="32px" gap="16px">
            <Input />
          </VStack>
        )}

        <Flex paddingTop="16px" justifyContent="flex-end">
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
  )
}
