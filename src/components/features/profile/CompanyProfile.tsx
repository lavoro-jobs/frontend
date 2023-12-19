import React, { useEffect, useState } from "react";
import CompanyState from "@/interfaces/company/company-state.interface";
import getCompanyWIthRecruiters from "@/helpers/getCompanyWIthRecruiters";
import Sidenav from "@/components/features/dashboard/Sidenav";
import { Box, Button, Flex, Heading, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import CompanyProfileUpdate from "@/components/features/updateProfile/CompanyProfileUpdate";

export default function CompanyProfile() {
  const [update, setUpdate] = useState<boolean>(false);
  const [companyData, setFormData] = useState<CompanyState>({
    id: "",
    name: "",
    description: "",
    logo: "",
    recruiters: [],
  });

  useEffect(() => {
    getCompanyWIthRecruiters().then((resp) => {
      setFormData(resp);
    });
  }, []);

  return (
    <Sidenav>
      {!update && (
        <Box bg="white" flex="1">
          <Flex direction="column" alignItems="center" className="profile-rc">
            <Image
              src={
                companyData.logo
                  ? `data:image/jpeg;base64,${companyData.logo}`
                  : "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/company-enterprise-icon.png"
              }
              w="200px"
              borderRadius="50%"
            ></Image>
            <Heading mt="16px">{companyData.name}</Heading>
          </Flex>
          <Box p="80px 32px 32px 32px">
            <Heading fontSize="3xl" color="#2E77AE">
              Description
            </Heading>
            <Text mt="4px">{companyData.description}</Text>

            <Heading fontSize="3xl" mt="16px" color="#2E77AE">
              Employees:
            </Heading>
            <Table mt="4px" variant="simple" colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {companyData.recruiters.map((recruiter) => (
                  <Tr key={recruiter.account_id}>
                    <Td>{recruiter.first_name}</Td>
                    <Td>{recruiter.last_name}</Td>
                    {/*TODO replace this with email when we get it*/}
                    <Td>{recruiter.recruiter_role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button mt="16px" colorScheme="blue" onClick={() => setUpdate(!update)}>
              Edit
            </Button>
          </Box>
        </Box>
      )}
      {update && (
        <Box bg="white" p="32px">
          <Button alignSelf="flex-end" colorScheme="blue" onClick={() => setUpdate(!update)}>
            Cancel
          </Button>
          <CompanyProfileUpdate
            description={companyData.description}
            logo={companyData.logo}
          ></CompanyProfileUpdate>
        </Box>
      )}
    </Sidenav>
  );
}
