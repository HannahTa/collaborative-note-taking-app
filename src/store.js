import Vue from 'vue'
import Vuex from 'vuex'

export const STORAGE_KEY = "HP-collab-note-app";

Vue.use(Vuex);

const ws = new WebSocket('wss://wss-echo-testing-challenge.prodpad.com');

// TODO: A way to keep track of the list of users connected
// Preference, keep track of the users service side
// Store notes on server side, so a single source of truth
// Easier to get notes when a user connects if store on server side

const state = {
  notes: [],
  selectedNote: { title: "", body: "" }
  // Use localStorage to store notes
  //JSON.parse(window.localStorage.getItem(STORAGE_KEY) || [])
};

ws.onopen = (ev) => {
  const packet = {
    header: 'Get'
  }
  ws.send(JSON.stringify(packet));
};

ws.onmessage = (ev) => {
  let recivedPacket = JSON.parse(ev.data)
  switch (recivedPacket.header) {
    case 'Get':
      const sendPacket = {
        header: 'Send',
        notes: state.notes
      }
      ws.send(JSON.stringify(sendPacket)); 
      // Everytime a user connects, a send functin would be sent for each user
      // Could have one user become the host and if they are the host, only call
      // the send packets
      break;
    case 'Send':
      // Stops empty packets from overriding the notes
      // If all notes are deleted, the notes would never get cleared because of this check
      if (recivedPacket.notes.length > 0) {
        state.notes = recivedPacket.notes;
      }
      break;
  }
};

// Mutations will only be able to change the store states
const mutations = {
  addNote (state, note) {
    state.notes.push(note);
  },

  removeNote (state, note) {
    state.notes.splice(state.notes.indexOf(note), 1);
  },

  editNote (state, { note, body = note.body}) {
    note.body = body;
  },

  setSelectedNote (state, note) {
    state.selectedNote = note;
    return state.selectedNote;
  }
};

const actions = {
  addNote ({ commit }, title, body) {
    commit('addNote', {
      title,
      body
    });
  },

  removeNote ({ commit }, note) {
    commit('removeNote', note);
  },

  editNote ({ commit }, {note, body}) {
    commit('editNote', {note, body});
  },

  setSelectedNote ({ commit }, note) {
    commit('setSelectedNote', note);
  },

  sendNotes () {
    const sendPacket = {
      header: 'Send',
      notes: state.notes
    }
    ws.send(JSON.stringify(sendPacket));
  }
};

const getters = {
  selectedNote: state => state.selectedNote,
  // Extend to have websocket connection
  // Will only show offline if service workers have been set-up
  onlineStatus: () => navigator.onLine ? 'Online' : 'Offline', 
  allNotes: state => state.notes
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});