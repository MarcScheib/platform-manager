import ArrowRight from '@mui/icons-material/ArrowRight';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Home from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Settings from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import IconButton from '@mui/material/IconButton';import GroupIcon from '@mui/icons-material/Group';
import List from '@mui/material/List';
import StorageIcon from '@mui/icons-material/Storage';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const data = [
  { icon: <EngineeringIcon />, label: 'Requirements', to: 'requirements' },
  { icon: <ViewModuleIcon />, label: 'Modules', to: 'modules' },
  { icon: <GroupIcon />, label: 'Tenants', to: 'tenants' },
  { icon: <StorageIcon />, label: 'Servers', to: 'servers' },
  { icon: <KeyIcon />, label: 'Secrets', to: 'secrets' },
];

const Nav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export function Navigation() {
  const [open, setOpen] = React.useState(true);

  return (
    <Nav component="nav" disablePadding>
      <ListItemButton>
        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
        <ListItemText
          sx={{ my: 0 }}
          primary="Default"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: 'medium',
            letterSpacing: 0,
          }}
        />
      </ListItemButton>

      <Divider />

      <ListItem component="div" disablePadding>
        <ListItemButton sx={{ height: 56 }} component={Link} to="workspaces">
          <ListItemIcon>
            <Home color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Workspaces"
            primaryTypographyProps={{
              color: 'primary',
              fontWeight: 'medium',
              variant: 'body2',
            }}
          />
        </ListItemButton>
        <Tooltip title="Workspace Settings">
          <IconButton
            size="large"
            sx={{
              '& svg': {
                color: 'rgba(255,255,255,0.8)',
                transition: '0.2s',
                transform: 'translateX(0) rotate(0)',
              },
              '&:hover, &:focus': {
                bgcolor: 'unset',
                '& svg:first-of-type': {
                  transform: 'translateX(-4px) rotate(-20deg)',
                },
                '& svg:last-of-type': {
                  right: 0,
                  opacity: 1,
                },
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                height: '80%',
                display: 'block',
                left: 0,
                width: '1px',
                bgcolor: 'divider',
              },
            }}
          >
            <Settings />
            <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
          </IconButton>
        </Tooltip>
      </ListItem>

      <Divider />

      <Box
        sx={{
          bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
          pb: open ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: open ? 0 : 2.5,
            '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: 'medium',
              lineHeight: '20px',
              mb: '2px',
            }}
            secondary={data.map(item => item.label).join(', ')}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: '16px',
              color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 0,
              transform: open ? 'rotate(-180deg)' : 'rotate(0)',
              transition: '0.2s',
            }}
          />
        </ListItemButton>
        {open &&
          data.map(item => (
            <ListItemButton
              component={Link}
              to={item.to}
              key={item.label}
              sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
              />
            </ListItemButton>
          ))}
      </Box>
    </Nav>
  );
}
