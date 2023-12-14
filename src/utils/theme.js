import { createTheme } from "@mui/material/styles";

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
            gradient: "linear-gradient(to top, #caf2c9, #c9f0ff)",
            main: "#caf2c9",
            secondary: "#c9f0ff",
        },
        background2: {
            gradient: "linear-gradient(to bottom, #caf2c9, #c9f0ff)",
            main: "#caf2c9",
            secondary: "#c9f0ff",
        },
    },
    typography: {
        color: "#090759",
        fontFamily: "Poppins",
        titleText: {
            fontWeight: 900,
            fontSize: 20,
        },
        subTitleText: {
            fontWeight: 100,
            fontSize: 16,
        },
        subTitleText2: {
            fontWeight: 400,
            fontFamily: "Poppins",
            titleText: {
                fontSize: 100,
            },
        },
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
    navbarButtonStyles: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Poppins",
        color: "#090759",
        cursor: "pointer",
    },
    sortingButtons: {
        fontSize: 14,
        fontWeight: "800",
        fontFamily: "Poppins",
        bgcolor: "#e6f4f1",
        color: "#090759",
    },
});
