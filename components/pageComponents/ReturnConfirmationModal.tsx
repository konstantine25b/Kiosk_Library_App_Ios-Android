import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import colors from "../styles/colors";

interface ReturnConfirmationModalProps {
  onClose: () => void;
  success: boolean;
  userName?: string;
  bookData?: {
    id: string;
    title: string;
    author: string;
    year: number;
  } | null;
  errorMessage?: string;
}

const fontSize = {
  small: 14,
  regular: 18,
  large: 20,
  extraLarge: 24,
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

const CloseButton = styled(Text)`
  font-size: ${fontSize.extraLarge}px;
  color: ${colors.closeIcon};

  font-size: 30px;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  color: ${colors.bookTitle};
`;

const ModalBody = styled(View)`
  margin-bottom: 20px;
`;

const ConfirmationMessage = styled(Text)`
  color: ${colors.confirmationText};
  font-size: 17px;
  margin-bottom: 16px;
  
`;

const ErrorMessage = styled(Text)`
  color: ${colors.errorText};
  font-size: 17px;
  margin-bottom: 16px;
`;

const BookDetails = styled(View)`
  margin-top: 17px;
`;

const ReturnConfirmationModal: React.FC<ReturnConfirmationModalProps> = ({
  onClose,
  success,
  userName,
  bookData,
  errorMessage,
}) => {
  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
        <HeaderText>{success ? "Return Confirmation" : "Error"}</HeaderText>
          <TouchableOpacity onPress={onClose}>
            <CloseButton>&times;</CloseButton>
          </TouchableOpacity>
        </ModalHeader>
        <ModalBody>
          {success ? (
            <>
              <ConfirmationMessage>
                Book returned successfully! 📚
              </ConfirmationMessage>
              {userName && (
                <Text style={{ fontSize: fontSize.regular }}>
                  User: {userName}
                </Text>
              )}
              {bookData && (
                <BookDetails>
                  <Text>
                    <Text
                      style={{ fontWeight: "bold", fontSize: fontSize.regular }}
                    >
                      Title:
                    </Text>{" "}
                    {bookData.title}
                  </Text>
                  <Text>
                    <Text
                      style={{ fontWeight: "bold", fontSize: fontSize.regular }}
                    >
                      Author:
                    </Text>{" "}
                    {bookData.author}
                  </Text>
                  <Text>
                    <Text
                      style={{ fontWeight: "bold", fontSize: fontSize.regular }}
                    >
                      Year:
                    </Text>{" "}
                    {bookData.year}
                  </Text>
                </BookDetails>
              )}
            </>
          ) : (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
        </ModalBody>
      </Modal>
    </ModalOverlay>
  );
};

export default ReturnConfirmationModal;
