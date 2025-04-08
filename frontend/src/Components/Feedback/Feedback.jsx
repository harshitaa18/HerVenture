import React, { useState } from 'react';
import {
  SwipeableDrawer,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';

const Feedback = ({ open, onToggle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', formData);
    setFormData({ name: '', email: '', feedback: '' });
    onToggle(false); // Close drawer after submission
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => onToggle(false)}
      onOpen={() => onToggle(true)}
      swipeAreaWidth={56}
      disableSwipeToOpen={false}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        sx={{
          padding: 3,
          maxWidth: 500,
          margin: '0 auto',
          textAlign: 'center'
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" gutterBottom>
          Share Your Feedback
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Your Feedback"
          name="feedback"
          margin="normal"
          multiline
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

export default Feedback;