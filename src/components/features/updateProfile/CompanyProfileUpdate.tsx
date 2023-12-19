import React, { useRef, useState } from "react";
import { Box, Button, Flex, Heading, Image, Input, Tag, TagCloseButton, TagLabel, Wrap } from "@chakra-ui/react";
import updateCompanyProfile from "@/helpers/updateCompanyProfile";
import createInvite from "@/helpers/createInvite";

export default function CompanyProfileUpdate({ description, logo }: { description: string; logo: string | null }) {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [companyData, setCompanyData] = useState({
    description: description,
    logo: logo,
  });

  const [inputEmail, setInputEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setLogoUrl(URL.createObjectURL(file));
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target) {
          let base64String = event.target.result as string;
          base64String = base64String.split(",")[1];

          setCompanyData({
            ...companyData,
            logo: base64String,
          });
        }
      };

      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newCompanyData = { ...companyData, [e.target.id]: e.target.value };
    setCompanyData(newCompanyData);
  };

  const getPostData = async () => {
    return {
      description: companyData.description,
      logo: companyData.logo,
    };
  };

  const handleSubmit = async () => {
    const postData = await getPostData();
    const response = await updateCompanyProfile(postData);
    if (response == 200) {
      emails.map((email) => {
        createInvite(email);
      });
      window.location.reload();
    }
  };

  return (
    <>
      <Flex gap="8px" direction="column">
        <Heading fontSize="2xl" mt="16px" color="#2E77AE">
          Description
        </Heading>
        <Input
          w="100%"
          borderColor="#2E77AE"
          id="description"
          value={companyData.description}
          onChange={handleChange}
        />

        <Heading fontSize="2xl" mt="16px" color="#2E77AE">
          Company logo
        </Heading>
        {companyData.logo && (
          <Box w="300px" border="#2E77AE solid 2px" borderRadius="16px" overflow="hidden" position="relative">
            <Image
              w="100%"
              src={companyData.logo ? `data:image/jpeg;base64,${companyData.logo}` : logoUrl}
              alt="Company logo"
            />
            <Button
              position="absolute"
              top="-5px"
              right="-5px"
              color="#2E77AE"
              bg="transparent"
              _hover={{ color: "#0D2137" }}
              onClick={() => {
                setCompanyData({
                  ...companyData,
                  logo: "",
                });
              }}
            >
              ✖
            </Button>
          </Box>
        )}
        <Input id="logo" type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />

        <Button
          w="300px"
          color="white"
          bg="#2E77AE"
          _hover={{ color: "#0D2137", bg: "#6ba5d1" }}
          value={companyData.logo ? companyData.logo : undefined}
          onClick={handleLogoUpload}
        >
          Upload {companyData.logo ? "new" : ""} company logo
        </Button>

        <Heading fontSize="2xl" mt="16px" color="#2E77AE">
          Invite colleagues
        </Heading>
        <Wrap>
          {emails.map((email, index) => (
            <Tag key={index} borderRadius="full" p="8px" pl="16px" variant="solid" colorScheme="blue">
              <TagLabel>{email}</TagLabel>
              <TagCloseButton onClick={() => removeEmail(index)} />
            </Tag>
          ))}
        </Wrap>
        <Input
          borderColor="#2E77AE"
          id="email"
          type="email"
          placeholder="Enter emails"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
          value={inputEmail}
        />
      </Flex>
      <Flex paddingTop="32px" justifyContent="flex-end">
        <Button color="white" bg="#FF8E2B" _hover={{ color: "#0D2137", bg: "#fdb16e" }} onClick={handleSubmit}>
          Finish
        </Button>
      </Flex>
    </>
  );
}
