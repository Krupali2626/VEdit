import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';  // Import Link

function CustomNavbar(props) {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:991px)');

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Define navItems with corresponding routes
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Features', path: '/feature' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'About Us', path: '/about' }
    ];

    const DrawerList = (
        <Box
            sx={{
                width: 250,
                height: '100%',
                backgroundColor: 'black',
                color: 'white'
            }}
            role="presentation"
        >
            <Box sx={{
                p: 2,
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                    LOGO
                </Typography>
                <IconButton
                    onClick={toggleDrawer(false)}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {navItems.map(({ label, path }) => (
                    <ListItem key={label} disablePadding>
                        <ListItemButton
                            onClick={toggleDrawer(false)}
                            sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}
                            component={Link}  // Use Link component
                            to={path}          // Set the "to" prop to navigate
                        >
                            <ListItemText primary={label} primaryTypographyProps={{ sx: { color: 'white' } }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <section>
                <nav>
                    <div className='k_nav_img'>
                        <div className="db_container">
                            <div className="row align-items-center text-white Nav_top_padd">
                                <div className="col-3 col-lg-1">
                                    {isMobile ? (
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            edge="start"
                                            onClick={toggleDrawer(true)}
                                            sx={{
                                                background: 'black',
                                                '&:hover': { background: 'black' }
                                            }}
                                        >
                                            <MenuIcon style={{ color: 'white' }} />
                                        </IconButton>
                                    ) : (
                                        <h4 className='mb-0'>LOGO</h4>
                                    )}
                                </div>
                                {!isMobile && (
                                    <div className="col-lg-8">
                                        <div>
                                            <ul className='k_nav_options d-flex mb-0'>
                                                {navItems.map(({ label, path }) => (
                                                    <li key={label}>
                                                        <Link to={path} style={{ textDecoration: 'none', color: 'white' }}>
                                                            {label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                <div className="col-9 col-lg-3">
                                    <div className='k_Both_btn d-flex justify-content-end align-items-center'>
                                        <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
                                            <Button
                                                variant="outlined"
                                                color="inherit"
                                                size={isMobile ? "small" : "medium"}
                                                sx={{ mr: 1 }}
                                            >
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
                                            <Button variant="outlined" color="inherit" size={isMobile ? "small" : "medium"}>
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Drawer
                        anchor="left"
                        open={open}
                        onClose={toggleDrawer(false)}
                    >
                        {DrawerList}
                    </Drawer>
                </nav>
            </section>
        </>
    );
}

export default CustomNavbar;
