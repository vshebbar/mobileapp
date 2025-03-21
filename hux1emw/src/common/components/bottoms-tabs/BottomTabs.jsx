import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Due from "../../../tabs/Due";
import FindAPro from "../../../tabs/FindAPro";
import Home from "../../../tabs/Home";
import Profile from "../../../tabs/Profile";
import PunchList from "../../../tabs/PunchList";
import { useTheme } from "../../context/theme-provider/ThemeProvider";
import HomeIcon from "../../../../assets/images/favicon.png";
import Huxedo from "../../../tabs/Huxedo";

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ route, focused, color, navigation }) => {
  const { theme } = useTheme();
  const routeIcons = {
    Huxedo: { isCustomIcon: true, icon: HomeIcon, component: Ionicons },
    "Find a Pro": { icon: ["engineering", "engineering"], component: MaterialIcons },
    Due: { icon: ["alarm-outline", "alarm"], component: Ionicons },
    Punchlist: { icon: ["list-circle-outline", "list-circle"], component: Ionicons },
    Profile: { icon: ["person-outline", "person"], component: Ionicons },
  };

  const { isCustomIcon, icon, component: IconComponent } = routeIcons[route.name] || {};
  const iconName = icon ? icon[focused ? 1 : 0] : "";

  const animatedWidth = new Animated.Value(focused ? 120 : 40); // Active tabs wider
  const animatedOpacity = new Animated.Value(focused ? 1 : 0); // Text appears only for active tab

  return (
    <TouchableOpacity
      style={[styles.iconContainer, { flex: focused ? 1.8 : 1 }]} // Expands active tab
      activeOpacity={0.7}
      onPress={() => navigation.navigate(route.name)} // Ensures tab switch on tap
    >
      {focused ? (
        <Animated.View style={[styles.activeTabWrapper, { width: animatedWidth }]}>
          <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.activeTab}>
            {isCustomIcon ? <Image source={icon} style={{ width: 28, height: 28 }} /> : <IconComponent name={iconName} size={28} color={theme.text} />}
            <Animated.Text style={[styles.activeLabel, { opacity: animatedOpacity, color: theme.text }]}>{route.name}</Animated.Text>
          </LinearGradient>
        </Animated.View>
      ) : (
        <View>{isCustomIcon ? <Image source={icon} style={{ width: 28, height: 28 }} /> : <IconComponent name={iconName} size={28} color={color} />}</View>
      )}
    </TouchableOpacity>
  );
};

const BottomTabs = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, focused }) => <CustomTabIcon route={route} focused={focused} color={color} navigation={navigation} />,
        tabBarStyle: [styles.tabBarStyle, { backgroundColor: theme.backgroundLevel1 }],
        tabBarShowLabel: false, // Hide default labels
        headerShown: false,
      })}
    >
      <Tab.Screen name="Huxedo" component={Huxedo} />
      <Tab.Screen name="Find a Pro" component={FindAPro} />
      <Tab.Screen name="Punchlist" component={PunchList} />
      <Tab.Screen name="Due" component={Due} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 75, // Adjusted height for better fit
    borderRadius: 20,
    elevation: 0, // Remove shadow (Android)
    borderTopWidth: 0, // Removes the default top border
    shadowColor: "transparent",
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabWrapper: {
    borderRadius: 25,
    overflow: "hidden",
  },
  activeTab: {
    flexDirection: "row", // Ensure text and icon are in a row
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    // minWidth: 100, // Active tab takes more space
    maxWidth: 100, // Active tab takes more space
    minHeight: 50,
    paddingHorizontal: 12,
  },
  activeLabel: {
    // fontSize: 13,
    fontWeight: "bold",
    marginLeft: 6, // Proper spacing between icon and text
  },
});

export default BottomTabs;
