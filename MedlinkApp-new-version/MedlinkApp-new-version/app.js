import 'react-native-url-polyfill/auto';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { ThemeProvider } from './app/context/ThemeContext';

// Screens
import LaunchScreen from './app/screens/LaunchScreen';
import StartingPage from './app/screens/StartingPage';
import AuthChoice from './app/screens/AuthChoice';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';
import DoctorProfile from './app/screens/DoctorProfile';
import DoctorAvailability from './app/screens/DoctorAvailability';
import BookAppointment from './app/screens/BookAppointment';
import PaymentGateway from './app/screens/PaymentGateway';
import BookingSuccess from './app/screens/BookingSuccess';
import Settings from './app/screens/Settings';
import SettingsDarkMode from './app/screens/Settings-DarkMode';
import VoiceCall from './app/screens/VoiceCall';
import DoctorChat from './app/screens/DoctorChat';
import AdminDashboard from './app/screens/AdminDashboard';
import DoctorDashboard from './app/screens/DoctorDashboard';
import RoleSelection from './app/screens/RoleSelection';
import FamilyOnboarding from './app/screens/FamilyOnboarding';
import EnhancedSettings from './app/screens/EnhancedSettings';
import HealthAlerts from './app/screens/HealthAlerts';
import FamilyHealthDashboard from './app/screens/FamilyHealthDashboard';
import DMPViewer from './app/screens/DMPViewer';
import DoctorSearch from './app/screens/DoctorSearch';
import DoctorAppointments from './app/screens/DoctorAppointments';
import DoctorLocation from './app/screens/DoctorLocation';
import DoctorMap from './app/screens/DoctorMap';
import PatientManagement from './app/screens/PatientManagement';
import PaymentBilling from './app/screens/PaymentBilling';
import VideoConsultation from './app/screens/VideoConsultation';
import ChatSystem from './app/screens/ChatSystem';
import ForgotPassword from './app/screens/ForgotPassword';
import LanguageSettings from './app/screens/LanguageSettings';
import DoctorSignUp from './app/screens/DoctorSignUp';
import ChangePassword from './app/screens/ChangePassword';
import AboutUs from './app/screens/AboutUs';
import DMPManagement from './app/screens/DMPManagement';

// Navigation
import MainTabNavigator from './app/navigation/MainTabNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }}
            initialRouteName="Launch"
          >
            {/* Launch Screen */}
            <Stack.Screen name="Launch" component={LaunchScreen} />
            
            {/* Authentication Screens */}
            <Stack.Screen name="StartingPage" component={StartingPage} />
            <Stack.Screen name="RoleSelection" component={RoleSelection} />
            <Stack.Screen name="AuthChoice" component={AuthChoice} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            
            {/* Main App with Tab Navigation */}
            <Stack.Screen name="MainApp" component={MainTabNavigator} />
            
            {/* Modal Screens */}
            <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
            <Stack.Screen name="DoctorAvailability" component={DoctorAvailability} />
            <Stack.Screen name="BookAppointment" component={BookAppointment} />
            <Stack.Screen name="PaymentGateway" component={PaymentGateway} />
            <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Settings-DarkMode" component={SettingsDarkMode} />
            <Stack.Screen name="VoiceCall" component={VoiceCall} />
            <Stack.Screen name="DoctorChat" component={DoctorChat} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
            <Stack.Screen name="FamilyOnboarding" component={FamilyOnboarding} />
            <Stack.Screen name="EnhancedSettings" component={EnhancedSettings} />
            <Stack.Screen name="HealthAlerts" component={HealthAlerts} />
            <Stack.Screen name="FamilyHealthDashboard" component={FamilyHealthDashboard} />
            <Stack.Screen name="DMPViewer" component={DMPViewer} />
                                       <Stack.Screen name="DoctorSearch" component={DoctorSearch} />
                   <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} />
                   <Stack.Screen name="DoctorLocation" component={DoctorLocation} />
                   <Stack.Screen name="DoctorMap" component={DoctorMap} />
                   <Stack.Screen name="PatientManagement" component={PatientManagement} />
                   <Stack.Screen name="PaymentBilling" component={PaymentBilling} />
                   <Stack.Screen name="VideoConsultation" component={VideoConsultation} />
                   <Stack.Screen name="Chat" component={ChatSystem} />
                   <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                   <Stack.Screen name="LanguageSettings" component={LanguageSettings} />
                   <Stack.Screen name="DoctorSignUp" component={DoctorSignUp} />
                   <Stack.Screen name="ChangePassword" component={ChangePassword} />
                   <Stack.Screen name="AboutUs" component={AboutUs} />
                   <Stack.Screen name="DMPManagement" component={DMPManagement} />
         </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;