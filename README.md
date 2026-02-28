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