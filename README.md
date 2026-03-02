# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


in this i want:

1. keep margin padding in mind , the things you have designed are not well spaced and placed. for a responsive website.

 2. there would be separate pages for all the sections (About Skills Projects Experience Contact)

flow:-a. first the user will lend to the bike selection page where he will select bike. no other section would be visible until and unless the user selects the bike.

b. after the selection the user will see a map(that will be a loop of any shape) on the full screen on which destinations and a moving circcle would be their that will indicate in which location we are currently in. no other section would be visible.

c. when the user scroll ,the circular icon will move on to the map that will be locating the locations in order about>Skills> Projects> Experience> Contact(at this point their would be button that will throw back to about section. if clicked)

d. when the user click about section there would be an animation of zoom in to about and then the about page will appear. and if user want to exit there should be button " back to map " to go back to the map. the present state of the user will be map form their it will move ahead.

this will be similar for all the sections. and at the end if user will reach contact, he clicks exit then it will take back to map page . and their if user click back button then it will move to the bike selection page.

3. in that about section there would be a photo of mine (in folder public/my-pfp/pfp) that will be placed at left hand side with a proper about my self paragraph. the pfp image should have floating animations. the text should be written in proper and in a humanized form. 

4. in skills page i want flip card animations on which there would be a tech logo that i have in (public/tech logos folder) then on flip they will show the skill name and a bar that represents how much i know about that.

5. keep the project section same but should have a separate page with proper margin and padding between elements text icons etc.

6. same with experience section should have a separate page with proper margin and padding between elements text icons etc.

7. same with get in touch should have a separate page with proper margin and padding between elements text icons etc.



rules:-

1. it should have protected routes

2. it should be responsive 

3. it should keep margin padding spacing very neat and tidy. avoid overlapping of elements.

4. should have animated icons for this whole project. (refer lord icon,etc)



in this without changing the functionality of the code and just changing the stated ones implement the following 
now in scroll map section:-
1. the scroll should remain same with same functinality
2. the background of this page would be based on the selection of the bike like(for ducati - cheery red, for bmw - mixture of blue white red, for hayabusa, ninja ,agusta- the colors that we have in the themestore respectively).
3. the color of the scroll would be white and the text color is also white for this.

4.align the map contents at the left. their would be  an image at thhe right covering half the width of the page just before the boundary of the map. it will be image of the bike that the user will select in the starting .you choose that image form (public\solo-bike-map-comp) this path. 
5. need a live background animation such that when the user is at the about section and not started scrolling yet ,the biike has its headlights of , as soon as the user starts scrolling the bike headlighht will glow up all teh way to contact. and by crossing the contact on the map the headlight will be switched off. you can choose the image form the (public\solo-bike-map-comp\ducati-img--for ducati) i dont have images just leave a mark so that iwill replace that mark with real image.
6. in the map when we are scrolling the points should be highlited as soon as the moving circle passed the location point.  like fro eg. if it passes the about section it would be highlighted till the half way before the next point . form there it will hiihlight the skill section. do this same thing in whole map wilth all sections.
7. give some sapcing of top content (Scroll to navigate the journey, switch machine) form the top. there is no margine padding given too them form the top .





in this without changing the functionality of the code and just changing the stated ones implement the following 
do this for whole project :-
1. there is no proper margin padding with the boundaries of the container and the text within it .
2. the background color of thhe sbout me section is not matcching with the map section or the bike colors that we have selected. . make the bavkground color similar for all the section of that selected bike (for eg. we have selected ducatii to the background color all the section would become cherry red. this would be the pattern for all the bikes.)
3. the website should be responsive . it should automatically adjust with the size of the screen.
now in about section:-
1. in the animation of riders info ,the background color should match the bike that has been selected by the user and th e text should be white 
2.remove the about me hover animation\

apply the sameparticle theme to all the themes . the common part will be the particle one 