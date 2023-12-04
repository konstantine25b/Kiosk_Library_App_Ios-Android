import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { BookOpenIcon, BuildingLibraryIcon, ChevronRightIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type RootStackParamList = {
  Home: undefined;
  ReturnPage: { param1: string; param2: number };
  // ... other screen definitions
};

type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export default function HomePage() {
  const navigation: NavigationProps<'Home'> = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.homePageContainer, { opacity: fadeAnim }]}>
      <View style={styles.servicesContainer}>
        <Text style={styles.title}>
          <BuildingLibraryIcon style={styles.libraryIcon} size={25} color={"blue"}/>
            Welcome to the Library Kiosk
        </Text>
        <Text style={styles.subtitle}>Explore our services:</Text>
        <Pressable
          style={({ pressed }) => [
            styles.serviceButton,
            { backgroundColor: pressed ? "#2980b9" : "#3498db" },
          ]}
          onPress={() =>
            navigation.navigation.navigate("ReturnPage", { param1: "-1", param2: -1 })
          }
        >
          <BookOpenIcon color={"blue"} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Borrow a Book</Text>
          <ChevronRightIcon size={25} color={"blue"} style={styles.icon} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.serviceButton,
            { backgroundColor: pressed ? "#2980b9" : "#3498db" },
          ]}
          onPress={() => {
            /* Handle onPress for "Return a Book" */
          }}
        >
          <BookOpenIcon color={"blue"} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Return a Book</Text>
          <ChevronRightIcon size={25} color={"blue"} style={styles.icon} />
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
    backgroundColor: "#2b5876",
  },
  servicesContainer: {
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
    borderRadius: 10,
    shadowColor: "#000",
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
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: 18,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: "space-between", // Align icon to the right
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
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
