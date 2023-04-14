<template>
  <form>
    <h3 class="mb-4">Register</h3>
    <div class="form-group mb-2">
      <label class="mb-1">Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
        placeholder="Enter name" v-model="name">
    </div>
    <div class="form-group mb-2">
      <label class="mb-1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
        placeholder="Enter email" v-model="email">
    </div>
    <div class="form-group mb-2">
      <label class="mb-1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="passwd">
    </div>
    <button type="submit" class="btn btn-primary mt-4" @click.prevent="registerHandler">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import useAuth from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const passwd = ref('')
const store = useAuth()
const router = useRouter()

const registerHandler = async () => {
  const response = await store.register(name.value, email.value, passwd.value)
  if (response.status == true) {
    alert(`Exito ${response.message}`)
    router.push('home')
  } else {
    alert(`Error ${response.message}`)
  }
}
</script>