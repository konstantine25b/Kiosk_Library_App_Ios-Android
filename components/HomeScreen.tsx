import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Animated, StatusBar} from "react-native";
import { BookOpenIcon, BuildingLibraryIcon, ChevronRightIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import colors from "./styles/colors";

type RootStackParamList = {
  Home: undefined;
  Categories: { param1: string; param2: number };
  
  // ... other screen definitions
};

type NavigationProps<T extends keyof RootStackParamList> = {
  navigate(arg0: string, arg1: { param1: string; param2: number; }): void;
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export default function HomePage() {

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    
    // Revert the status bar text color to default when the component unmounts
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);
  const navigation: NavigationProps<'Home'> = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const dynamicStyles = {
    buttonColor: "#3498db",
    iconColor: "blue",
    textColor: "#fff",
    pressedButtonColor: "blue",
    pressedIconColor: "#3498db",
    pressedTextColor: "blue",
  };

  return (
    <Animated.View style={[styles.homePageContainer, { opacity: fadeAnim }]}>
      <View style={styles.servicesContainer}>
        <Text style={styles.title}>
          <BuildingLibraryIcon style={styles.libraryIcon} size={25} color={dynamicStyles.iconColor} />
          Welcome to the Library Kiosk
        </Text>
        <Text style={styles.subtitle}>Explore our services:</Text>
        <Pressable
          style={({ pressed }) => [
            styles.serviceButton,
            { backgroundColor: pressed ? dynamicStyles.pressedButtonColor : dynamicStyles.buttonColor },
          ]}
          onPress={() =>
            navigation.navigate("Categories", { param1: "-1", param2: -1 })
          }
        >
          <BookOpenIcon color={dynamicStyles.iconColor} style={styles.buttonIcon} />
          <Text style={[styles.buttonText, { color: dynamicStyles.textColor }]}>Borrow a Book</Text>
          <ChevronRightIcon size={25} color={dynamicStyles.iconColor} style={styles.icon} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.serviceButton,
            { backgroundColor: pressed ? dynamicStyles.pressedButtonColor : dynamicStyles.buttonColor },
          ]}
          onPress={() =>
            navigation.navigate("Return", { param1: "-1", param2: -1 })
          }
        >
          <BookOpenIcon color={dynamicStyles.iconColor} style={styles.buttonIcon} />
          <Text style={[styles.buttonText, { color: dynamicStyles.textColor }]}>Return a Book</Text>
          <ChevronRightIcon size={25} color={dynamicStyles.iconColor} style={styles.icon} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#427194",
  },
  servicesContainer: {
    backgroundColor: colors.modalBackground,
    padding: 20,
    gap: 20,
    borderRadius: 10,
    shadowColor: colors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  libraryIcon: {
    marginRight: 20,
    width: 40,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  serviceButton: {
    fontSize: 18,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: "space-between", // Align icon to the right
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
    width: 20,
  },
  icon: {
    marginLeft: "auto", // Align the icon to the right
  },
});
