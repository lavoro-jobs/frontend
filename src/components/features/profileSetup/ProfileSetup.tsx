import React from "react";

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
	Radio,
	RadioGroup,
	Select,
	Text,
	VStack,
	useSteps,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export default function ProfileSetup() {
	const [status, setStatus] = useState("highSchool");
	const [degree, setDegree] = useState("associate");
	const [uniName, setUniName] = useState("");
	const [uniYear, setUniYear] = useState(3);
	const [age, setAge] = useState(25);
	const [gender, setGender] = useState("male");

	const handleDegreeChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setDegree(e.target.value);
	};
	const handleUniNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUniName(e.target.value);
	};
	const handleUniYearChange = (
		valueAsString: string,
		valueAsNumber: number
	) => {
		setUniYear(valueAsNumber);
	};
	const handleAgeChange = (valueAsString: string, valueAsNumber: number) => {
		setAge(valueAsNumber);
	};
	const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setGender(e.target.value);
	};

	const handleSubmit = () => {
		const data = {
			status,
			degree,
			uniName,
			uniYear,
			age,
			gender,
		};

		console.log(data);
	};

	const steps = [
		{ title: "Status" },
		{ title: "Age" },
		{ title: "Gender" },
		{ title: "Experience" },
		{ title: "Knowledge" },
		{ title: "Preferences" },
	];
	const handleNext = () => {
		goToNext();
	};
	const handlePrevious = () => {
		goToPrevious();
	};
	const { activeStep, goToNext, goToPrevious } = useSteps({
		index: 0,
		count: steps.length,
	});
	const progressPercent = (activeStep / (steps.length - 1)) * 100;
	return (
		<Flex
			minH="100vh"
			align="center"
			justify="center"
			direction="column"
			bg="#E0EAF5"
		>
			<Heading
				marginBottom="32px"
				maxW="512px"
				textAlign="center"
				color="#0D2137"
			>
				Welcome! Answer questions to get your job matches.
			</Heading>
			<Box
				border="solid"
				borderRadius="16px"
				borderColor="#E0EAF5"
				p="64px"
				bg="white"
			>
				<Progress value={progressPercent} w="512px" height="4px" />

				{activeStep === 0 && (
					<>
						<Text
							fontSize="lg"
							paddingTop="32px"
							textAlign="center"
						>
							STATUS
						</Text>
						<RadioGroup
							paddingTop="16px"
							value={status}
							onChange={setStatus}
						>
							<VStack gap="16px" color="#0D2137">
								<Radio value="highSchool">
									Currently in High School
								</Radio>
								<Radio value="inUni">
									Currently in University
								</Radio>
								<Radio value="finishedUni">
									Finished University
								</Radio>
							</VStack>

							{status === "inUni" && (
								<>
									<Divider paddingTop="16px" />
									<Text
										fontSize="lg"
										paddingTop="16px"
										textAlign="center"
									>
										UNIVERSITY NAME
									</Text>
									<Input
										value={uniName}
										onChange={handleUniNameChange}
									/>

									<Text
										fontSize="lg"
										paddingTop="16px"
										textAlign="center"
									>
										CURRENT YEAR
									</Text>
									<NumberInput
										value={uniYear}
										onChange={handleUniYearChange}
										min={1}
										max={5}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper>
												+
											</NumberIncrementStepper>
											<NumberDecrementStepper>
												-
											</NumberDecrementStepper>
										</NumberInputStepper>
									</NumberInput>
								</>
							)}

							{status === "finishedUni" && (
								<>
									<Divider paddingTop="16px" />
									<Text
										fontSize="lg"
										paddingTop="16px"
										textAlign="center"
									>
										UNIVERSITY NAME
									</Text>
									<Input
										value={uniName}
										onChange={handleUniNameChange}
									/>

									<Text
										fontSize="lg"
										paddingTop="16px"
										textAlign="center"
									>
										DEGREE
									</Text>
									<Select
										value={degree}
										onChange={handleDegreeChange}
									>
										<option value="associate">
											Associate degree
										</option>
										<option value="bachelors">
											Bachelors degree
										</option>
										<option value="masters">
											Masters degree
										</option>
										<option value="doctoral">
											Doctoral degree
										</option>
									</Select>
								</>
							)}
						</RadioGroup>
					</>
				)}
				{activeStep === 1 && (
					<>
						<Text
							fontSize="lg"
							paddingTop="32px"
							textAlign="center"
						>
							AGE
						</Text>
						<NumberInput
							value={age}
							onChange={handleAgeChange}
							min={16}
							max={99}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper>
									+
								</NumberIncrementStepper>
								<NumberDecrementStepper>
									-
								</NumberDecrementStepper>
							</NumberInputStepper>
						</NumberInput>

						<Text
							fontSize="lg"
							paddingTop="16px"
							textAlign="center"
						>
							GENDER
						</Text>
						<Select value={gender} onChange={handleGenderChange}>
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
							onClick={handlePrevious}
						>
							Back
						</Button>
					)}
					{activeStep < steps.length - 1 && (
						<Button
							color="white"
							bg="#2E77AE"
							_hover={{ color: "#0D2137", bg: "#6ba5d1" }}
							onClick={handleNext}
						>
							Next
						</Button>
					)}
					{activeStep === steps.length - 1 && (
						<Button
							color="white"
							bg="#FF8E2B"
							_hover={{ color: "#0D2137", bg: "#fdb16e" }}
							onClick={handleSubmit}
						>
							Finish
						</Button>
					)}
				</Flex>
			</Box>
		</Flex>
	);
}
