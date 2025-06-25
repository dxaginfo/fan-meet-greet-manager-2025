import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { 
  selectSidebarOpen,
  selectNotifications,
  setMobileView,
  removeNotification,
} from '../store/slices/uiSlice';

// Components
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

// Constants
const DRAWER_WIDTH = 260;

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sidebarOpen = useSelector(selectSidebarOpen);
  const notifications = useSelector(selectNotifications);
  
  // Update mobile view state when screen size changes
  useEffect(() => {
    dispatch(setMobileView(isMobile));
  }, [isMobile, dispatch]);
  
  // Handle removing notifications after they are shown
  const handleCloseNotification = (id: string) => {
    dispatch(removeNotification(id));
  };
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Header */}
      <Header drawerWidth={DRAWER_WIDTH} />
      
      {/* Sidebar/Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer (temporary) */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={sidebarOpen}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
              },
            }}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
          >
            <Sidebar />
          </Drawer>
        )}
        
        {/* Desktop drawer (permanent) */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
              },
            }}
          >
            <Sidebar />
          </Drawer>
        )}
      </Box>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Toolbar /> {/* This creates space below the fixed AppBar */}
        <Outlet /> {/* Render the current route */}
      </Box>
      
      {/* Notifications */}
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open
          autoHideDuration={notification.autoHideDuration || 5000}
          onClose={() => handleCloseNotification(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => handleCloseNotification(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default MainLayout;