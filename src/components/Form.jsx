import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  useDraggable,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

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

const DraggableListItem = ({ text, isDragging }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: text });

  const style = {
    transform: translate(0, 0),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          {text === 'Heading' ? <SendIcon /> : text === 'Full Name' ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const DraggableFormList = () => {
  const { items, setNodeRef, attributes, listeners } = useSortable({ id: 'form-list' });

  return (
    <List ref={setNodeRef} {...attributes} {...listeners}>
      {items.map(({ id, data: text, isDragging }) => (
        <ListItem key={id} disablePadding>
          <DraggableListItem text={text} isDragging={isDragging} />
        </ListItem>
      ))}
    </List>
  );
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState('');
  const [value, setValue] = React.useState(new Date());

  const handleSwitchChange = (value) => {
    setSelectedOption(value);
  };

  const onSubmit = (data) => console.log(data);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Heading', 'Full Name', 'Email', 'Address', 'Phone'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 !== 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const sensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  useSensor(TouchSensor);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'form-draggable',
  });

  return (
    <DndContext
      sensors={useSensors(sensor)}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
                <Button onClick={toggleDrawer('left', true)}>
                  Add Form Elements
                </Button>
                <Drawer
                  anchor="left"
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                  <DraggableFormList />
                </Drawer>

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

                <Typography
                  variant="h6"
                  color="black"
                  className="mt-3"
                  gutterBottom
                >
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
                      helperText={
                        errors.phoneNumber && 'Contact Number is required'
                      }
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

                <Typography
                  variant="h6"
                  color="black"
                  className="mt-3"
                  gutterBottom
                >
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
                      helperText={
                        errors.streetAddress && 'Street Address is required'
                      }
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
                      helperText={
                        errors.postalCode && 'Postal Code is required'
                      }
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

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="black">
                      What date and time work best for you?
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Select Date" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <TimePicker
                          label="Select Time"
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>

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

                <Typography
                  variant="h6"
                  color="black"
                  className="mt-3"
                  gutterBottom
                >
                  Would you like to be notified about promotional services?
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          {...register('promotionalServices', { required: true })}
                          color="primary"
                          defaultChecked={selectedOption === 'yes'}
                          onChange={() => handleSwitchChange('no')}
                          disabled={selectedOption === 'no'}
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
                          defaultChecked={selectedOption === 'no'}
                          onChange={() => handleSwitchChange('yes')}
                          disabled={selectedOption === 'yes'}
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

        <DragOverlay>
          {isDragging && (
            <Box
              sx={{
                // Additional styles for the drag overlay
              }}
            >
              <Typography variant="h6">Dragging...</Typography>
            </Box>
          )}
        </DragOverlay>
      </ThemeProvider>
    </DndContext>
  );
};

export default Form;