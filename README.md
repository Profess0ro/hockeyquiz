# Hockeyquiz

### A quiz with questions of the fantastic game och hockey!
I want this game to be fun and not be questions about the game and the rules of the game. This will be a game about unique happenings that occur on or off the rink during a hockeygame. So even the people that have a lot of knowledge of the game of hockey will have a challenge. 

[User Stories](#user-stories)<br>
[Wireframes](#wireframes)<br>
[Bugs](#Bugs)<br>
[Resources](#resources)

# User stories
- **Main page:** As a visiting user I will be presented what type of game this is and have the possibility to either start the game or contact the creator.
- **Start Game** As a visitung user I will be inserting my name before the game starts.
- **Contact:** As a visiting user I want to share my feedback to the creator.
- **Game pages:** As a visiting user I´m being presented the question and 4 alternatives as answers, when pressing an answer I will be presented if I choose right or wrong. When I´m playing the game there´s also possibilities to cancel the game by pressing "Main menu". When pressing the button I will be asked if I´m really sure to exit or not.

# Features

- **Main page**:
On the main page there options for the user and there will be an instruction on how this game works. The options for the user are: read the instructions, go to the contact page or start the page.

# Wireframes

<img src="wireframes/start.png"><br>
<img src="wireframes/game.png"><br>
<img src="wireframes/contact.png"><br>

# Testing
`Home Page`

| Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- |
| Contact button | Directed to contact page | Clicked on Contact | Contact page was loaded | Pass |
| Main menu button | No other page shall be visual | Clicked on Main menu | Nothing happened | Pass |
| Play button | Directed to name input page | Clicked on Play | Name input was loaded | Pass |

`Name input`

| Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- |
| Leaving namefield empty | Message be shown when left empty | Left the field empty and clicked Start! | Message told me to fill in my name | Pass |
| Start the game | Question should be displayed when I have filled in a name | Filled in a name and clicked Start! | A question was shown and the quiz started | Pass |
| Main menu | Directed back to home page | Clicked on Main menu | Home page was loaded | Pass | 
| Contact | Directed to contact page | Clicked on Contact | Pass |

`Quiz page`

| Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- |
| Name to scoreboard | The name I filled in before starting <br>shall be visual on scoreboard | Filled in a name and clicked start | The name was on the scoreboard vs. quiz | Pass |
| Timer start countdown from 30 | When quiz starts, the timer shall begin at 30 | Clicked start  | When quiz started the timer started at 30 | Pass |
| Question displays | When quiz starts a random question from the array<br>shall be shown with answer options | Clicked start | A random question from the array <br>was displayed when game started | Pass
| Answering right | - Timer shall stop <br>- Only selected answer shall change color (green) <br>- Point to user<br>- All answers shall be blocked<br>- Button for next question shall be visible | Clicked on right answer | - Timer stopped <br>- Answer changed to green <br>- Point was given to user<br>- All answered was blocked<br>- Button for next question was shown | Pass |
| Answering wrong | - Timer shall stop <br>- Only selected answer shall change color (red) <br>- Point to quiz<br>- All answers shall be blocked<br>- Button for next question shall be visible | Clicked on wrong answer | - Timer stopped <br>- Answer changed to red <br>- Point was given to quiz<br>- All answered was blocked<br>- Button for next question was shown | Pass |
| Timer runs out | - All answer should be blocked<br>- Point to quiz<br>- Button for next question shall be visible | Let the timer run out | - All answer was blocked<br>- Point was given to the quiz<br>- Button for the next question was shown | Pass |
| Quiz stops after 11th question | Since there is more question in the array than 11,<br> button for next question shall not be shown <br>when answered the 11th question | Answered 11th question | Button for next question wasn´t shown | Pass |
| Winning against the quiz | Score more than the quiz and a win message shall be shown | Won against the quiz | Message that I won the game against the quiz | Pass |
| Loosing to the quiz | Score less than the quiz and a loss message shall be shown | Loosing to the quiz | Message that I lost to the quiz | Pass |
| Main menu (during the game) | If 11 questions haven´t been answered:<br>I will be asked if I´m sure to leave?<br>Answering yes will direct me back to main menu.<br>Cancelling should bring me back to the quiz. | Clicked Main menu <br>(during the game) | I was asked to leave the game or not<br>Clicked yes and was directed back to the main menu<br>Cancelled the message and the quiz continued | Pass |
| Main menu (quiz ended) | When 11 questions have been answered:<br>I won´t be asked to leave and directed back to main menu | Clicked Main menu <br>(when game finished) | I wasn´t asked to leave the game<br>and got back to main menu | Pass |
| Contact (during the game)| If 11 questions haven´t been answered<br> I will be asked if I'm sure to leave<br>Answering yes will direct me to the contact page<br>Cancelling should bring me back to the quiz | Clicked Contact <br>(during the game) | I was asked to leave the game or not<br>Clicked yes and was directed to the contact page<br>Cancelled the message and the quiz continued | Pass |
| Contact (quiz ended)| When 11 questions have been answered<br> I won´t be asked if I'm sure to leave. | Clicked Contact <br>(when quiz ended) | I wasn´t asked to leave the game<br>and the contact page was shown | Pass |
| Restart (during the game) | If 11 questions haven´t been answered<br> I will be asked if I´m sure to leave<br>Answering yes will restart the game<br>Cancelling should bring me back to the quiz | Clicked Restart <br>(during the game) | I was asked to leave the game or not<br>Clicked yes and the game restarted with the scoreboard reset<br>Cancelled the message and the quiz continued | Pass |
| Restart (quiz ended) | If 11 questions have been answered<br> I won´t be asked if I´m sure to leave<br>and the game shall restart | Clicked Restart <br>(quiz ended) | I wasn´t asked to leave the game or not<br> and the game restarted with the scoreboard reset | Pass |

`Contact page`

| Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- |
| Facebook link | When clicking on the facebook symbol:<br>the profile of the maker will be shown in a new window | Clicked on the facebook logo | The facebookprofile of the creator was opened in a new window | Pass |
| Instagram link | When clicking on the facebook symbol:<br>the profile of the maker will be shown in a new window | Clicked on the instagram logo | The instagramprofile of the creator was opened in a new window | Pass |
| Name input | Check if namefield has been filled <br>If empty a message will be shown and tell the field was empty | Left the namefield empty and press send | A message told me to fill in the name | Pass |
| Email input empty | Check if emailfield has been filled<br>If empty a message will be shown and tell the field was empty | Left the emailfield empty and press send | A message told me to fill in an email | Pass |
| Email validation | Check if a valid email has been filled<br>If unvalid a message will be shown and tell to fill in a valid email | Filled in a valid & unvalid email | When unvalid email was filled in the field,<br> a message told me to fill in a valid email.<br>When a valid email was filled in the field,<br>no message was shown to me | Pass |
| Message input | Check if message has been filled<br>If empty a message will be shown tell the message was empty | Left messagefield empty | A message told me to fill in the message | Pass |
| Sending feedback | If all inputs have been filled correctly a message will thank<br>and also a thank you email will be recieved in senders inbox | Filled in all fields correctly and clicked send | A message thanked me and I´ve also got a thank you email in my inbox | Pass |





## Bugs 
<img src="readme/bug1.png">

# Validation

# Resources
- Basic structure of the quiz: https://www.youtube.com/watch?v=riDzcEQbX6k
- Javascript codes: https://www.w3schools.com/ and https://codeinstitute.net/ 
- Tutorial for feedback form: https://www.youtube.com/watch?v=BgVjild0C9A
- Background image: https://unsplash.com/
- Header image: https://www.pexels.com/sv-se/
- Favicon: https://favicon.io/emoji-favicons/ice-hockey/
- Facts to the questions:<br> - https://thehockeywriters.com/the-strangest-things-to-ever-happen-in-an-nhl-game/<br>- https://russianmachineneverbreaks.com/2024/04/07/joonas-korpisalo-blinded-by-sun-capitals-senators-game-paused/<br>- https://www.mkewithkids.com/post/hockey-fun-facts/<br>- https://sportlobby.se/hockey/10-fakta-om-hockey-du-aldrig-hort-talas-om/<br>- https://www.electro-mech.com/team-sports/hockey/10-most-bizarre-ice-hockey-incidents/<br>- https://thehockeynews.com/news/nhlers-with-bizarre-birthplaces<br>- https://www.sportskeeda.com/us/nhl/5-nhl-players-played-teams-feat-mike-sillinger<br>- 