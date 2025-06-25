import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Define notification interface
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  autoHideDuration?: number; // in milliseconds
}

// Define UI state interface
interface UIState {
  sidebarOpen: boolean;
  notifications: Notification[];
  darkMode: boolean;
  isMobileView: boolean;
}

// Get dark mode preference from localStorage or system preference
const prefersDarkMode =
  localStorage.getItem('darkMode') === 'true' ||
  (localStorage.getItem('darkMode') === null &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);

// Define initial state
const initialState: UIState = {
  sidebarOpen: false,
  notifications: [],
  darkMode: prefersDarkMode,
  isMobileView: window.innerWidth < 768,
};

// Create the UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    
    // Notification actions
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        id,
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Theme actions
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString());
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', state.darkMode.toString());
    },
    
    // Responsive actions
    setMobileView: (state, action: PayloadAction<boolean>) => {
      state.isMobileView = action.payload;
      if (action.payload) {
        state.sidebarOpen = false;
      }
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleDarkMode,
  setDarkMode,
  setMobileView,
} = uiSlice.actions;

// Export selectors
export const selectUI = (state: RootState) => state.ui;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectDarkMode = (state: RootState) => state.ui.darkMode;
export const selectIsMobileView = (state: RootState) => state.ui.isMobileView;

// Export reducer
export default uiSlice.reducer;