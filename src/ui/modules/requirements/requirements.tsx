import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { RequirementsResourceImpl } from './requirements-service';

export default function Requirements() {
  const getRequirements = async () => {
    const requirements = await new RequirementsResourceImpl().getRequirements();
    setRequirements(requirements.map(requirement => requirement.message));
  };

  const [requirements, setRequirements] = useState<string[]>([]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h5">Requirements</Typography>

        <Button variant="outlined" onClick={getRequirements}>
          Check
        </Button>
      </Box>
      <ul>
        {requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}
