import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Adding the config

const config: ThemeConfig = {
    // initialColorMode: 'dark',
}

const theme = extendTheme({...config, fonts: {
    heading:`'Montserrat', sans-serif`,
    body: `'Noto Sans', sans-serif`,
    button: `'Outfit', sans-serif`,
  },
fontWeights: {
    black: 700, // You can adjust the numeric value as needed
    normal: 400,
  },});

export default theme



    // colors: {
    //     gray: {
    //         50: '#f9f9f9',
    //         100: '#ededed',
    //         200: '#d3d3d3',
    //         300: '#b3b3b3',
    //         400: '#a0a0a0',
    //         500: '#898989',
    //         600: '#6c6c6c',
    //         700: '#202020',
    //         800: '#111'
    //     }
    // }
