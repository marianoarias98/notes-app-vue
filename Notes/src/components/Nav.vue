<template>
  <header>
    <nav>
      <ul v-if="store.token != null" class="nav">
        <div class="left">
          <li><RouterLink to="/dashboard">Home</RouterLink></li>
          <li><RouterLink to="/create">Create</RouterLink></li>
        </div>
        <div class="right">
          <li @click.prevent="Logout"><RouterLink to="/">Log out</RouterLink></li>
        </div>
      </ul>
      <ul v-else>
      </ul>
    </nav>
  </header>
</template>

<script setup>
  import useAuth from '../stores/auth';
  import { useRoute, useRouter } from 'vue-router'

  const store = useAuth();
  const router = useRouter()

  const Logout = ()=>{
    store.token = null
    router.push('/')
  }
</script>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}

.nav{
  display: flex;
  justify-content: space-between;
}

.left{
  display: flex;
  gap: 10px;
}

nav{
  margin-bottom: 30px;
}
</style>