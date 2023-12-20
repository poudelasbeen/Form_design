import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  Switch,
  FormControlLabel,
  Container,
  Box,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Center } from '@mantine/core';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#FF4081',
    },
  },
});

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px',
            border: '2px solid #ddd',
            padding: '20px',
            marginTop: '10px',
            backgroundColor: 'white',
          
          }}
        >
          <Typography variant="h4" color="black" align="center" gutterBottom>
            Appointment Request Form
          </Typography>
          <Typography variant="h7" color="black" align="center" gutterBottom>
          Let us know how we can help you!
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            {/* Full Name Section */}
            <Typography variant="h6" color="black" gutterBottom>
              Full Name
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName', { required: true })}
                  label=""
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName && 'First Name is required'}
                />
                <Typography variant="body2" color="textSecondary">
                  First name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', { required: true })}
                  label=""
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName && 'Last Name is required'}
                />
                <Typography variant="body2" color="textSecondary">
                  Last name
                </Typography>
              </Grid>
            </Grid>

            {/* Contact Number and Email Address Section */}
            <Typography variant="h6" color="black" className="mt-3" gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('phoneNumber', { required: true })}
                  label="(000) 000-0000"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.phoneNumber)}
                  helperText={errors.phoneNumber && 'Contact Number is required'}
                />
                <Typography variant="body2" color="textSecondary">
                  Please enter a valid phone number
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                />
                <Typography variant="body2" color="textSecondary">
                  example@example.com
                </Typography>
              </Grid>
            </Grid>

            {/* Address Section */}
            <Typography variant="h6" color="black" className="mt-3" gutterBottom>
              Address
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('streetAddress', { required: true })}
                  label=""
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.streetAddress)}
                  helperText={errors.streetAddress && 'Street Address is required'}
                />
                <Typography variant="body2" color="textSecondary">
                  Street Address
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('streetAddressLine2')}
                  label=""
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="body2" color="textSecondary">
                  Street Address Line 2
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('city', { required: true })}
                  label=""
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.city)}
                  helperText={errors.city && 'City is required'}
                />
                <Typography variant="body2" color="textSecondary">
                  City
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('state', { required: true })}
                  label=""
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.state)}
                  helperText={errors.state && 'State is required'}
                />
                <Typography variant="body2" color="textSecondary">
                  State/Province
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('postalCode', { required: true })}
                  label=""
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.postalCode)}
                  helperText={errors.postalCode && 'Postal Code is required'}
                />
                <Typography variant="body1" color="textSecondary">
                  Postal/Zip Code
                </Typography>
              </Grid>
            </Grid>
            

            <Grid item xs={15}>
              <Typography variant="body2" color="textSecondary">
               {/* Empty Typography for spacing */}
              </Typography>
            </Grid>

            {/* Additional Information Section */}
            {/* <Typography variant="h6" color="primary" className="mt-3" gutterBottom>
              Additional Information
            </Typography> */}
            <Grid item xs={8}>
            <Typography variant="h6" color="black">
                  What services are you interested in?
                </Typography>
            <TextField
              {...register('additionalInfo')}
              label="Type here..."
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              
            />
            </Grid>

            <Typography variant="h6" color="black" className="mt-3" gutterBottom>
            Would you like to be notified about promotional services?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register('promotionalServices', { required: true })}
                      color="primary"
                      defaultChecked={false}
                    />
                  }
                  label="Yes"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register('promotionalServices', { required: true })}
                      color="primary"
                      defaultChecked={false}
                    />
                  }
                  label="No"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3"
              startIcon={<SendIcon />}
              style={{ alignSelf: 'center' }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Form;