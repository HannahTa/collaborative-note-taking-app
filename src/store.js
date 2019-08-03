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
  selectedNoteIndex: -1,
  isNoteSelected: false
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

  removeNote (state, noteIndex) {
    state.notes.splice(noteIndex, 1);
  },

  editNote (state, { noteIndex, title, body}) {
    state.notes[noteIndex].title = title;
    state.notes[noteIndex].body = body;
  },

  setSelectedNote (state, index) {
    state.selectedNoteIndex = index;
    state.isNoteSelected = true;
  }
};

const actions = {
  addNote ({ commit }, title, body) {
    commit('addNote', {
      title,
      body
    });
  },

  removeNote ({ commit }, noteIndex) {
    commit('removeNote', noteIndex);
  },

  editNote ({ commit }, {noteIndex, title, body}) {
    commit('editNote', {noteIndex, title, body});
  },

  setSelectedNote ({ commit }, index) {
    commit('setSelectedNote', index);
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
  selectedNoteIndex: state => state.selectedNoteIndex,
  selectedNote(state) {
    if (state.selectedNoteIndex != -1) {
      return state.notes[state.selectedNoteIndex];
    }
    return {
      title: '',
      body: ''
    }
  },
  isNoteSelected: state => state.isNoteSelected,
  // Extend to have websocket connection
  // Will only show offline if service workers have been set-up
  onlineStatus: () => navigator.onLine ? 'Online' : 'Offline', 
  allNotes: state => state.notes,
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});