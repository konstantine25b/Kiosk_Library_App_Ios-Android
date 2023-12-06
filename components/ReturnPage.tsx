import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StatusBar } from "react-native";
import { css } from "@emotion/native";

import colors from "./styles/colors";
import ReturnLoginModal from "./pageComponents/ReturnLoginModal";
import ReturnConfirmationModal from "./pageComponents/ReturnConfirmationModal";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

interface Category {
  name: string;
  id: string;
  books: Book[];
}

interface ReturnBookProps {}

const ReturnBook: React.FC<ReturnBookProps> = () => {
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");

    // Revert the status bar text color to default when the component unmounts
    return () => {
      StatusBar.setBarStyle("default");
    };
  }, []);

  const [bookId, setBookId] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showReturnConfirmationModal, setShowReturnConfirmationModal] =
    useState(false);
  const [returnConfirmationModalData, setReturnConfirmationModalData] =
    useState({
      success: false,
      userName: "",
      bookData: null as Book | null,
      errorMessage: "",
    });

  const handleBookIdChange = (text: string) => {
    setBookId(text);
  };

  const handleSubmit = async () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseReturnConfirmationModal = () => {
    setShowReturnConfirmationModal(false);
  };

  const handleLogin = async (username: string, password: string) => {
    setShowLoginModal(false);

    try {
      const BOOK_CATEGORIES_API =
        "https://656ac10ddac3630cf72744fc.mockapi.io/Categories/Categories";
      const response = await fetch(BOOK_CATEGORIES_API);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const categories: Category[] = await response.json();
      const matchingBook = categories.reduce(
        (foundBook: Book | null, category: Category): Book | null => {
          if (!foundBook) {
            const book = category.books.find((book) => book.id === bookId);
            return book || null;
          }
          return foundBook;
        },
        null
      );
      if (matchingBook) {
        setReturnConfirmationModalData({
          success: true,
          userName: username,
          bookData: matchingBook,
          errorMessage: "",
        });
      } else {
        console.error("Invalid book ID. Please enter a valid book ID.");
        setReturnConfirmationModalData({
          success: false,
          userName: "",
          bookData: null,
          errorMessage: "Invalid book ID. Please enter a valid book ID.",
        });
      }
    } catch (error) {
      console.error("Error fetching book categories:", error);
      setReturnConfirmationModalData({
        success: false,
        userName: "",
        bookData: null,
        errorMessage: "Error fetching book categories",
      });
    }

    setShowReturnConfirmationModal(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Return a Book</Text>
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Book ID:</Text>
          <TextInput
            style={styles.input}
            value={bookId}
            onChangeText={handleBookIdChange}
            placeholder="Enter Book ID"
          />
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </View>
      {showLoginModal && (
        <ReturnLoginModal
          onClose={handleCloseLoginModal}
          onLogin={(username, password) => handleLogin(username, password)}
        />
      )}
      {showReturnConfirmationModal && (
        <ReturnConfirmationModal
          onClose={handleCloseReturnConfirmationModal}
          success={returnConfirmationModalData.success}
          userName={returnConfirmationModalData.userName}
          bookData={returnConfirmationModalData.bookData || undefined}
          errorMessage={returnConfirmationModalData.errorMessage}
        />
      )}
    </>
  );
};

const styles = {
  container: css`
    flex: 1;
    align-items: center;
    background-color: ${colors.borderColor};
    padding: 20px;
  `,
  title: css`
    font-size: 25px;
    color: ${colors.bookTitle};
    margin-top: 100px;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  `,
  form: css`
    width: 85%;
    padding: 20px;
    background-color: ${colors.modalBackground};
    border-radius: 8px;
  `,
  inputLabel: css`
    margin-bottom: 15px;
    color: ${colors.bookInfo};
  `,
  input: css`
    padding: 12px;
    margin-bottom: 16px;
    border-width: 1px;
    border-color: ${colors.borderColor};
    border-radius: 6px;
    font-size: 20px;
  `,
  submitButton: css`
    background-color: ${colors.bookTitle};
    padding: 12px;
    border-radius: 6px;
    margin-top: 16px;
  `,
  buttonText: css`
    color: #fff;
    font-size: 25px;
  `,
};

export default ReturnBook;
