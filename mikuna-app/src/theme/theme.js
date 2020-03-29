import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme(
    {
        Typography: {
            useNextVariants: true
        },
        palette: {
            primary: {
                main: '#10A75F'
            },
            common: {
                whilte: "white"
            },
            secondary: {
                main: "#DF3E3E"
            }
        },
        spacing: 10
    }
);

export default theme;
