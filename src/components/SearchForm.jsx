import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  // MenuItem,
  // Select,
  // InputLabel,
  ThemeProvider,
  Box,
  Typography,
} from '@mui/material';

// import { useNavigate } from 'react-router-dom';
import { theme } from '../utils/theme';
// import { bottom } from '@popperjs/core';

const validationSchema = Yup.object({
  zipCode: Yup.string().matches(/^\d{5}$/, 'Invalid ZIP'),
});


const SearchForm = () => {
  // const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      zipCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      console.log('Saved:', values);
    },
  });

  // const handleChange = (e) => {
  //   formik.setValues({
  //     ...formik.values,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const convertedDateOfBirth = formik.values.dateOfBirth
    //    ? new Date(formik.values.dateOfBirth).toISOString()
    //     : ""null"";

    // formik.setValues({
    //     ...formik.values,
    //     dateOfBirth: convertedDateOfBirth,
    // });

    // const endpoint = "/api/v1/user";
    //     axios
    //         .post(endpoint, formik.values)
    //         .then((response) => {
    //             console.log("Saved successfully:", response.data);
    //             navigate("/");
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: '#caf2c9' }}>
          <form onSubmit={formik.handleSubmit}>
            <Box
              display="flex"
              flexDirection={'row'}
              maxWidth={500}
              alignItems={'start'}
              justifyContent={'center'}
              margin={'auto'}
              gap={1}
              padding={1}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    ...theme.commonButtonStyles,
                    width: 120,
                    textTransform: 'uppercase',
                    paddingTop: 1,
                  }}
                >
                  Find activity
                </Typography>
              </Box>
              {/* Zip Code */}
              <TextField
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root.Mui-focused':
                    theme.overrides.MuiInputLabel.root['&.Mui-focused'],
                  '& .MuiOutlinedInput-root':
                    theme.overrides.MuiOutlinedInput.root,
                  width: 100,
                }}
                size="small"
                label={
                  Boolean(formik.errors.zipCode)
                    ? formik.errors.zipCode
                    : 'Zip Code'
                }
                InputLabelProps={
                  Boolean(formik.errors.zipCode)
                    ? { style: { color: 'red' } }
                    : { style: { color: 'black' } }
                }
                name="ZipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  placeholder: 'Zip Code',
                }}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                // helperText={formik.touched.zipCode && formik.errors.zipCode}
                {...formik.getFieldProps('zipCode')}
              />

              {/* Search  Button */}
              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{
                  ...theme.commonButtonStyles,
                  width: 120,
                }}
                onClick={handleSubmit}
                spacing={10}
              >
                Search
              </Button>
            </Box>
          </form>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SearchForm;
