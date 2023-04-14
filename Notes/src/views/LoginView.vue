<template>
  <form>
    <div class="form-group mb-2">
      <h3 class="mb-4">Sign In</h3>
      <label class="mb-1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
        placeholder="Enter email" v-model="email">
    </div>
    <div class="form-group mb-2">
      <label class="mb-1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="passwd">
    </div>
    <button type="submit" class="btn btn-primary mt-4 mb-4" @click.prevent="loginHandler">Submit</button>
    <p>Don´t you have an account? <RouterLink to="/register">Register</RouterLink>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import useAuth from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const passwd = ref('')
const store = useAuth()
const router = useRouter()

const loginHandler = async () => {
  const response = await store.login(email.value, passwd.value)
  if (response.status == true) {
    // alert("Exito: " + response.message)
    router.push('/dashboard')
  } else {
    alert("Error: " + response.message)
  }
}
</script>

<style>
form {
  background-color: rgb(16, 16, 16);
  padding: 26px;
  border-radius: 10px;
  max-width: 460px;
  margin: auto;
  margin-top: 15vh;
  box-shadow: 0px 1px 3px 1 black;
}
</style>