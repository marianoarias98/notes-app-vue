<template>
  <div class="container">
    <h1>Notes</h1>
    <div class="notes">
      <div class="note" v-for="note in notes" key="note.id">
        <h4>{{ note.title }}</h4>
        <p>{{ note.content }}</p>
        <button class="btn btn-danger" @click.prevent="DeleteNote(note.id)">X</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import useAuth from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const store = useAuth()
const router = useRouter()
const notes = ref('')

onMounted(async()=>{
  notes.value = await store.getNotes()
})

const DeleteNote = async (id) =>{
  const response = await store.deleteNote(id)
  if(response == 'Note Deleted'){
    alert(response)
    notes.value = await store.getNotes()
  }
}

</script>

<style scoped>
.note {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgb(17, 17, 17);
  border-radius: 10px;
  padding: 16px;
}

.notes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.note:hover{
  background-color: rgb(27, 27, 27);
  cursor: pointer;
  color: white;
}

button{
  display: inline-block;
}
</style>