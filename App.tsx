import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import BookCategories from "./components/BookCategories";
import ReturnPage from "./components/ReturnPage";
import { QueryClient, QueryClientProvider } from "react-query";
import EachCategoryPage from "./components/EachCategoryPage";
import { createContext, useState } from "react";
interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

// Define the type for the BookInfo context
type BookInfo = {
  book: Book | null;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
};

const Stack = createNativeStackNavigator();
export const UserContext = createContext<BookInfo | undefined>(undefined);

const queryClient = new QueryClient();

export default function App() {

  const [book, setBook] = useState<Book | null>(null);

  return (
    <UserContext.Provider value={{ book, setBook }}>
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

              headerTintColor: "#2980b9",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="EachCategory"
            component={EachCategoryPage}
            options={{
              title: "",
              headerTintColor: "#2980b9",
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

              headerTintColor: "#2980b9",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
    </UserContext.Provider>
  );
}
