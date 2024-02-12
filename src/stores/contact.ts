import { defineStore } from 'pinia'

export const useContactStore = defineStore('contactStore', {
  state: () => ({
    name: '',
    email: ''
  }),
  actions: {
    setName(name: string) {
      this.name = name
    },
    setEmail(email: string) {
      this.email = email
    }
  },
  getters: {
    getName(state) {
      return state.name
    },
    getEmail(state) {
      return state.email
    }
  }
})
