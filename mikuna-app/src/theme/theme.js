import { createMuiTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { common } from "@material-ui/core/colors";

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
                main: "#e53935"
            }
        },
        spacing: 10
    }
);

export default theme;
