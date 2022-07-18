# rock-paper-scissors
Proof of concept of Spring Boot + Angular


Created thanks to the tutorials of Baeldung

https://www.baeldung.com/spring-boot-angular-web

## Keywords to understand the code
- Hand Shape: Shape of the hand, actions of the game: rock paper scissors.
- Game: Logic related to the game. Includes the hand shape list and rounds.
- Fight Round Result: result of a single round of the game. Includes two booleans to handle the three results: isTie and isUserVictory.
- Outcome: Win, Loss or TIe
- Match: one-to-many relationship between Match <- Round. One match includes multiple rounds.
- Metrics: stats of the game.
- DTO: Data Transfer Object. Prevents sending entities directly to Frontend.
- Mapper: Maps Entities to DTOs
- Dd: Dictionaries. Used to store fixed data, for example hand shapes and round results.

## How to build
The frontend and backend are not a single build and must be started separatedly.

Developed using VS Code with the extensions "Spring Tools" and "Extension Pack for Java"

#### Run Spring Boot
You need to install Java JDK 17
The root folder is a Spring Boot application so it's ran by pressing F5 from the VS Code

#### Run Angular
The folder "Presentation" includes the source code for the Angular project. To run it, you need to install node

Then install the dependencies running the command "npm i" from the CMD.

Finally, after it's installed run "npm start".

To run tests you can run "npm test".

#### Access application
After starting the Spring Boot app and the Angular client you can access it by the default Angular url http://localhost:4200
