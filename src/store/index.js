import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    posts: [],
    users: [],
    post: null,
    user: null,
    comments: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setUsers(state, users) {
      state.users = users
    },
    setPost(state, post) {
      state.post = post
    },
    setUser(state, user) {
      state.user = user
    },
    setComments(state, comments) {
      state.comments = comments
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        commit('setPosts', response.data)
        console.log('Fetched posts:', response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        commit('setUsers', response.data)
        console.log('Fetched users:', response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
        throw error
      }
    },
    async fetchPost({ commit }, postId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        commit('setPost', response.data)
        console.log('Fetched post:', response.data)
      } catch (error) {
        console.error('Error fetching post:', error)
        throw error
      }
    },
    async fetchUser({ commit }, userId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        commit('setUser', response.data)
        console.log('Fetched user:', response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
        throw error
      }
    },
    async fetchComments({ commit }, postId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        commit('setComments', response.data)
        console.log('Fetched comments:', response.data)
      } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
      }
    }
  }
})