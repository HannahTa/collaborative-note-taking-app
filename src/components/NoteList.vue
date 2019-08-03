<template>
  <ul class="notes-list">
    <NoteItem 
      v-for="(note, index) in allNotes"
      :key="index"
      :note="note"
      :noteIndex="index"
    />
    <li>
      <AddNote />
    </li>
  </ul>
</template>

<script>
// TODO: Show current user on note

import { mapActions, mapGetters } from 'vuex'
import NoteItem from './NoteItem.vue'
import AddNote from './AddNote.vue'

export default {
  components: { NoteItem, AddNote },
  computed: mapGetters([
    'allNotes'
  ]),
  methods: {
    addNote (e) {
      const text = e.target.value;

      if (text.trim()) {
        const note = {
          title: "Title",
          body: text
        }

        this.$store.commit('addNote', note);
      }

      e.target.value = '';

      console.log(this.$store.state.notes);
    }
  }
}
</script>

<style>
.notes-list {
  margin: 0px;
  padding: 5px;
  grid-column: 1;
  grid-row: 2;
}
</style>