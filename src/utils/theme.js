import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1DE619",
            contrastText: "#090759",
        },
        secondary: {
            main: "#090759",
            contrastText: "#090759",
        },
        background: {
            main: "#DFF8D6",
        },
    },
    typography: {
        fontFamily: "'Poppins'",
        fontWeightBold: 900,
        fontSize: 14,
    },
    overrides: {
        MuiInputLabel: {
            root: {
                "&.Mui-focused": {
                    color: "#090759",
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                "& fieldset": {
                    borderColor: "#DFF8D6",
                },
                "&:hover fieldset": {
                    borderColor: "#00367D",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#00367D",
                },
            },
        },
    },
    commonButtonStyles: {
        fontSize: 14,
        fontWeight: "800",
        fontFamily: "Poppins",
        color: "#090759",
    },
});
