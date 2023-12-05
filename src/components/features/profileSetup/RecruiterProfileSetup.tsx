import createCompanyProfile from "@/helpers/createCompanyProfile";
import createInvite from "@/helpers/createInvite";
import createRecruiterProfile from "@/helpers/createRecruiterProfile";
import FormStateCompany from "@/interfaces/recruiter/form-state-company.interface";
import FormStateRecruiter from "@/interfaces/recruiter/form-state-recruiter.interface";
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Input,
	Progress,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	Textarea,
	Wrap,
	useSteps,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

export default function RecruiterProfileSetup() {
	const [inputEmail, setInputEmail] = useState<string>("");
	const [emails, setEmails] = useState<string[]>([]);

	const [formDataRecruiter, setFormDataRecruiter] = useState<FormStateRecruiter>({
		first_name: "",
		last_name: "",
	});

	const [formDataCompany, setFormDataCompany] = useState<FormStateCompany>({
		name: "",
		description: "",
		logo: "",
	});

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

	const inputRef = useRef<HTMLInputElement>(null);
	const handleLogoUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleRecruiterFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const newFormData = { ...formDataRecruiter, [e.target.id]: e.target.value };
		setFormDataRecruiter(newFormData);
	};

	const handleCompanyFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const newFormData = { ...formDataCompany, [e.target.id]: e.target.value };
		setFormDataCompany(newFormData);
	};

	const handleSubmit = async () => {
		try {
			let res = await createRecruiterProfile(formDataRecruiter);
			if (res && res.statusText === "OK") {
				let res2 = await createCompanyProfile(formDataCompany);
				if (res2 && res2.statusText === "OK") {
					emails.map((email) => {
						createInvite(email);
					});
				}
			}
		} catch (error) {}
	};

	const steps = [{ title: "Personal info" }, { title: "Company info" }, { title: "Invite colleagues" }];
	const { activeStep, goToNext, goToPrevious } = useSteps({
		index: 0,
		count: steps.length,
	});
	const progressPercent = (activeStep / (steps.length - 1)) * 100;

	return (
		<Flex minH="100vh" align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
			<Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
				Welcome!
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
								<Input id="first_name" value={formDataRecruiter.first_name} onChange={handleRecruiterFormChange} />
							</div>

							<div className="input-box w-50">
								<Text fontSize="lg" paddingTop="16px" textAlign="center">
									Last name
								</Text>
								<Input id="last_name" value={formDataRecruiter.last_name} onChange={handleRecruiterFormChange} />
							</div>
						</div>
					</>
				)}
				{activeStep === 1 && (
					<>
						<Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
							Company information
						</Text>

						<div className="inputs-wrapper-center">
							<Flex direction="column" w="500px" justify="center" align="center" gap="16px">
								<Input
									id="logo"
									type="file"
									ref={inputRef}
									style={{ display: "none" }}
									onChange={(e) => {
										if (e.target.files?.[0]) {
											setFormDataCompany({
												...formDataCompany,
												logo: URL.createObjectURL(e.target.files[0]),
											});
											e.target.value = "";
										}
									}}
								/>
								<Button
									color="white"
									bg="#2E77AE"
									_hover={{ color: "#0D2137", bg: "#6ba5d1" }}
									value={formDataCompany.logo}
									onClick={handleLogoUpload}
								>
									Upload {formDataCompany.logo ? "new" : ""} company logo
								</Button>

								{formDataCompany.logo && (
									<Box w="96%" border="#2E77AE solid 2px" borderRadius="16px" overflow="hidden" position="relative">
										<Image w="100%" src={formDataCompany.logo} />
										<Button
											position="absolute"
											top="0px"
											right="0px"
											color="#2E77AE"
											bg="transparent"
											_hover={{ color: "#0D2137" }}
											onClick={() =>
												setFormDataCompany({
													...formDataCompany,
													logo: "",
												})
											}
										>
											✖
										</Button>
									</Box>
								)}
							</Flex>
						</div>

						<div className="inputs-wrapper-center">
							<div className="input-box w-50">
								<Text fontSize="lg" paddingTop="16px" textAlign="center">
									Company name
								</Text>
								<Input id="name" value={formDataCompany.name} onChange={handleCompanyFormChange} />
							</div>
						</div>

						<div className="inputs-wrapper-center">
							<div className="input-box w-50">
								<Text fontSize="lg" paddingTop="16px" textAlign="center">
									Description
								</Text>
								<Textarea id="description" value={formDataCompany.description} onChange={handleCompanyFormChange} />
							</div>
						</div>
					</>
				)}
				{activeStep === 2 && (
					<>
						<Text fontSize="xl" fontWeight="700" paddingTop="32px" paddingBottom="16px" textAlign="center">
							Invite colleagues
						</Text>
						<div className="inputs-wrapper-center">
							<div className="input-box w-50">
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
							</div>
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
