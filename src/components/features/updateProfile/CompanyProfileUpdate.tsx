import React, { useRef, useState } from "react";
import { Box, Button, Flex, Heading, Image, Input } from "@chakra-ui/react";
import updateCompanyProfile from "@/helpers/updateCompanyProfile";

export default function CompanyProfileUpdate({ description, logo }: { description: string; logo: string | null }) {
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [companyData, setCompanyData] = useState({
    description: description,
    logo: logo,
  });

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
      </Flex>
      <Flex paddingTop="32px" justifyContent="flex-end">
        <Button color="white" bg="#FF8E2B" _hover={{ color: "#0D2137", bg: "#fdb16e" }} onClick={handleSubmit}>
          Finish
        </Button>
      </Flex>
    </>
  );
}
