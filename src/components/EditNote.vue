<template>
  <div class="editNote">
    <header> 
      <input id="noteTitle" 
        :value="selectedNote.title"
        placeholder="Add title here..."
        @input="onChangeNote">
    </header>
    <textarea id="noteBody" 
      v-model="selectedNote.body"
      placeholder="Add note here..."
      @input="onChangeNote">
    </textarea>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// TODO: Implement edit note to be able to edit notes
// Need to work with multiple people editing the same note
// Add and update timestap of note and who last made the edit

export default {
  name: 'EditNote',
  computed: {
    ...mapGetters([
      'selectedNote',
      'selectedNoteIndex'
    ]),
  },
  methods: {
    ...mapActions([
      'editNote',
      'sendNotes'
    ]),
    onChangeNote() {
      const title = document.getElementById("noteTitle").value;
      const body = document.getElementById("noteBody").value;
      this.editNote({
        noteIndex: this.selectedNoteIndex, 
        title, 
        body
      });
      // Add this method in the edit notes change
      this.sendNotes()
    }
  }
}
</script>

<style>
.editNote {
  grid-column: 2;
  grid-row: 2;
}

#noteTitle {
  margin: 5px;
  font-size: 30px;
}

#noteBody {
  margin: 5px;
  font-size: 20px;
  width: 95%;
  height: 600px;
}
</style>