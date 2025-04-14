import React, { useState } from 'react';
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
  FormGroup,
  FormHelperText
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
  const [form, setForm] = useState({
    name: '',
    email: '',
    q1: '',
    q2: '',
    q3: '',
    q4: [],
    improvement: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCheckboxChange = (label) => {
    const newQ4 = form.q4.includes(label)
      ? form.q4.filter(item => item !== label)
      : [...form.q4, label];
    handleChange('q4', newQ4);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.q1) newErrors.q1 = 'This question is required';
    if (!form.q2) newErrors.q2 = 'This question is required';
    if (!form.q3) newErrors.q3 = 'This question is required';
    if (form.q4.length === 0) newErrors.q4 = 'Select at least one option';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // handle form data here
    onClose();
    setForm({
      name: '',
      email: '',
      q1: '',
      q2: '',
      q3: '',
      q4: [],
      improvement: ''
    });
    setErrors({});
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
          label="Name *"
          sx={textFieldStyle}
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email *"
          sx={textFieldStyle}
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          1. Were the listings/recommendations relevant to your needs? <span style={{ color: 'red' }}>*</span>
        </Typography>
        <RadioGroup
          row
          value={form.q1}
          onChange={e => handleChange('q1', e.target.value)}
        >
          <FormControlLabel value="yes1" control={<Radio sx={purpleRadioStyle} />} label="Yes" />
          <FormControlLabel value="no1" control={<Radio sx={purpleRadioStyle} />} label="No" />
        </RadioGroup>
        {errors.q1 && <FormHelperText error>{errors.q1}</FormHelperText>}

        <Typography variant="subtitle1" fontWeight="bold">
          2. Did you end up making a successful connection? <span style={{ color: 'red' }}>*</span>
        </Typography>
        <RadioGroup
          row
          value={form.q2}
          onChange={e => handleChange('q2', e.target.value)}
        >
          <FormControlLabel value="yes2" control={<Radio sx={purpleRadioStyle} />} label="Yes" />
          <FormControlLabel value="no2" control={<Radio sx={purpleRadioStyle} />} label="No" />
        </RadioGroup>
        {errors.q2 && <FormHelperText error>{errors.q2}</FormHelperText>}

        <Typography variant="subtitle1" fontWeight="bold">
          3. Would you recommend HerVenture to other women entrepreneurs? <span style={{ color: 'red' }}>*</span>
        </Typography>
        <RadioGroup
          row
          value={form.q3}
          onChange={e => handleChange('q3', e.target.value)}
        >
          <FormControlLabel value="yes3" control={<Radio sx={purpleRadioStyle} />} label="Yes" />
          <FormControlLabel value="no3" control={<Radio sx={purpleRadioStyle} />} label="No" />
        </RadioGroup>
        {errors.q3 && <FormHelperText error>{errors.q3}</FormHelperText>}

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          4. Did you face any problems while using the platform? <span style={{ color: 'red' }}>*</span>
        </Typography>
        <FormGroup>
          {[
            'Technical issues',
            'Listings not available in my area',
            'Lack of response from people I contacted',
            'Language/clarity issues',
            'Other'
          ].map(label => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={form.q4.includes(label)}
                  onChange={() => handleCheckboxChange(label)}
                  sx={purpleRadioStyle}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
        {errors.q4 && <FormHelperText error>{errors.q4}</FormHelperText>}

        <TextField
          fullWidth
          margin="normal"
          label="What would you like to see improved most?"
          multiline
          rows={3}
          sx={textFieldStyle}
          value={form.improvement}
          onChange={e => handleChange('improvement', e.target.value)}
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
