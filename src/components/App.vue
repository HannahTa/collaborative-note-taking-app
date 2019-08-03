<template>
  <div class="app">
    Status: {{onlineStatus}}
    <NoteList />
    <EditNote v-if="isNoteSelected"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NoteList from './NoteList.vue'
import EditNote from './EditNote.vue'

export default {
  components: { NoteList, EditNote },
  computed: mapGetters([
    'onlineStatus',
    'isNoteSelected'
  ])
}
</script>

<style>
.app {
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 50px auto;
  grid-gap: 10px;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}

li {
  list-style: none;
  padding: 10px;
  background-color: rgb(241, 241, 241);
  margin: 5px;
  height: 40px;
}
</style>