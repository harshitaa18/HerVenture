import React from 'react';
import { SwipeableDrawer, Box, Typography, IconButton, TextField, FormControlLabel, Checkbox, Button, RadioGroup, Radio, FormGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Feedback({ open, onClose }) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
    >
      <Box sx={{ width: 400, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Feedback Form</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField fullWidth margin="normal" label="Name" />
        <TextField fullWidth margin="normal" label="Email" />

        <Typography variant="subtitle1" mt={2}>1. Were the listings/recommendations relevant to your needs?</Typography>
        <RadioGroup row>
          <FormControlLabel value="yes1" control={<Radio />} label="Yes" />
          <FormControlLabel value="no1" control={<Radio />} label="No" />
        </RadioGroup>

        <Typography variant="subtitle1">2. Was it easy to contact the landowner/supplier/worker?</Typography>
        <RadioGroup row>
          <FormControlLabel value="yes2" control={<Radio />} label="Yes" />
          <FormControlLabel value="no2" control={<Radio />} label="No" />
        </RadioGroup>

        <Typography variant="subtitle1">3. Did you end up making a successful connection?</Typography>
        <RadioGroup row>
          <FormControlLabel value="yes3" control={<Radio />} label="Yes" />
          <FormControlLabel value="no3" control={<Radio />} label="No" />
        </RadioGroup>

        <Typography variant="subtitle1">4. Would you recommend HerVenture to other women entrepreneurs?</Typography>
        <RadioGroup row>
          <FormControlLabel value="yes4" control={<Radio />} label="Yes" />
          <FormControlLabel value="no4" control={<Radio />} label="No" />
        </RadioGroup>

        <Typography variant="subtitle1" mt={2}>5. Has HerVenture helped you grow your business in any of the following ways?</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Found a better location" />
          <FormControlLabel control={<Checkbox />} label="Reduced supply costs" />
          <FormControlLabel control={<Checkbox />} label="Found trustworthy staff" />
          <FormControlLabel control={<Checkbox />} label="Saved time or effort" />
          <FormControlLabel control={<Checkbox />} label="Gained more confidence to expand" />
          <FormControlLabel control={<Checkbox />} label="Other (please describe)" />
        </FormGroup>

        <Typography variant="subtitle1" mt={2}>6. Did you face any problems while using the platform?</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Technical issues" />
          <FormControlLabel control={<Checkbox />} label="Listings not available in my area" />
          <FormControlLabel control={<Checkbox />} label="Lack of response from people I contacted" />
          <FormControlLabel control={<Checkbox />} label="Language/clarity issues" />
          <FormControlLabel control={<Checkbox />} label="Other" />
        </FormGroup>

        <TextField
          fullWidth
          margin="normal"
          label="What would you like to see improved most?"
          multiline
          rows={3}
        />

        <Box textAlign="center" mt={3}>
          <Button variant="contained" color="primary">
            Submit Feedback
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}

export default Feedback;
