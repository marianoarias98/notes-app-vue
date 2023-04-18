<template>
  <div class="container">
    <h1>Notes</h1>
    <div class="notes">
      <div class="note" v-for="(note, index) in notes" :key="index">
        <div class="card-upper">
          <h4>{{ note.title }}</h4>
          <div class="buttons">
            <button class="btn btn-warning edit-button" @click="handleModal(), handleID(note.id)">E</button>
            <button class="btn btn-danger delete-boton" @click.prevent="DeleteNote(note.id, index)">X</button>
          </div>
        </div>
        <p>{{ note.content }}</p>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <EditModal v-if="showModal" :note_id="modalNoteID" @handleModal="handleModal"/>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useAuth from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'
import EditModal from '../components/EditModal.vue';

const store = useAuth()
const router = useRouter()
const notes = ref('')
const showModal = ref(false)
const modalNoteID = ref('')

onMounted(async () => {
  notes.value = await store.getNotes()
})

const DeleteNote = async (id, index) => {
  const response = await store.deleteNote(id)
  notes.value.splice(index, 1)
}

const handleModal = () => {
  showModal.value = !showModal.value
}

const handleID = (note_id) =>{
  modalNoteID.value = note_id
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
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.note:hover {
  background-color: rgb(27, 27, 27);
  cursor: pointer;
  color: white;
}

button {
  display: inline-block;
}

.delete-boton,
.edit-button {
  height: 35px;
  width: 35px;
  text-align: center;
}

.card-upper {
  display: flex;
  justify-content: space-between;
}

.buttons {
  display: flex;
  gap: 6px;
}
</style>