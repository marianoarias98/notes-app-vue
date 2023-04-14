<template>
 <form>
  <div class="form-group mb-2">
    <h3 class="mb-4">Create Note</h3>
    <div class="form-group mb-2">
      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Title" v-model="title" maxlength="10" required>
    </div>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content" placeholder="Content" maxlength="100" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary mt-4 mb-4" @click.prevent="createNote">Create</button>
</form>
</template>

<script setup>

import { ref } from 'vue'
import useAuth from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const store = useAuth()
const router = useRouter()
const content = ref('')
const title = ref('')

const createNote = async () =>{
    const response = await store.createNote(title.value,content.value)
    if(response == 'Success'){
        router.push('/dashboard')
    }else{
        alert('ERROR')
    }
}

</script>

<style scoped>
textarea{
    display: block;
    width: 100%;
}
</style>