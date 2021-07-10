// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react"
// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: "gray.600",
          color: "teal",
        },
        // styles for the `a`
        a: {
          color: "teal.500",
          _hover: {
            textDecoration: "underline",
          },
        },
        button: {
            color: "teal",
            colorScheme: "teal",
        }
      },
    },
  })
  

 export const customTheme = theme
