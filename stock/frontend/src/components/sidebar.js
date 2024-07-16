import React from 'react';
import './sidebar.css';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';



const Sidebarmenu = ({ onMenuClick }) => {
    const { collapseSidebar } = useProSidebar();

return(

    <div>
        <Sidebar className='sidebar'>
                    <Menu>
                        <MenuItem
                            icon={<MenuOutlinedIcon />}
                            onClick={() => {
                                collapseSidebar();
                            }}
                            style={{ textAlign: "center" }}
                        >
                            <h2>Menu</h2>
                        </MenuItem>
                        <MenuItem icon={<HomeOutlinedIcon />} onClick={() => onMenuClick('/')}>  Home </MenuItem>
                        <MenuItem icon={<Inventory2Icon/>} onClick={() => onMenuClick('/products')}> Products </MenuItem>
                        <MenuItem icon={<LibraryBooksIcon/>}onClick={()=>onMenuClick('/stock')}>Stock</MenuItem>
                        <MenuItem icon={<LogoutIcon />} onClick={() => onMenuClick('/signin')}>Logout </MenuItem>
                    </Menu>
                </Sidebar>
    </div>

);

    
};

export default Sidebarmenu;