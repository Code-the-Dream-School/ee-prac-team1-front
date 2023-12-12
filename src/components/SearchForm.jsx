import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  ThemeProvider,
  Box,
  Typography,
} from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'

import { theme } from '../utils/theme'

const validationSchema = Yup.object({
  zipCode: Yup.string().matches(/^\d{5}$/, 'Invalid ZIP'),
})

const SearchForm = ({ setActivitiesByZip }) => {
  const {
    handleSubmit,
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    getFieldProps,
    setFieldValue,
  } = useFormik({
    initialValues: {
      zipCode: '',
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      const token = localStorage.getItem('jwtToken')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const fetchActivitiesByZip = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/nearBy-activities/search/${values.zipCode}`,
            config,
          )
          const { data } = response
          setActivitiesByZip(data.activities)
          setFieldValue('zipCode', '')
        } catch (error) {
          toast.error('Invalid ZIP code', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
      }

      fetchActivitiesByZip()
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: '#caf2c9' }}>
          <form onSubmit={handleSubmit}>
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
                label={Boolean(errors.zipCode) ? errors.zipCode : 'Zip Code'}
                InputLabelProps={
                  Boolean(errors.zipCode)
                    ? { style: { color: 'red' } }
                    : { style: { color: 'black' } }
                }
                name="ZipCode"
                value={values.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  placeholder: 'Zip Code',
                }}
                error={touched.zipCode && Boolean(errors.zipCode)}
                // helperText={formik.touched.zipCode && formik.errors.zipCode}
                {...getFieldProps('zipCode')}
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default SearchForm
