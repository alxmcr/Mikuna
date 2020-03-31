import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme(
    {
        Typography: {
            useNextVariants: true
        },
        palette: {
            primary: {
                main: '#f0e205'
            },
            common: {
                whilte: 'white'
            },
            secondary: {
                main: '#e53935'
            }
        },
        spacing: 10
    }
);

export default theme;
