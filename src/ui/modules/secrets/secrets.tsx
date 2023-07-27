import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Secrets() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      <Typography variant="h5">Secrets</Typography>
    </Box>
  );
}
