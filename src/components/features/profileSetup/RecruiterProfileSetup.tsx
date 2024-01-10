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
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";

export default function RecruiterProfileSetup() {
  const router = useRouter();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);

  const [formDataRecruiter, setFormDataRecruiter] = useState<FormStateRecruiter>({
    profile_picture: "",
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

  const [logoUrl, setLogoUrl] = useState<string>("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setLogoUrl(URL.createObjectURL(file));
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target) {
          let base64String = event.target.result as string;
          base64String = base64String.split(",")[1];

          setFormDataCompany({
            ...formDataCompany,
            logo: base64String,
          });
        }
      };

      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const [articles, setArticles] = useState([
    { id: 1, isActive: true },
    { id: 2, isActive: false },
    { id: 3, isActive: false },
  ]);
  const [idArticle, setIdArticle] = useState(1);
  const [btn, setBtn] = useState(true);

  const handleClick = (id: number) => {
    setIdArticle(id);
    setBtn(false);
    setTimeout(() => {
      setBtn(true);
    }, 400);

    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id ? { ...article, isActive: true } : { ...article, isActive: false }
      )
    );
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  const mainStyle = {
    "--x": `${mousePosition.x}px`,
    "--y": `${mousePosition.y}px`,
  };

  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      if (
        formDataRecruiter.first_name &&
        formDataRecruiter.last_name &&
        formDataCompany.name &&
        formDataCompany.description
      ) {
        setError(false);
        let res = await createRecruiterProfile(formDataRecruiter);
        if (res && res.statusText === "OK") {
          let res2 = await createCompanyProfile(formDataCompany);
          if (res2 && res2.statusText === "OK") {
            emails.map((email) => {
              createInvite(email);
            });
            router.push("/dashboard");
          }
        }
      } else {
        setError(true);
      }
    } catch (error) {}
  };

  const profileRef = useRef<HTMLInputElement>(null);
  const handleProfileUpload = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };
  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target) {
          let base64String = event.target.result as string;
          base64String = base64String.split(",")[1];

          setFormDataRecruiter({
            ...formDataRecruiter,
            profile_picture: base64String,
          });
        }
      };

      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  return (
    <Flex
      className="main"
      onMouseMove={handleMouseMove}
      style={mainStyle as React.CSSProperties}
      minH="100vh"
      align="center"
      padding="100px 0"
      justify="center"
      direction="column"
    >
      <Heading p="0 32px" marginBottom="32px" maxW="512px" textAlign="center" color="#fff">
        Welcome!
      </Heading>

      <Box position="relative" id="card" justifyContent="center">
        <Button
          borderRadius="20px"
          display={idArticle !== 3 && btn ? "" : "none"}
          position="absolute"
          className="nxt-prev-btn prev-btn"
          zIndex={3}
          color="white"
          bg="#FF8E2B"
          _hover={{ color: "#0D2137", bg: "#fdb16e" }}
          onClick={() => {
            handleClick(idArticle + 1);
          }}
        >
          <IoArrowRedo />
        </Button>
        <Button
          borderRadius="20px"
          display={idArticle !== 1 && btn ? "" : "none"}
          position="absolute"
          className="nxt-prev-btn next-btn"
          zIndex={3}
          color="white"
          bg="#FF8E2B"
          _hover={{ color: "#0D2137", bg: "#fdb16e" }}
          onClick={() => {
            handleClick(idArticle - 1);
          }}
        >
          <IoArrowUndo />
        </Button>
        <section className="backgrounds">
          <Box
            onClick={() => {
              handleClick(1);
            }}
            w="700px"
            className="background"
            border="solid"
            borderRadius="16px"
            borderColor="#E0EAF5"
            data-active={articles[0].isActive}
          ></Box>
          <Box
            onClick={() => {
              handleClick(2);
            }}
            className="background"
            border="solid"
            borderRadius="16px"
            borderColor="#E0EAF5"
            data-active={articles[1].isActive}
          ></Box>
          <Box
            onClick={() => {
              handleClick(3);
            }}
            className="background"
            border="solid"
            borderRadius="16px"
            borderColor="#E0EAF5"
            data-active={articles[2].isActive}
          ></Box>
        </section>

        <section className="content">
          <article
            className="article"
            onClick={() => {
              !articles[0].isActive && handleClick(1);
            }}
            data-active={articles[0].isActive}
            data-id="1"
          >
            <Heading color="#2E77AE" paddingBottom="16px" textAlign="center">
              Personal information
            </Heading>

            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              First name
            </Heading>
            <Input
              borderColor="#2E77AE"
              id="first_name"
              value={formDataRecruiter.first_name}
              onChange={handleRecruiterFormChange}
            />

            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              Last name
            </Heading>
            <Input
              borderColor="#2E77AE"
              id="last_name"
              value={formDataRecruiter.last_name}
              onChange={handleRecruiterFormChange}
            />

            <Flex direction="column" align="center">
              <Input
                id="profile-picture"
                type="file"
                ref={profileRef}
                style={{ display: "none" }}
                onChange={handleProfileChange}
              />

              <Button
                mt="16px"
                color="white"
                bg="#2E77AE"
                _hover={{ color: "#0D2137", bg: "#6ba5d1" }}
                value={formDataRecruiter.profile_picture}
                onClick={handleProfileUpload}
              >
                Upload {formDataRecruiter.profile_picture ? "new" : ""} profile picture
              </Button>

              {formDataRecruiter.profile_picture && (
                <Box w="200px" mt="16px" border="#2E77AE solid 2px" overflow="hidden" position="relative">
                  <Image
                    w="100%"
                    src={
                      formDataRecruiter.profile_picture
                        ? `data:image/jpeg;base64,${formDataRecruiter.profile_picture}`
                        : "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                    }
                    alt="Profile picture"
                  />
                  <Button
                    position="absolute"
                    top="0px"
                    right="0px"
                    color="#2E77AE"
                    bg="transparent"
                    _hover={{ color: "#0D2137" }}
                    onClick={() => {
                      setFormDataRecruiter({
                        ...formDataRecruiter,
                        profile_picture: "",
                      });
                    }}
                  >
                    ✖
                  </Button>
                </Box>
              )}
            </Flex>
          </article>
          <article
            className="article"
            onClick={() => {
              !articles[1].isActive && handleClick(2);
            }}
            data-active={articles[1].isActive}
            data-id="2"
          >
            <Heading color="#2E77AE" paddingBottom="16px" textAlign="center">
              Company information
            </Heading>

            <div className="inputs-wrapper-center">
              <Flex direction="column" w="500px" justify="center" align="center" gap="16px">
                <Input id="logo" type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />

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
                  <Box w="300px" border="#2E77AE solid 2px" borderRadius="16px" overflow="hidden" position="relative">
                    <Image w="100%" src={logoUrl} alt="Company logo" />
                    <Button
                      position="absolute"
                      top="0px"
                      right="0px"
                      color="#2E77AE"
                      bg="transparent"
                      _hover={{ color: "#0D2137" }}
                      onClick={() => {
                        setFormDataCompany({
                          ...formDataCompany,
                          logo: "",
                        });
                      }}
                    >
                      ✖
                    </Button>
                  </Box>
                )}
              </Flex>
            </div>

            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              Company name
            </Heading>
            <Input borderColor="#2E77AE" id="name" value={formDataCompany.name} onChange={handleCompanyFormChange} />

            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              Description
            </Heading>
            <Textarea
              maxLength={150}
              borderColor="#2E77AE"
              id="description"
              value={formDataCompany.description}
              onChange={handleCompanyFormChange}
            />
          </article>
          <article
            className="article"
            onClick={() => {
              !articles[2].isActive && handleClick(3);
            }}
            data-active={articles[2].isActive}
            data-id="3"
          >
            <Heading color="#2E77AE" paddingBottom="16px" textAlign="center">
              Invite colleagues
            </Heading>
            <Wrap>
              {emails.map((email, index) => (
                <Tag key={index} borderRadius="full" variant="solid" colorScheme="blue" p="8px" pl="16px">
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
              marginTop="16px"
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
              value={inputEmail}
            />

            <Flex paddingTop="16px" align="flex-end" direction="column">
              <Button
                w="200px"
                color="white"
                bg="#FF8E2B"
                _hover={{ color: "#0D2137", bg: "#fdb16e" }}
                onClick={handleSubmit}
              >
                Finish
              </Button>
              <Flex direction="column" align="center">
                {error && (
                  <>
                    <Text mt="16px" fontSize="lg" color="red">
                      Please fill out your:
                    </Text>
                    <Text color="red">
                      <li style={{ listStyleType: "none" }}>First name</li>
                      <li style={{ listStyleType: "none" }}>Last name</li>
                      <li style={{ listStyleType: "none" }}>Company name</li>
                      <li style={{ listStyleType: "none" }}>Description</li>
                    </Text>
                  </>
                )}
              </Flex>
            </Flex>
          </article>
        </section>
      </Box>
    </Flex>
  );
}
