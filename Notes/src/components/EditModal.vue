<template>
  <div class="body">
    <form class="edit-form">
      <div class="form-group mb-2">
        <div class="card-upper">
          <h3>Edit Note</h3>
          <button class="btn btn-danger mt-4 mb-4" @click.prevent="hideModal">X</button>
        </div>
        <div class="form-group mb-2">
          <input type="text" class="form-control" placeholder="Title" v-model="note.title" maxlength="20" required>
        </div>
        <textarea class="form-control" rows="3" v-model="note.content" placeholder="Content" maxlength="100"
          required></textarea>
      </div>
        <button class="btn btn-primary mt-4 mb-4">Edit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import useAuth from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const store = useAuth()
const router = useRouter()
const note = ref('')
const emit = defineEmits()

const props = defineProps({
  note_id: Number
})
onMounted(async () => {
  note.value = await store.show(props.note_id)
})

const hideModal = () =>{
  emit('handleModal')
}
</script>

<style scoped>
.body {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content {
  background-color: rgb(16, 16, 16);
  padding: 10px;
  border-radius: 10px;
}

.edit-form {
  width: 600px;
}

.card-upper{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>