import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StatusBar } from "react-native";
import { useQuery } from "react-query";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import colors from "./styles/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Interface representing the shape of a book category
interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}
interface Category {
  id: string;
  name: string;
  books: Book
}


type RootStackParamList = {
  Home: undefined;
  Categories: { param1: Category; param2: number };
  // ... other screen definitions
};

type NavigationProps<T extends keyof RootStackParamList> = {
  navigate(arg0: String, arg1: { param1: Category; param2: number; }): void;
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

// URL for fetching book categories from the mock API
const BOOK_CATEGORIES_API =
  "https://656ac10ddac3630cf72744fc.mockapi.io/Categories/Categories";

// Function to fetch book categories from the API
const fetchCategories = async () => {
  try {
    const response = await fetch(BOOK_CATEGORIES_API);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

// Number of items to display per page
const ITEMS_PER_PAGE = 7;

// Main component for displaying book categories
export default function BookCategories() {
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");

    // Revert the status bar text color to default when the component unmounts
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, []);

  const navigation: NavigationProps<'Home'> = useNavigation();

  // Use React Query to fetch book categories
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<Category[]>("bookCategories", fetchCategories);

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start and end indices for the visible categories based on the current page
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;

  // Get the categories to display on the current page
  const visibleCategories = categories?.slice(startIdx, endIdx);

  // Calculate the total number of pages
  const totalPages = Math.ceil((categories?.length || 0) / ITEMS_PER_PAGE);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Loading state
  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  // Error state
  if (isError) {
    return <ErrorContainer>Error fetching data</ErrorContainer>;
  }

  // Render the component
  return (
    <CategoriesContainer>
      {/* Pagination controls */}
      <PaginationContainer>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#2980b9" : "#3498db",
              borderRadius: 8,
              padding: 10,
            },
          ]}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <CategoryText>Previous Page</CategoryText>
        </Pressable>

        {/* Page indicator */}
        <PageIndicator>
          Page {currentPage} of {totalPages}
        </PageIndicator>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#2980b9" : "#3498db",
              borderRadius: 8,
              padding: 10,
            },
          ]}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <CategoryText>Next Page</CategoryText>
        </Pressable>
      </PaginationContainer>

      {/* List of book categories */}
      <CategoriesList>
        <FlatList
          data={visibleCategories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#2980b9" : "#3498db",
                  borderRadius: 8,
                  padding: 10,
                  margin: 10,
                  marginLeft: 20,
                  marginRight: 20,
                },
              ]}
              onPress={() =>
                navigation.navigate("EachCategory", { param1: item, param2: -1 })
              }
            >
              <CategoryText>{item.name}</CategoryText>
            </Pressable>
          )}
        />
      </CategoriesList>
    </CategoriesContainer>
  );
}

// Styled components for better organization and readability

const CategoriesList = styled.View`
  margin-top: 10px;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const CategoriesContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
  padding-bottom: 100px;
  padding-top: 40px;
  background-color: ${colors.modalBackground};
  height: 100%;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  color: ${colors.bookInfo};
`;

const PageIndicator = styled.Text`
  font-size: 16px;
`;

const LoadingContainer = styled.Text`
  font-size: 16px;
  color: ${colors.bookTitle};
  margin-top: 20px;
`;

const ErrorContainer = styled.Text`
  font-size: 16px;
  color: ${colors.bookTitle};
  margin-top: 20px;
`;
