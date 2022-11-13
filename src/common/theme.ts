import {extendTheme} from "native-base";

const colors = {
    white: {
      1000: '#F8F8F8'
    },
    black: {
      1000 : '#010101'
    },
    purple: {
        1000: '#A177AF',
        200: '#D0BBD7'
    },
    green: {
        1000: '#89CC9E'
    },
    blue: {
        1000: '#6EBEDB'
    }
}

const theme = extendTheme({
    colors: colors
})

export default theme
