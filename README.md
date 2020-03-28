# Vectus20WebKriti
This is our WebKriti2020 project, we picked the project of Tech Fest Website<br />
TEAM :<br />
1. Hiten Sharma
2. Ankit Kumar
3. Rajat Maheshwari

Hiten Sharma
- I handled the complete backend using Nodejs and mySql.
- The login/register system has password stored in hash using bcrypt and mysql was used to create the database. All events have their individual table.
- I also made the frontend of the Login page, Register page,Dashboard,About Vectus page and team page and the nav bar used in all pages except home page.
- Login,register,about vectus and dashboard uses particles.js which I modified using JSON(you can see the modification on particles.json) Node.js was having some problems in rendering the particles so I uploaded my json file on the site name myJson and used the link to load the json file.
- Dashboard also makes use of GreenSock.js to make the background of "Explore Yourself".
- All the pages made are responsive and we also tried to make as many pages as possible viewable in landscape mode.

Ankit Kumar
- I handled the frontend of the Home page .
- Animations are done using:
  1) Css -
     i) Login/Register Button on home page.
     ii) Glowing lights + Shining stars (using masking).
     iii) Title of fest :- It is an SVG Image having a different path for each letter, which helps us to animate each letter differently.
     (For creating an SVG Image Figma was used).
  2) GreenSock(Javascript Library)
     i) Shooting Stars
     ii) Menu pop-up and pop-down
  3)Using JQuery (Javascript Library)
     i) Ripple Effect at Menu(Effect taken from :-https://github.com/sirxemic/jquery.ripples)


Rajat Maheshwari
- I handled frontend of the Event Page and the pages for every individual event as well as the sponsor page
- I used fonts found online and were open source as fonts for my events Hackathon, Hack-A-Game and Gaming
- For animations, I read up online about how to make custom animations and then implemented them to create animations of entries, exits and hover effects
- I haven't used any libraries as such and implemented everything using HTML,CSS and JavaScript
- I used Event Listeners for window and document. The window event listener made sure that animations only played after page was loaded and the document event listener was used to display appropriate messages for confirmation of login when trying to register for an event.

P.S. nodemon may not work , it did not work on my computer but feel free to try.
Link to it working: https://drive.google.com/open?id=1NFwsAfxE7u2qtYhXLI5BtW623uv3yyTK
