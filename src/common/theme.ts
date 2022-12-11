import {extendTheme} from "native-base";
import ButtonOverride from "@components/overrides/ButtonOverride";

const colors = {
    white: {
      1000: '#F8F8F8'
    },
    black: {
      1000 : '#010101'
    },
    gray: {
        1000 : '#8e8e8e'
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
    colors: colors,
    components: {
        Button: ButtonOverride
    }
})

export default theme
