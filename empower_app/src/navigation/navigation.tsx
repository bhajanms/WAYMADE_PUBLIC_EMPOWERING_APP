/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ForgotComponent from '../screens/generalscreens/forgot/forgot';
import HomeComponent from '../screens/bottomstackscreens/homestack/home/home';
// import SendOtpScreen from '../screens/bottomstackscreens/homestack/verify/send';
// import VerifyOtpScreen from '../screens/bottomstackscreens/homestack/verify/verify';
import SettingsListComponent from '../screens/bottomstackscreens/settingstack/settingsList/settingsList';
import FaqComponent from '../screens/bottomstackscreens/settingstack/faq/faq';
import WishlistComponent from '../screens/bottomstackscreens/settingstack/wishlist/wishlist';
import LoanComponent from '../screens/bottomstackscreens/settingstack/loan/loan';
import GuidenceComponent from '../screens/bottomstackscreens/settingstack/guidence/guidence';
import LoanApllicationComponent from '../screens/bottomstackscreens/settingstack/loanapplication/loanapplication';
import ChangepswdComponent from '../screens/bottomstackscreens/settingstack/changepswd/changepswd';
import AddcourseComponent from '../screens/bottomstackscreens/settingstack/addcourse/addcourse';
import LoginComponent from '../screens/generalscreens/login/login';
import RegisterComponent from '../screens/generalscreens/register/register';
import Colors from '../utils/colors';
import HomestartComponent from '../screens/bottomstackscreens/homestack/homestart/homestart';
import ProductpageComponent from '../screens/bottomstackscreens/homestack/productpage/productpage';
import BuynowComponent from '../screens/bottomstackscreens/homestack/buynow/buynow';
import SellerRegisterComponent from '../screens/bottomstackscreens/sellerstack/sellerRegister/sellerRegister';
import CompanyFormComponent from '../screens/bottomstackscreens/sellerstack/companyForm/companyForm';
import SellerDashboardComponent from '../screens/bottomstackscreens/sellerstack/sellerDashboard/sellerDashboard';
import ProfileInfoComponent from '../screens/bottomstackscreens/sellerstack/profileInfo/profileInfo';
import AddProductComponent from '../screens/bottomstackscreens/sellerstack/addProduct/addProduct';
import ViewProductComponent from '../screens/bottomstackscreens/sellerstack/viewProduct/viewProduct';
import AccountViewComponent from '../screens/bottomstackscreens/accountstack/accountview/accountview';
import EditProfileComponent from '../screens/bottomstackscreens/accountstack/editprofile/editprofile';
import CartComponent from '../screens/bottomstackscreens/orderstack/cart/cart';
import LearnComponent from '../screens/bottomstackscreens/learnstack/learn/learn';

// import SellerAttachment from '../screens/bottomstackscreens/sellerstack/';

const BottomTab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTitle: '',
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreens}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ExploreTab"
        component={ExploreScreens}
        options={{
          title: 'Orders',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="truck"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="SearchTab"
        component={SearchScreens}
        options={{
          title: 'Account',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="user"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="SellerAttachmentTab"
        component={SellerAttachmentScreens}
        options={{
          title: 'seller',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="credit-card"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="FolderTab"
        component={FolderScreens}
        options={{
          title: 'Learn',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="book"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileScreens}
        options={{
          title: 'Setting',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="navicon"
              size={size}
              color={focused ? Colors.primary : Colors.black}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const AuthStack = createStackNavigator();

export function AuthScreens() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}>
      <AuthStack.Screen name="Login" component={LoginComponent} />
      <AuthStack.Screen name="Register" component={RegisterComponent} />
      <AuthStack.Screen name="Forgot" component={ForgotComponent} />
    </AuthStack.Navigator>
  );
}

const RootStack = createStackNavigator();

export function RootScreens() {
  return (
    <RootStack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Root" component={BottomTabs} />
    </RootStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

export function HomeScreens() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <HomeStack.Screen name="Home" component={HomeComponent} />
      <HomeStack.Screen name="Homestart" component={HomestartComponent} />
      <HomeStack.Screen name="Productpage" component={ProductpageComponent} />
      <HomeStack.Screen name="Buynow" component={BuynowComponent} />

      {/* <HomeStack.Screen name="Send" component={SendOtpScreen} />
      <HomeStack.Screen name="Verify" component={VerifyOtpScreen} /> */}
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

export function ExploreScreens() {
  return (
    <ExploreStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      {/* <ExploreStack.Screen name="Home" component={HomeComponent} /> */}
      <ExploreStack.Screen name="Cart" component={CartComponent} />
    </ExploreStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

export function SearchScreens() {
  return (
    <SearchStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      {/* <SearchStack.Screen name="Home" component={HomeComponent} /> */}
      <SearchStack.Screen name="AccountView" component={AccountViewComponent} />
      <SearchStack.Screen name="EditProfile" component={EditProfileComponent} />

    </SearchStack.Navigator>
  );
}

// New stack for SellerAttachment
const SellerAttachmentStack = createStackNavigator();

export function SellerAttachmentScreens() {
  return (
    <SellerAttachmentStack.Navigator
      initialRouteName="SellerAttachment"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <SellerAttachmentStack.Screen name="SellerRegister" component={SellerRegisterComponent} />
      <SellerAttachmentStack.Screen name="CompanyForm" component={CompanyFormComponent} />
      <SellerAttachmentStack.Screen name="SellerDashboard" component={SellerDashboardComponent} />
      <SellerAttachmentStack.Screen name="ProfileInfo" component={ProfileInfoComponent} />
      <SellerAttachmentStack.Screen name="AddProduct" component={AddProductComponent} />
      <SellerAttachmentStack.Screen name="ViewProduct" component={ViewProductComponent} />
    </SellerAttachmentStack.Navigator>
  );
}

const FolderStack = createStackNavigator();

export function FolderScreens() {
  return (
    <FolderStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      {/* <FolderStack.Screen name="Home" component={HomeComponent} /> */}
      <FolderStack.Screen name="Learn" component={LearnComponent} />
    </FolderStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

export function ProfileScreens() {
  return (
    <ProfileStack.Navigator
      initialRouteName="SettingList"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <ProfileStack.Screen
        name="SettingList"
        component={SettingsListComponent}
      />
      <ProfileStack.Screen
        name="Faq"
        component={FaqComponent}
      />
      <ProfileStack.Screen
        name="Wishlist"
        component={WishlistComponent}
      />
      <ProfileStack.Screen name="Loan" component={LoanComponent} />
      <ProfileStack.Screen name="LoanApplication" component={LoanApllicationComponent} />
      <ProfileStack.Screen name="Changepswd" component={ChangepswdComponent} />
      <ProfileStack.Screen name="Guidence" component={GuidenceComponent} />
      <ProfileStack.Screen name="Addcourse" component={AddcourseComponent} />

    </ProfileStack.Navigator>
  );
}