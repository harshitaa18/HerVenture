import React from 'react';
import {
  SwipeableDrawer,
  Box,
  Typography,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  FormGroup
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const purpleRadioStyle = {
  color: '#800080',
  '&.Mui-checked': {
    color: '#800080',
  },
};

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#800080',
    },
    '&:hover fieldset': {
      borderColor: '#800080',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#800080',
    },
  },
};

function Feedback({ open, onClose }) {
  const handleSubmit = () => {
    // You can handle form data here if needed
    onClose(); // Close the drawer on submit
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      sx={{ zIndex: 1300 }}
    >
      <Box
        sx={{
          width: 400,
          p: 3,
          fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
          fontSize: '1rem',
          fontWeight: 500,
          color: '#333'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            We'd Love Your Feedback!
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          sx={textFieldStyle}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          sx={textFieldStyle}
        />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          1. Were the listings/recommendations relevant to your needs?
        </Typography>
        <RadioGroup row>
          <FormControlLabel value="yes1" control={<Radio sx={purpleRadioStyle} />} label="Yes" />
          <FormControlLabel value="no1" control={<Radio sx={purpleRadioStyle} />} label="No" />
        </RadioGroup>

        <Typography variant="subtitle1" fontWeight="bold">
          2. Did you end up making a successful connection?
        </Typography>
        <RadioGroup row>
          <FormControlLabel value="yes3" control={<Radio sx={purpleRadioStyle} />} label="Yes" />
          <FormControlLabel value="no3" control={<Radio sx={purpleRadioStyle} />} label="No" />
        </RadioGroup>

        <Typography variant="subtitle1" fontWeight="bold">
          3. Would you recommend HerVenture to other women entrepreneurs?
        </Typography>
        <RadioGroup row>
          <FormControlLabel value="yes4" control={<Radio sx={purpleRadioStyle} />} label="Yes" />
          <FormControlLabel value="no4" control={<Radio sx={purpleRadioStyle} />} label="No" />
        </RadioGroup>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          4. Did you face any problems while using the platform?
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox sx={purpleRadioStyle} />} label="Technical issues" />
          <FormControlLabel control={<Checkbox sx={purpleRadioStyle} />} label="Listings not available in my area" />
          <FormControlLabel control={<Checkbox sx={purpleRadioStyle} />} label="Lack of response from people I contacted" />
          <FormControlLabel control={<Checkbox sx={purpleRadioStyle} />} label="Language/clarity issues" />
          <FormControlLabel control={<Checkbox sx={purpleRadioStyle} />} label="Other" />
        </FormGroup>

        <TextField
          fullWidth
          margin="normal"
          label="What would you like to see improved most?"
          multiline
          rows={3}
          sx={textFieldStyle}
        />

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: 'purple',
              '&:hover': {
                backgroundColor: '#a020f0',
              },
              fontWeight: 'bold',
              color: 'white',
              px: 4,
              borderRadius: 2
            }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}

export default Feedback;
