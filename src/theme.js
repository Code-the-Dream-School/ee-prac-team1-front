import { createMuiTheme } from "@material-ui/core/styles";
// A custom theme for this app

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1DE619", // bright green
    },
    secondary: {
      main: "#090759", // blue
    },
    tertiary: {
      main: "#1C18DF", // blue for signin
    },
    background: {
      main: "#CAF2C9", // light green
    },
  },
});
export default theme;
// const theme = createMuiTheme({
//   palette: {
//     type: "light",
//     primary: {
//       main: "#61dafb",
//       light: "#61dafb",
//       dark: "#21a1c4",
//     },
//     secondary: {
//       main: "#b5ecfb",
//       light: "#61dafb",
//       dark: "#21a1c4",
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: "#CAF2C9",
//     },
//   },
//   overrides: {
//     MuiPaper: {
//       root: {
//         padding: "20px 10px",
//         margin: "10px",
//         backgroundColor: "CAF2C9",
//       },
//     },
//     MuiButton: {
//       root: {
//         margin: "5px",
//       },
//     },
//   },
// });
