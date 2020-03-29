import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme(
    {
        Typography: {
            useNextVariants: true
        },
        palette: {
            primary: {
                main: '#1882BA'
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
