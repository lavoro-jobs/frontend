"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext";

const breakpoints = {
	base: "360px",
	sm: "580px",
	md: "680px",
	lg: "960px",
	xl: "1080px",
	"2xl": "1280px",
	"3xl": "1440px",
	"4xl": "1600px",
	"5xl": "2560px",
};

const theme = extendTheme({ breakpoints });

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<AuthProvider>{children}</AuthProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
