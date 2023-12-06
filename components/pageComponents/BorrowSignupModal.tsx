import React, { useContext, useState } from "react";
import styled from "@emotion/native";
import { View, Text, TextInput, Pressable } from "react-native";
import { UserContext } from "../../App";
import colors from "../styles/colors";

interface AuthenticationModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  onClose,
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState<string | null>(null);
  const [passwordWarning, setPasswordWarning] = useState<string | null>(null);

  const context = useContext(UserContext);
  const selectedBookInfo = context?.book;

  const handleLogin = () => {
    if (username.length < 5) {
      setUsernameWarning("Username must be at least 5 characters long.");
      return;
    } else {
      setUsernameWarning(null);
    }

    if (password.length < 8) {
      setPasswordWarning("Password must be at least 8 characters long.");
      return;
    } else {
      setPasswordWarning(null);
    }

    onLogin(username, password);
  };

  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
          <Text style={{ fontSize: 25, color: colors.bookTitle }}>
            User Authentication
          </Text>
          <Pressable onPress={onClose}>
            <Text style={{ fontSize: 34, color: colors.closeIcon }}>&times;</Text>
          </Pressable>
        </ModalHeader>
        <ModalBody>
          {selectedBookInfo && (
            <BookInfo>
                
              <BookInfoTitle>{selectedBookInfo.title}</BookInfoTitle>
              <BookInfoDetail>
                <Text style={{ fontWeight: "bold" }}>Author:</Text>{" "}
                {selectedBookInfo.author}
              </BookInfoDetail>
              <BookInfoDetail>
                <Text style={{ fontWeight: "bold" }}>Year:</Text>{" "}
                {selectedBookInfo.year}
              </BookInfoDetail>
              <BookInfoDetail>
                <Text style={{ fontWeight: "bold" }}>Book ID:</Text>{" "}
                {selectedBookInfo.id}
              </BookInfoDetail>
            </BookInfo>
          )}
          <InputLabel>
            Username (min 5 characters):
          </InputLabel>
          <Input
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
          {usernameWarning && <Warning>{usernameWarning}</Warning>}
          <InputLabel>
            Password (min 8 characters):
          </InputLabel>
          <Input
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          {passwordWarning && <Warning>{passwordWarning}</Warning>}
        </ModalBody>
        <ModalFooter>
          <Pressable onPress={handleLogin}>
            <LoginButton>
              <Text style={{ color: "#fff", fontSize: 18 }}>Sign Up</Text>
            </LoginButton>
          </Pressable>
        </ModalFooter>
      </Modal>
    </ModalOverlay>
  );
};

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

const Modal = styled.View`
  background-color: ${colors.modalBackground};
  padding: 30px;
  border-radius: 12px;
  width: 95%; /* Adjust the width as needed */
  height: 80%; /* Adjust the height as needed */
  box-shadow: ${colors.boxShadow};
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalBody = styled.View`
  margin-bottom: 20px;
`;

const BookInfo = styled.View`
  margin-bottom: 20px;
`;

const BookInfoTitle = styled.Text`
  margin: 0;
  font-size: 24px;
  
  color: ${colors.bookTitle};
`;

const BookInfoDetail = styled.Text`
  margin: 5px 0;
  font-size: 17px;
  color: ${colors.black};
`;

const InputLabel = styled.Text`
  margin-top: 16px;
  padding-bottom: 8px;
  color: ${colors.bookTitle};
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  margin-bottom: 0px;
  border: 1px solid ${colors.borderColor};
  border-radius: 6px;
  font-size: 20px;
`;

const ModalFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const LoginButton = styled.View`
  background-color: #3498db;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const Warning = styled.Text`
  color: ${colors.errorText};
  font-size: 16px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

export default AuthenticationModal;
