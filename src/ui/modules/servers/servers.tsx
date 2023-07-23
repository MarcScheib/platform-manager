import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Server } from '../../../shared/types/servers';
import { ServersResourceImpl } from './servers-service';

export default function Servers() {
  const service = useMemo(() => new ServersResourceImpl(), []);
  const [add, setAdd] = useState<boolean>(false);
  const [servers, setServers] = useState<Server[]>([]);
  useEffect(() => {
    console.log('load servers');
    service.read().then(servers => setServers(servers));
  }, []);
  const createServer = (server: Server) =>
    service
      .create(server)
      .then(() => service.read())
      .then(servers => setServers(servers))
      .then(() => setAdd(false));

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
        <Typography variant="h5">Servers</Typography>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setAdd(!add)}
        >
          Create
        </Button>
      </Box>

      {add && (
        <CreateServer onSubmit={createServer} onCancel={() => setAdd(false)} />
      )}

      <ServersTable servers={servers} />
    </React.Fragment>
  );
}

function CreateServer(props: {
  onSubmit: (server: Server) => void;
  onCancel: () => void;
}) {
  const nameRef = useRef<HTMLInputElement>();
  const urlRef = useRef<HTMLInputElement>();

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        mb: 2,
        display: 'flex',
        alignItems: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="name" label="Name" variant="standard" inputRef={nameRef} />
      <TextField id="url" label="URL" variant="standard" inputRef={urlRef} />

      <IconButton
        aria-label="submit"
        onClick={() =>
          props.onSubmit({
            businessKey: nameRef.current.value,
            name: nameRef.current.value,
            url: urlRef.current.value,
          })
        }
      >
        <CheckIcon />
      </IconButton>
      <IconButton aria-label="cancel" onClick={() => props.onCancel()}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

function ServersTable({ servers }: { servers: Server[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
