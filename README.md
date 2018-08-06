# Fitness Nutrition Tracker

Web application to help user track daily food intake and exercise. Main features include food and fitness logging (breakfast, lunch, dinner, snacks, water, exercise) that returns feedback on nutritional values and calorie tracking based on user input. 

## Getting Started

1. Clone master branch on to own computer
2. Change directory into file directory
3. Go onto Firebase Google and create a Firebase project through the Firebase console at https://console.firebase.google.com/
4. From the project overview page, click Add Firebase to web app
5. Copy and  paste your project code snippet into your HTML file
6. In the project directory, install Firebase CLI by entering `npm install -g firebase-tools`
7. Sign into your Google account by entering `firebase login`
8. Initialize a Firebase project and local sever by entering 
`firebase init`
`firebase serve`

## Features
Home Page:
  1. Display your food intake for the selected date (current date as default), which can be adjusted by the date arrows.
  2. Access and add/edit food and water through the add food/water buttons.
  3. Set and display your calorie goal and keep track of your progress throughout the day. 
  4. Display your logged day streak.
  5. Navigation bar to access Home, Nutrition Report, Progress, and Fitness logger.
  
Nutrition Report Page
  1. Display the selected dates totals for nutritional values in list form as well as macro consumption by percentage in a pie chart.
  
Progress Page
  1. Display progress of calorie consumption based on the selected interval (week, month, year)

Exercise Logger
  1. Log exercise by name, duration, and calories burned through this page.
  2. Calories burned are subtracted from total calorie consumption and are displayed on the home page. 

User Profiles
  1. Unique user data for each individual computer. 

## Technologies Used

Front-end
  * HTML/CSS
  * Javascript/jQuery
  * Anime.js
  
APIs
  * Nutritionix
  * Google Firebase
