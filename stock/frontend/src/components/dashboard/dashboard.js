import React from 'react';
import './dashboard.css';
import Sidebarmenu from '../sidebar';
import { isAuthenticated} from '../../Backend';


const Dashboard = () => {
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    const navigateTo = (path) => {
        // Use the Navigate component to navigate programmatically
        window.location.href = path;
    };

    return (
        !authenticatedUser ? <p className='login_redirect mt-2'> Please sign In <b><a href='/signin'> Signin here</a></b></p> :
            <div className='dashboard'>
                <Sidebarmenu onMenuClick={navigateTo}/>
                <div className='content'>
                    <h1>Hello, {authenticatedUser.user.name}</h1> {/* Display user's name */}
                </div>
            </div>
    );
};

export default Dashboard;
