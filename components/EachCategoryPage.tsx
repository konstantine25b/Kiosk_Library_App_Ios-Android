import React, { useContext, useState } from "react";
import styled from "@emotion/native";
import { View, Text, Pressable, StatusBar } from "react-native";
import { UserContext } from "../App";
import colors from "./styles/colors";
import AuthenticationModal from "./pageComponents/BorrowSignupModal";
import BorrowConfirmationModal from "./pageComponents/BorrowConfirmationModal";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

export default function EachCategoryPage({ route }: any) {
  const ITEMS_PER_PAGE = 4;

  const allBooks: Book[] = route.params.param1.books;
  const categoryName =route.params.param1.name

  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const visibleBooks = allBooks.slice(startIdx, endIdx);

  const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAuthenticationModal, setShowAuthenticationModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [borrowSuccess, setBorrowSuccess] = useState(false);

  const context = useContext(UserContext);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleBookSelection = (book: Book) => {
    setSelectedBook(book);
    context?.setBook(book);
    setShowAuthenticationModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthenticationModal(false);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const apiUrl = "https://656ac10ddac3630cf72744fc.mockapi.io/Categories/users";

  const handleLogin = async (username: string, password: string) => {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: username,
        Password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((user) => {
        console.log("New user:", user);
        alert("Sign Up successful!");
        setBorrowSuccess(true);
        setShowConfirmationModal(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Sign Up unsuccessful!");
        setBorrowSuccess(false);
        setShowConfirmationModal(true);
      });

    handleCloseModal();
  };

  return (
    <BooksContainer>
      <CategoryTitle>{categoryName } Books</CategoryTitle>
      <BooksList>
        {visibleBooks.map((book: Book) => (
          <BookItem key={book.id}>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
            <BookYear>{book.year}</BookYear>
            <BookAuthor>Book ID: {book.id}</BookAuthor>
            <SelectButton onPress={() => handleBookSelection(book)}>
              <ButtonText>Select This Book</ButtonText>
            </SelectButton>
          </BookItem>
        ))}
      </BooksList>

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
          <ButtonText>Previous Page</ButtonText>
        </Pressable>
        <PageIndicator>
          <PageIndicatorText>
            Page {currentPage} of {totalPages}
          </PageIndicatorText>
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
          <ButtonText>Next Page</ButtonText>
        </Pressable>
      </PaginationContainer>

      {/* {selectedBook && showAuthenticationModal && (
        <AuthenticationModal
          onClose={handleCloseModal}
          onLogin={(username, password) => handleLogin(username, password)}
        />
      )}
      {showConfirmationModal && (
        <BorrowConfirmationModal
          onClose={handleConfirmationModalClose}
          success={borrowSuccess}
        />
      )} */}
    </BooksContainer>
  );
}

const BooksContainer = styled.View`
  padding: 20px;
  background-color: #f4f4f4;
  flex: 1;
`;

const CategoryTitle = styled.Text`
  font-size: 24px;
  color: ${colors.bookTitle};
  margin-bottom: 20px;
  text-align: center;
`;

const BooksList = styled.ScrollView`
  margin-top: 10px;
`;

const BookItem = styled.View`
  border: 1px solid ${colors.borderColor};
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  position: relative;
  background-color: #fff;
`;

const BookTitle = styled.Text`
  margin: 0;
  font-size: 18px;
  color: ${colors.bookTitle};
`;

const BookAuthor = styled.Text`
  margin: 5px 0 0;
  font-size: 16px;
  color: #2e2c2c;
`;

const BookYear = styled.Text`
  margin: 5px 0 0;
  font-size: 16px;
  color: #888;
`;

const SelectButton = styled.Pressable`
  background-color: ${colors.bookTitle};
  color: #fff;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  position: absolute;
  bottom: 10px;
  right: 50px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const PaginationButton = styled.Pressable`
  background-color: ${colors.bookTitle};
  color: #fff;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
`;

const PageIndicator = styled.View`
  align-self: center;
`;

const PageIndicatorText = styled.Text`
  font-size: 16px;
`;
