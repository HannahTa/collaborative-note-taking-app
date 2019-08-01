<template>
  <div>
    Status: {{onlineStatus}}
    <div>
    <input class="new-note-title"
    autofocus
    autocomplete="false"
    placeholder="Add note title and press enter"
    @keyup.enter="addNote"
    >
    </div>
    <!-- TODO: Make creating a note nicer for the user -->
    <NoteList />
    <EditNote />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NoteList from './NoteList.vue'
import EditNote from './EditNote.vue'

export default {
  components: { NoteList, EditNote },
  methods: {
    ...mapActions([
      'sendNotes'
    ]),
    addNote (e) {
      const text = e.target.value;

      if (text.trim()) {
        const note = {
          title: text,
          body: ""
        }

        this.$store.commit('addNote', note);
        this.sendNotes()
      }

      e.target.value = '';
    }
  },
  computed: mapGetters([
    'onlineStatus'
  ])
}
</script>