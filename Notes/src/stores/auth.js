import { defineStore } from 'pinia'

const useAuth = defineStore('auth', {
  state: () => {
    return {
      token: null,
      urlServe: 'http://127.0.0.1:8000/api'
    }
  },
  actions: {
    async register(name, email, password) {
      const url = this.urlServe + '/auth/register'
      const rawresponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Accept': 'Application/json'
        },
        body: JSON.stringify({
          'name': name,
          'email': email,
          'password': password
        })
      })
      const response = await rawresponse.json()
      if (response.status == true) {
        this.token = response.token
      } else {
      }
      return response
    },
    async login(email, password) {
      const url = `${this.urlServe}/auth/login`
      const rawresponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Accept': 'Application/json'
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        })
      })

      const response = await rawresponse.json()
      if (response.status == true) {
        this.token = response.token
      } else {
        this.token = null
      }

      return response
    },
    async getNotes() {
      const url = `${this.urlServe}/note`
      const rawresponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
          'Accept': 'Application/json',
          'Authorization': `Bearer ${this.token}`
        },
      })

      const response = await rawresponse.json()
      return response
    },
    async createNote(title, content) {
      const url = `${this.urlServe}/note`
      const rawresponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Accept': 'Application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          'content': content,
          'title': title
        })
      })

      const response = await rawresponse.json()
      return response.message
    },
    async deleteNote(id) {
      const url = `${this.urlServe}/delete`
      const rawresponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Accept': 'Application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          'id': id
        })
      })

      const response = await rawresponse.json()
      return response.message
    },
    async show(id) {
      const url = `${this.urlServe}/show`
      const rawresponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Accept': 'Application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          'id': id
        })
      })

      const response = await rawresponse.json()
      return response
    },
  },
  persist: {
    storage: sessionStorage,
    path: ['token']
  }

})

export default useAuth