#Library Kiosk (React Native)
The Library Kiosk (React Native) is a mobile application built with React Native and TypeScript, serving as a virtual library where users can explore, borrow, and return books. The back-end is simulated using the mock API provided by mockapi.io.

#Features
Book Browsing:

Users can explore various book categories, each containing a list of books.
Pagination is implemented for easy navigation through a large number of books.
Book Selection:

Users can select a book for borrowing by interacting with the user interface.
A login modal is displayed for authentication before proceeding with the borrowing process.
Authentication:

Users need to log in with a valid username and password to borrow a book.
The system validates user credentials against a mock API.
Borrow Confirmation:

After successful authentication, users receive a confirmation message indicating a successful book borrowing.
Book Return:

Users can return a borrowed book by interacting with the user interface.
A login modal is displayed for authentication before proceeding with the return process.
Return Confirmation:

After successful authentication, users receive a confirmation message indicating a successful book return.
In case of an error or invalid book ID, appropriate error messages are displayed.

#Setup
Clone the repository:

git clone https://github.com/your-username/your-library-kiosk-react-native.git
Navigate to the project directory:

cd your-library-kiosk-react-native

Install dependencies:
npm install

Run the application:
npm start

#Technologies
Front-end:

React Native
TypeScript
React Navigation (for navigation)
React Query (for data fetching)
Emotion (for styling)

Back-end:

mockapi.io (Mocking)

#Pages
1. Homepage
The landing page where users are greeted with two options: "Borrow a Book" and "Return a Book." This serves as the starting point for users, allowing them to choose their desired action.

2. Borrow a Book Page
When users choose the "Borrow a Book" option from the navigation or the homepage, they are seamlessly navigated to the "Borrow a Book" page. This page dynamically fetches book categories using React Query.

2.1 Each Category Books Page
Upon selecting a specific book category, users are directed to the "Each Category Books" page. This page provides detailed information about each book and allows users to borrow.

2.2 Sign Up Modal
The "Sign Up Modal" serves as the gateway for users to create accounts or log in and proceed with the book borrowing process. User Context Hook is used to save selected book data for further use.

2.3 Success and Unsuccessful Modals
The "Success Modal" and "Unsuccessful Modal" provide immediate feedback to users after attempting to create an account or log in.

3. Return Book Page
The "Return Book Page" serves as a platform for users to return borrowed books. It features a form for users to input the book ID.

3.1 Return LogIn Page
Once users submit their login credentials, the system checks the user's existence in the database. Users receive a confirmation message in case of successful login, and an error message appears otherwise.

3.2 Return Confirmation Modal
The "Return Confirmation Modal" provides immediate feedback to users after attempting to return a book.

