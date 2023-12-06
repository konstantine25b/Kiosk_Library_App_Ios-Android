<img width="1440" alt="Screenshot 2023-12-06 at 21 51 24" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/7fd3f83f-6f71-4ae5-af87-12ba8cfb5e69"><img width="1440" alt="Screenshot 2023-12-06 at 21 48 27" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/4ea3b5d6-4126-4970-9ddf-1e290106579d"># Library Kiosk (React Native) 
The Library Kiosk (React Native) is a mobile application built with React Native and TypeScript, serving as a virtual library where users can explore, borrow, and return books. The back-end is simulated using the mock API provided by mockapi.io.

# Features Book Browsing:

Users can explore various book categories, each containing a list of books. Pagination is implemented for easy navigation through a large number of books. Book Selection:

Users can select a book for borrowing by interacting with the user interface. A login modal is displayed for authentication before proceeding with the borrowing process. Authentication:

Users need to log in with a valid username and password to borrow a book. The system validates user credentials against a mock API. Borrow Confirmation:

After successful authentication, users receive a confirmation message indicating a successful book borrowing. Book Return:

Users can return a borrowed book by interacting with the user interface. A login modal is displayed for authentication before proceeding with the return process. Return Confirmation:

After successful authentication, users receive a confirmation message indicating a successful book return. In case of an error or invalid book ID, appropriate error messages are displayed.

# Setup 

Clone the repository:
git clone https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android.git

Navigate to the project directory:
cd your-library-kiosk-react-native

Install dependencies: 
npm install

Run the application:
npx expo start

# Technologies Front-end:

React Native,
TypeScript,
React Navigation/Native (for navigation),
React Query (for data fetching), 
Emotion (for styling)

Back-end:

mockapi.io (Mocking)

# Pages

Homepage The landing page where users are greeted with two options: "Borrow a Book" and "Return a Book." This serves as the starting point for users, allowing them to choose their desired action.
<img width="1440" alt="Screenshot 2023-12-06 at 21 48 27" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/e5943670-0d22-41c8-a2ce-538fc664b938">

2. Borrow a Book Page When users choose the "Borrow a Book" option from the navigation or the homepage, they are seamlessly navigated to the "Borrow a Book" page. This page dynamically fetches book categories using React Query.
<img width="1440" alt="Screenshot 2023-12-06 at 21 48 42" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/52a9da92-c6aa-4e19-bfdb-b31016b24d25">


2.1 Each Category Books Page Upon selecting a specific book category, users are directed to the "Each Category Books" page. This page provides detailed information about each book and allows users to borrow.
<img width="1440" alt="Screenshot 2023-12-06 at 21 49 07" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/ea72d4d1-65fa-4a4e-be0f-0a91d2fff919">

2.2 Sign Up Modal The "Sign Up Modal" serves as the gateway for users to create accounts or log in and proceed with the book borrowing process. User Context Hook is used to save selected book data for further use.
<img width="1440" alt="Screenshot 2023-12-06 at 21 49 54" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/b5bbdf99-bb58-4973-bd74-433cbdf27af9">

2.3 Success and Unsuccessful Modals The "Success Modal" and "Unsuccessful Modal" provide immediate feedback to users after attempting to create an account.
<img width="1440" alt="Screenshot 2023-12-06 at 21 50 26" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/32ec22e7-4acc-4cbe-b60b-d9495d875d0a">

3. Return Book Page The "Return Book Page" serves as a platform for users to return borrowed books. It features a form for users to input the book ID.
<img width="1440" alt="Screenshot 2023-12-06 at 21 50 52" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/544cfdbc-ec09-42bb-9dd8-a5f13e8b631a">

3.1 Return LogIn Page Once users submit their login credentials, the system checks the user's existence in the database. Users receive a confirmation message in case of successful login, and an error message appears otherwise.
<img width="1440" alt="Screenshot 2023-12-06 at 21 51 24" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/06eb4d58-6fea-4ae5-8ed3-59aaab1da832">

3.2 Return Confirmation Modal The "Return Confirmation Modal" provides immediate feedback to users after attempting to return a book.
<img width="1440" alt="Screenshot 2023-12-06 at 21 51 40" src="https://github.com/konstantine25b/Kiosk_Library_App_Ios-Android/assets/102245292/d0bd5970-6cd4-4d5b-a395-5bc154cf7b7b">
