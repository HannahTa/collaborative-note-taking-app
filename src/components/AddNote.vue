<template>
  <span @click="addNote">➕ Add Note</span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'sendNotes',
      'setSelectedNote'
    ]),
    addNote (e) {
      const note = {
        title: "",
        body: ""
      }
      this.$store.commit('addNote', note);
      // Add this method in the add notes change
      this.sendNotes()
    }
  }
}
</script>