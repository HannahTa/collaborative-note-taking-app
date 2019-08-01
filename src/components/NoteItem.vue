<template>
    <li v-on:click="setSelectedNote(note)">
      Title: {{note.title}} Body: {{note.body}}
      <button @click="removeNote(note)">Delete</button>
    </li>
    <!-- TODO: stop selecting note when trying to delete -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NoteItem',
  props: ['note'],
  methods: {
    ...mapActions([
      'setSelectedNote',
      'removeNote'
    ])
  }
}
</script>