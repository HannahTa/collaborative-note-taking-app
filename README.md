# Set-up
```
npm install
npm run build
```

# Questions

## What was your reasoning for implementing the solution they way you have?
- To break down each part of the app into their own component, so each component would have a single role and be reusable.
  - Display a note
  - Display a list of notes
  - An area to edit the note
- Use Vuex to manage state of the app and only allow states to be changed within the store file.
- A single point of reference for the notes and notes data
- Was planning on sending the notes to the service for every change the user makes, so the changes would get echoed back, however if there a multiple users connected and making the same changes, would need to check senarios:
  - What happens if the all connected users change the same place
  - What if users changed the same file, but in different locations
  - What if all users where in seperate files making changes
  - What if a user deletes a note which a current user is editing

---
## How would you manage users going offline and online?
- Use service workers to cache the files so the app can be visable and functional offline
- Track with the socket server if the user is connected or close connection

---
## How would you manage allowing users to continue editing and adding notes when in offline mode and then syncing when they come back online?
- Use local storage to allow users to be able to make changes locally
- Check every so often, an interval or service worker, to know if the user is online again too apply changes which the user has made offline

---
## How would you manage conflicts between edits made by different users to the same note?
When loading the page, check the time stamps of the notes. If the time stamps are not the same for the notes, display a warning for the user and provide them with options 
  - Override changes 
  - Save offline changes as a new note
  - Discard changes

---
## Which part of your solution are you most pleased with? Why?
When you have multiple screens up for the app and you add a note in one of them, then every user note list is updated. This was the main area I was stuggling to get working, as when a user connected and try to get the note list from a current user, the notes array would get overriden with and empty awway when the user was connecting for the first time.

---
## Which part of your solution would you consider improving on if you had the time? Why?
- Improve the layout of how the list notes are presented, displaying on the left hand side of the screen
- Improve how new notes are added. A button/section at the bottom of the note list, when click, adds a new note and show the note in the middle of the screen
- Icons, colour and animations for the online status
- Current users connected on the right hand-side, or a different section on the left-hand side (Selecting the user goes to their current note they are looking at)
- Create own socket server to be able to have more control on the messages which get sent back and forth and to not have overlapping/duplicated socket messages when more than one user is connected (Client side based instead of peer to peer)
- Along with creating my own socket server, user management system in the server so there is one place to manage all of the users and easily get the current connected users

---
## How did you think about security? How would you go about improving the security of the app?
- Add a passcode onto the app on first set-up, so people who knows the pass code can only see the notes
- Parse the text before storing/displaying to avoid XSS and SQL injection
- Keep the notes on a secure network connection

---
Hannah Petherick