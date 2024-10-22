import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Usercontext } from './Usercontext'; // Import the context
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

function CustomNavbar() {
    const { user, setUser } = useContext(Usercontext); // Get the user context
    const isMobile = useMediaQuery('(max-width:991px)');
    const userName = location.state?.userName || 'User';

    // Function to update user data from localStorage
    const updateUserData = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            console.log('User name:', storedUser.additional?.name); // Log the user name
        } else {
            setUser(null);
        }
    };

    // Effect to run on component mount and when localStorage changes
    useEffect(() => {
        // Initial check for user data
        updateUserData();

        // Set up event listener for storage changes
        window.addEventListener('storage', updateUserData);

        // Custom event listener for login/logout
        window.addEventListener('userDataChanged', updateUserData);

        // Cleanup function
        return () => {
            window.removeEventListener('storage', updateUserData);
            window.removeEventListener('userDataChanged', updateUserData);
        };
    }, [setUser]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('userDataChanged'));
    };

    return (
        <nav>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/feature">Features</Link></li>
                    <li><Link to="/pricing">Pricing</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                </ul>

                <div className="col-9 col-lg-3">
                    {user ? (
                        <div className='d-flex justify-content-end align-items-center'>
                            <div className='text-white'>
                                {/* Display user name or 'User' if name is not available */}
                                <p className="mb-0">{userName}</p>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size={isMobile ? "small" : "medium"}
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </Button>
                            </div>
                        </div>
                    ) : (
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
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size={isMobile ? "small" : "medium"}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default CustomNavbar;
