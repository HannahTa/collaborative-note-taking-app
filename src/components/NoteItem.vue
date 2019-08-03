<template>
    <li v-on:click="setSelectedNote(noteIndex)">
      Title: {{note.title}}
      <span class='deleteButton' @click="deleteNote(noteIndex)">🗑</span>
    </li>
    <!-- TODO: stop selecting note when trying to delete -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NoteItem',
  props: ['note', 'noteIndex'],
  methods: {
    ...mapActions([
      'setSelectedNote',
      'removeNote',
      'sendNotes'
    ]),
    deleteNote(noteIndex) {
      this.removeNote(noteIndex);
      // TODO: fixed error which occuers when deleteing the note
      // Add this method in the remove notes change
      this.sendNotes()
    }
  }
}
</script>

<style>
.deleteButton {
  font-size: 20px;
  float: right;
}
</style>