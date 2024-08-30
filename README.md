# React Quiz Application

This project is a quiz application built with React. The application allows users to start a quiz, answer questions within a time limit, and view their results at the end.

## Live

- https://monumental-lokum-6ae8ae.netlify.app/

## Features

- Start the quiz by clicking the "Teste Başla" button.
- 10 questions with multiple-choice answers.
- Each question has a 30-second time limit; if unanswered, it automatically moves to the next question.
- Displays quiz results with correct and incorrect answers at the end.
- Summary of all answers with details on whether the selected answer was correct or incorrect.

## Technologies Used

- React
- JavaScript (ES6+)
- CSS

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deerborg/Question_App.git
   cd react-quiz-app
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and visit `http://localhost:3000` to view the quiz application.

## Application Structure

- **src/components/Start.js**: The starting component of the quiz. Contains the start button and initial instructions.
- **src/components/question/Question.js**: Handles the main quiz logic, including displaying questions, handling user answers, managing the timer, and showing results.
- **src/questions.js**: A list of all questions, options, and correct answers for the quiz.

## How to Use

1. Click on the "Teste Başla" button to start the quiz.
2. Answer each question by clicking on the appropriate option. You have 30 seconds for each question.
3. If you don't answer within 30 seconds, the quiz automatically moves to the next question.
4. At the end of the quiz, a summary will be displayed with your correct and incorrect answers.

## Customization

You can modify the quiz by editing the `questions.js` file:

```js
const questions = [
  {
    question: "Sample question?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
    media: "image.jpg", // Add media files in the `public/assets` folder
  },
  // Add more questions as needed
];
export default questions;
```

- Add or remove questions by modifying the `questions` array.
- Replace `media` with your images or media files located in the `public/assets` folder.
