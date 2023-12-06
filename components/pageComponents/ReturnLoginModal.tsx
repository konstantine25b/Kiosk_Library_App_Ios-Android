import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import colors from "../styles/colors";

interface ReturnLoginModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.backgroundOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const Modal = styled(View)`
  background-color: ${colors.modalBackground};
  padding: 30px;
  border-radius: 12px;
  width: 400px;
`;

const ModalHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalHeaderText = styled(Text)`
  font-size: 28px;
  color: ${colors.bookTitle};
`;

const CloseButton = styled(Text)`
  font-size: 34px;
  color: ${colors.closeIcon};
`;

const ModalBody = styled(View)`
  margin-bottom: 20px;
`;

const InputLabel = styled(Text)`
  margin-bottom: 8px;
  font-size: 18px;
  color: ${colors.bookTitle};
`;

const Input = styled(TextInput)`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${colors.borderColor};
  border-radius: 6px;
  font-size: 16px;
`;

const LoginButton = styled(TouchableOpacity)`
  background-color: ${colors.bookTitle};
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
  align-items: center;
`;

const LoginButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

const ReturnLoginModal: React.FC<ReturnLoginModalProps> = ({
  onClose,
  onLogin,
}) => {
  // State for storing the entered username
  const [username, setUsername] = useState("");

  // State for storing the entered password
  const [password, setPassword] = useState("");

  // State for storing the list of users fetched from the API
  const [users, setUsers] = useState<
    Array<{ userName: string; Password: string }>
  >([]);

  // Function to fetch user data from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://656ac10ddac3630cf72744fc.mockapi.io/Categories/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUsers(data);
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Event handler for login logic
  const handleLogin = () => {
  
    // Check if the submitted username and password match any user
    const matchedUser = users.find(
      (user) => user.userName === username.toLowerCase() && user.Password === password.toLowerCase()
    );
 
    

    if (matchedUser) {
      // Login successful
      onLogin(username, password);
      onClose();
    } else {
      // Login failed
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
          <ModalHeaderText>Login</ModalHeaderText>
          <CloseButton onPress={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <InputLabel>Username:</InputLabel>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
          <InputLabel>Password:</InputLabel>
          <Input
            value={password}
            onChangeText={ setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
          <LoginButton onPress={handleLogin}>
            <LoginButtonText>Login</LoginButtonText>
          </LoginButton>
        </ModalBody>
      </Modal>
    </ModalOverlay>
  );
};

export default ReturnLoginModal;
