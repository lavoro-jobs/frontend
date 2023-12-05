import React, { useEffect, useState } from "react";
import Sidenav from "../dashboard/Sidenav";
import { Avatar, Box, Button, Flex, IconButton, Input, Select, Text } from "@chakra-ui/react";
import Link from "next/link";
import FormState from "@/interfaces/applicant/form-state.interface";
import Experience from "@/interfaces/shared/experience";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import GoogleMapReact from "google-map-react";
import MapClickEvent from "@/interfaces/applicant/map-click-event";
import updateApplicantProfile from "@/helpers/updateApplicantProfile";
import { useRouter } from "next/navigation";
import Multiselect from "multiselect-react-dropdown";
import Slider from "rc-slider";
import { FiXCircle } from "react-icons/fi";

interface FormOptions {
	positions?: [{ id: number; position_name: string }];
	skills?: [{ id: number; skill_name: string }];
	education?: [{ id: number; education_level: string }];
	contract_types?: [{ id: number; contract_type: string }];
	work_types?: [{ id: number; work_type: string }];
}

export default function ApplicantProfileUpdate({
	first_name,
	last_name,
	age,
	gender,
	work_location_max_distance,
	min_salary,
	seniority_level_id,
	home_location,
	experiences,
}: FormState) {
	const router = useRouter();

	const [formOptions, setFormOptions] = useState<FormOptions>({});

	const [marker, setMarker] = useState({ lat: 0, lng: 0 });

	const [skills, setSkills] = useState<{ id: number; skill_name: string }[]>([]);

	const [experience, setExperience] = useState<Experience[]>(experiences ? experiences : []);

	const [formData, setFormData] = useState<FormState>({
		first_name: first_name,
		last_name: last_name,
		education_level_id: undefined,
		age: age,
		gender: gender,
		skill_id_list: [],
		cv: "",
		work_type_id: undefined,
		seniority_level_id: seniority_level_id,
		position_id: undefined,
		home_location: {
			longitude: home_location?.longitude,
			latitude: home_location?.latitude,
		},
		work_location_max_distance: work_location_max_distance,
		contract_type_id: undefined,
		min_salary: min_salary,
		experiences: experience,
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

	const handleSubmit = async () => {
		const response = await updateApplicantProfile(formData);
		if (response == 201) {
			router.push("/profile");
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
			<Avatar size="2xl"></Avatar>
			<div className="inputs-wrapper">
				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						First name
					</Text>
					<Input
						borderColor="black"
						backgroundColor="gray.100"
						id="first_name"
						value={formData.first_name}
						onChange={handleFormChange}
					/>
				</div>

				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Last name
					</Text>
					<Input
						borderColor="black"
						backgroundColor="gray.100"
						id="last_name"
						value={formData.last_name}
						onChange={handleFormChange}
					/>
				</div>
			</div>

			<div className="inputs-wrapper">
				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Age
					</Text>
					<Input
						borderColor="black"
						backgroundColor="gray.100"
						id="age"
						type="number"
						value={formData.age}
						onChange={handleNumberFormChange}
					/>
				</div>

				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Gender
					</Text>
					<Select
						borderColor="black"
						backgroundColor="gray.100"
						id="gender"
						value={formData.gender}
						onChange={handleFormChange}
						placeholder="Select"
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</Select>
				</div>
			</div>
			<Box mt="32px" border="1px solid #2E77AE" width="80%" />

			<div className="inputs-wrapper">
				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Education level
					</Text>

					<Select
						borderColor="black"
						backgroundColor="gray.100"
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
						borderColor="black"
						backgroundColor="gray.100"
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

			<Text fontSize="lg" paddingTop="16px" textAlign="center">
				Seniority level
			</Text>

			<Slider min={1} max={5} step={1} marks={marks} onChange={handleSliderChange} />

			<Text fontSize="lg" paddingTop="16px" textAlign="center" mt="16px">
				Skills
			</Text>

			<Multiselect
				options={formOptions.skills}
				selectedValues={skills}
				displayValue="skill_name"
				placeholder="Select"
				onSelect={handleSkills}
				onRemove={handleSkills}
			/>

			<Box mt="32px" border="1px solid #2E77AE" width="80%" />

			<div className="inputs-wrapper">
				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Contract type
					</Text>

					<Select
						id="contract_type_id"
						borderColor="black"
						backgroundColor="gray.100"
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
						Minimum salary
					</Text>
					<Input
						borderColor="black"
						backgroundColor="gray.100"
						id="min_salary"
						type="number"
						value={formData.min_salary}
						onChange={handleNumberFormChange}
					/>
				</div>
			</div>

			<div className="inputs-wrapper">
				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Work type
					</Text>

					<Select
						id="work_type_id"
						borderColor="black"
						backgroundColor="gray.100"
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

				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Max distance
					</Text>
					<Input
						id="work_location_max_distance"
						borderColor="black"
						backgroundColor="gray.100"
						type="number"
						value={formData.work_location_max_distance}
						onChange={handleNumberFormChange}
					/>
				</div>
			</div>

			<Box mt="32px" border="1px solid #2E77AE" width="80%" />

			<div className="inputs-wrapper">
				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Latitude
					</Text>
					<Input
						borderColor="black"
						backgroundColor="gray.100"
						id="lat"
						type="number"
						value={marker.lat || formData.home_location?.latitude}
						onChange={handleNumberFormChange}
					/>
				</div>

				<div className="input-box w-50">
					<Text fontSize="lg" paddingTop="16px" textAlign="center">
						Longitude
					</Text>
					<Input
						borderColor="black"
						backgroundColor="gray.100"
						id="lng"
						type="number"
						value={marker.lng || formData.home_location?.longitude}
						onChange={handleNumberFormChange}
					/>
				</div>
			</div>
			<Text fontSize="lg" paddingTop="32px" textAlign="center">
				Click location on map to get Latitude/Longitude
			</Text>
			<div style={{ height: "400px", width: "100%", paddingTop: "32px" }}>
				<GoogleMapReact defaultCenter={{ lat: 0, lng: 0 }} defaultZoom={3} onClick={handleMapClick}></GoogleMapReact>
			</div>

			<Box mt="32px" border="1px solid #2E77AE" width="80%" />

			<Flex flexFlow={"column"} align={"center"}>
				{experience.map((input, index) => (
					<div key={index} className="experience-wrapper">
						<IconButton
							variant="outline"
							aria-label="remove"
							className="remove-btn"
							onClick={() => removeExperience(index)}
							icon={<FiXCircle />}
						/>

						<Text fontSize="lg" paddingTop="16px" textAlign="center">
							Company name
						</Text>
						<Input
							key={index}
							value={input.company_name}
							borderColor="black"
							backgroundColor="gray.100"
							id="company_name"
							type="text"
							onChange={(e) => handleExperience(e, index, "company_name")}
							placeholder="Company name"
						/>

						<div className="inputs-wrapper">
							<div className="input-box w-50">
								<Text fontSize="lg" paddingTop="16px" textAlign="center">
									Position
								</Text>

								<Select
									id="position_id"
									borderColor="black"
									backgroundColor="gray.100"
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
								<Text fontSize="lg" paddingTop="16px" textAlign="center">
									Years
								</Text>
								<Input
									id="years"
									borderColor="black"
									backgroundColor="gray.100"
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

			<Box mt="32px" border="1px solid #2E77AE" width="80%" />

			<Button mt="32px" colorScheme="blue" onClick={handleSubmit}>
				Submit
			</Button>
		</>
	);
}
