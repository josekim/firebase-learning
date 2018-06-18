### Firebase Scramble

## Introduction
This is a small project done on a weekend with limited time using Firebase and react as the main technology.  This project was built with createReactApp.  Routing was handled by react-router.  get-unique-permutations was use to create "solutions". Read section for more info.  For Dev tools, used Prettiers and eslint.


## Setup
```
npm install
npm run start
```


## Routing
- localhost:3000/ or "/" is the main page
  + From here you can start a new game and send link to a friend
  + Note that the GameID is randomly generated on each play
- "/game/:ID" is the route for the host player to start a game
- "game/:ID/:player" - the route for the 2nd player to play.  The playerName is driven by the URL so can support multiple players with unique id's

## Components
### Header
- It just contains the name of the game
- I found the CSS online somewhere(I take no credit for it)

### Letter
- just returns the letter encaplulated in a Div with class name
- again the css is found online - i didn't make that

### Start
- This is the landing page
- Short Introduction
- 2 links, 1 for host and 1 for the player2

### TypingField
- takes a prop Board
- state has 2 state, input and board
- Initially board was put in feature of allowing only letters that were available, but that feature was abandoned due to time constraints
- HandleOnChange - handle updating input value
- handleOnEnter - looks for the keypress on enter - sends the input value up to handle submit and then clears input

### ScoreBoard
- allows for the score board to have multiple players, however players are only shown once they score
- also shows which words have been used up

### Player
- If i had time, i would go back and refactor Game to be used, since most of the stuff is used, but for sake of complexity and ease of development, time constraints, i just made an extra component for simplicity

### App
- contains the Firebase init code
- contains all the routing
- used a render function on the routes to be able to pass firebase as a prop.
- page404 for routes that don't exit

## Game Component
- is the most complex potion
- renders a start Button
- Renders the board using Letters
- renders TypingField
- renders ScoreBoard
### State
- There are 4 states are are managed
- gameID - determined from the route, passed to the FireBase to access the correct Game
- Board - this is the Letters that are used for the Game
- Time - the amount of time left for the game
- Solution - its an object where the keys are the solutions that contain players Name that found the word
- timer - holds the callback for setInterval
### ComponentDidMount
- Set the board to LetsPlay
- Sends the new board to Firebase
- creates Event listener on firebase
  + This listeners calls update
### Update
- Whenever the event listener hears an update from the Database, it will update the state of the game component
### createRandomLetters
- Generate the board for us
- Takes 2 letters from vowels and consonants
- fill the rest of the letter with any letter
- randomizes the letters and returns it

### Timer
- when Start Game is pressed timer is called
- first check if a timer exists, if it does, don't do anything
- If no timer, than start the timer
- Creates the board with call to createRandomLetters
- Then call GetSolution, passing it board to get a "solution"
- Timer is now set with a setInterval, with call back to updateTimer
- Database is now set with the Time, Solution and Board
- state is Set to give it all the information and timer

### UpdateTimer
- called every second to update the timer and send the time to the database
- when the time hits 0, the timerCallback is cleared.  

### getSolution
- look at explanation in get-unique-permutations
- returns a Object solution where the keys are words that point to players names

### NotIncluded
- Simple function that checks if a words has been used already
- it checks the solutions to see if the key has a username

### HandleOnSubmit
- This is passed down to TypingField Component
- It allows for the word to be checked against the solution and then passed to the database if it is valid
- 

## get-unique-permutations
This was used as to generate "solutions."  Originally I was hoping to either hit an API to get all the Possible words. However this seemed a little out of the context as dictionary was not required.  So i chose to generate "Solutions" from permutations of leters 3 - 6.  I realize these are not actual words. Using these permutations which are given to me an array, i make this array into object with each words as a key. The key then contains a players name or null if no player has claimed that word
```
solution = [bad, abd, etc..]
solutionObject = {bad:player1, abd:player 2, dba : "", etc}
```

