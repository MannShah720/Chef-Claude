# Chef Bot

## An AI recipe generator app that takes in ingredients and makes a recipe

The user is able to add ingredients by using the text box and also remove them. Once at least 4 ingredients are added, the Hugging Face AI is able to generate a recipe from those ingredients

The app was built with the help of Scrimba's React course.
However, i have added extra features such as:
* "remove ingredients" button
* A loading animation
* A backend to hide the API key safely

From this project, I've learnt about...

State:
- Event listeners
- Using `useState`
- Updating state using a callback function
- Conditional rendering using ternary and `&&`
- Toggling state
- Arrays as a state
- Objects as a state

Forms in React:
- event.preventDefault()
- event.currentTarget()
- FormData()
- Form action in react

State & Props:
- More conditional rendering practice
- Passing state as props
- Setting state from child components
- Shared state
- Managing where state should be held

Backend:
In order to hide my API key safely, i needed to create a backend by using express, dotenv, axios & cors in a server.js file and then placing my API calls in there
