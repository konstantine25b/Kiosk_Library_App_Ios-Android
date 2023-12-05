import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import BookCategories from "./components/BookCategories";
import ReturnPage from "./components/ReturnPage";
import { QueryClient, QueryClientProvider } from "react-query";
import EachCategoryPage from "./components/EachCategoryPage";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
           
          }}
        />
        <Stack.Screen
          name="Categories"
          component={BookCategories}
          options={{
            title: "Book Categories",
            
            headerTintColor: "#2980b9" ,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
         <Stack.Screen
          name="EachCategory"
          component={EachCategoryPage}
          options={{
            title: "Each Book Categories",
            
            headerTintColor: "#2980b9" ,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
         <Stack.Screen
          name="Return"
          component={ReturnPage}
          options={{
            title: "Return a Book",
            
            headerTintColor: "#2980b9" ,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
  );
}
