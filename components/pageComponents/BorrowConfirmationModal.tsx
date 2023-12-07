import React, { useContext } from "react";
import styled from "@emotion/native";
import { View, Text, Pressable } from "react-native";
import { UserContext } from "../../App";
import colors from "../styles/colors";

interface BorrowConfirmationModalProps {
  onClose: () => void;
  success: boolean;
}

const BorrowConfirmationModal: React.FC<BorrowConfirmationModalProps> = ({
  onClose,
  success,
}) => {
  // Access UserContext to get selected book information
  const context = useContext(UserContext);
  const selectedBookInfo = context?.book;

  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
          <HeaderText>{success ? "Borrow Confirmation" : "Error"}</HeaderText>
          <Pressable onPress={onClose}>
            <CloseButton>&times;</CloseButton>
          </Pressable>
        </ModalHeader>
        <ModalBody>
          {success ? (
            <>
              <ConfirmationMessage>
                Book borrowed successfully! 📚
              </ConfirmationMessage>
              {selectedBookInfo && (
                <BookInfo>
                  <BookInfoTitle>{selectedBookInfo.title}</BookInfoTitle>
                  <BookInfoDetail>
                  <BoldText>Author:</BoldText>  {selectedBookInfo.author}
                  </BookInfoDetail>
                  <BookInfoDetail>
                    <BoldText>Year:</BoldText> {selectedBookInfo.year}
                  </BookInfoDetail>
                  <BookInfoDetail>
                    <BoldText>Book ID:</BoldText> {selectedBookInfo.id}
                  </BookInfoDetail>
                </BookInfo>
              )}
            </>
          ) : (
            <ErrorMessage>
              There was an error borrowing the book. Please try again.
            </ErrorMessage>
          )}
        </ModalBody>
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
  z-index: 30;
`;

const Modal = styled.View`
  background-color: ${colors.modalBackground};
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  box-shadow: ${colors.boxShadow};
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  color: ${colors.bookTitle};
`;

const CloseButton = styled.Text`
  font-size: 30px;
  color: ${colors.closeIcon};

`;

const ModalBody = styled.View`
  margin-bottom: 20px;
`;

const ConfirmationMessage = styled.Text`
  color: ${colors.confirmationText};
  font-size: 18px;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.Text`
  color: ${colors.errorText};
  font-size: 18px;
  margin-bottom: 16px;
`;

const BookInfo = styled.View`
  margin-top: 20px;
  border-top-width: 1px;
  border-color: ${colors.black};
  padding-top: 20px;
`;

const BookInfoTitle = styled.Text`
  margin: 0;
  font-size: 20px;
  color: ${colors.bookTitle};
`;

const BookInfoDetail = styled.Text`
  margin: 5px 0;
  font-size: 16px;
  color: ${colors.black};
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

export default BorrowConfirmationModal;
