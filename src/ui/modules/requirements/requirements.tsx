import Button from '@mui/material/Button';
import { useState } from 'react';
import { CommonAPI } from '../../electron-api/common';

export default function Requirements() {
  const getRequirements = async () => {
    const requirements = await new CommonAPI().getRequirements();
    setRequirements(requirements.map(requirement => requirement.stdout));
  };

  const [requirements, setRequirements] = useState<string[]>([]);

  return (
    <div>
      <h1>Requirements</h1>
      <Button variant="contained" onClick={getRequirements}>
        Check
      </Button>
      <ul>
        {requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>
    </div>
  );
}
