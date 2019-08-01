<template>
  <div>
    <header>
      Title: 
      <input class="noteTitle" 
        :value="selectedNote.title">
    </header>
    Body: 
    <textarea class="noteBody" 
      v-model="selectedNote.body">
    </textarea>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// TODO: Implement edit note to be able to edit notes
// Need to work with multiple people editing the same note
// Need to send changes across to other conencted users
// Add and update timestap of note and who last made the edit
// Make sure the selected note updates the correct note in the notes array

export default {
  name: 'EditNote',
  computed: mapGetters([
    'selectedNote'
  ]),
  methods: mapActions([
    'editNote'
  ])
}
</script>

<style>
.noteBody {
  width: 200px;
  height: 100px;
}
</style>