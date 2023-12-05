import React from 'react'
import Sidenav from '../dashboard/Sidenav'
import { Flex, Heading } from '@chakra-ui/react'

export default function RecruiterProfile() {
  return (
    <Sidenav>
			<Flex align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
				<Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
					Profile
				</Heading>
			</Flex>
		</Sidenav>
  )
}
