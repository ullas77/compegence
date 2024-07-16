<template>
  <div class="home-page">
    <h1>Latest Posts</h1>
    <div v-if="loading">Loading posts...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="posts.length === 0">No posts available.</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post" @click="goToPost(post.id)">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <p class="author"><strong>Author:</strong> {{ getUserName(post.userId) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    ...mapState(['posts', 'users'])
  },
  methods: {
    ...mapActions(['fetchPosts', 'fetchUsers']),
    getUserName(userId) {
      const user = this.users.find(user => user.id === userId)
      return user ? user.name : 'Unknown'
    },
    goToPost(postId) {
      this.$router.push(`/post/${postId}`)
    },
    async loadData() {
      this.loading = true
      this.error = null
      try {
        await this.fetchPosts()
        await this.fetchUsers()
        console.log('Posts:', this.posts)
        console.log('Users:', this.users)
      } catch (error) {
        console.error('Error fetching data:', error)
        this.error = 'Failed to load data. Please try again later.'
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>
/* ... (styles remain the same) ... */
</style>