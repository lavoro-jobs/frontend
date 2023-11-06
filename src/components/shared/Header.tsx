import { Button, ButtonGroup, Flex, Heading, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Show, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function Header({ currentRoute }: {currentRoute?: string}) {

  return (
    <Flex p="16px" bgColor="#2E77AE" justify="space-between" align="center">
      <Link href='/'><Heading fontSize="3xl" color="#0D2137">LAVORO</Heading></Link>
      <Show above="960px">
        <Flex gap="16px" align="center">
          <Link href='/jobposts'>
            <Text fontSize="lg" as={currentRoute === "/jobposts" ? "b" : "p"} color="#0D2137">Job posts</Text>
          </Link>
          <Link href='/aboutus'>
            <Text fontSize="lg" as={currentRoute === "/aboutus" ? "b" : "p"} color="#0D2137">About us</Text>
          </Link>
        </Flex>
        <ButtonGroup>
          <Button as='a' href='/signin' bgColor="#E0EAF5" _hover={{bgColor: "gray.300"}} color="#0D2137">Sign in</Button>
          <Button as='a' href='/signup' bgColor="#FF8E2B" _hover={{bgColor: "#fdb16e"}} color="#0D2137">Sign up</Button>
        </ButtonGroup>
      </Show>
      <Show below="960px">
        <Menu>
          <MenuButton 
            as={IconButton}
            icon={<span className="material-symbols-outlined">menu</span>}
            color="#0D2137"
            variant="unstyled"
          />
          <MenuList>
            <MenuItem as='a' href='/'>Home</MenuItem>
            <MenuItem as='a' href='/jobposts'>Job posts</MenuItem>
            <MenuItem as='a' href='/aboutus'>About us</MenuItem>
            <MenuDivider />
            <MenuItem as='a' href='/signin'>Sign in</MenuItem>
            <MenuItem as='a' href='/signup'>Sign up</MenuItem>
          </MenuList>
        </Menu>
      </Show>
    </Flex>
  )
}