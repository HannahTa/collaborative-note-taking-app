<template>
  <ul class="notes-list">
    <NoteItem 
      v-for="(note, index) in allNotes"
      :key="index"
      :note="note"
    />
  </ul>
</template>

<script>
// TODO: Show current user on note

import { mapActions, mapGetters } from 'vuex'
import NoteItem from './NoteItem.vue'

export default {
  components: { NoteItem },
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