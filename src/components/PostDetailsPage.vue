<template>
  <div class="post-details-page">
    <div v-if="loading">Loading post details...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p class="post-body">{{ post.body }}</p>
      <div v-if="user" class="user-details">
        <h2>Author Details</h2>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Website:</strong> {{ user.website }}</p>
      </div>
      <div class="comments">
        <h2>Comments</h2>
        <div v-if="comments.length === 0">No comments yet.</div>
        <div v-else>
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <h3>{{ comment.name }}</h3>
            <p>{{ comment.body }}</p>
            <p class="email">{{ comment.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>No post found.</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostDetailsPage',
  data() {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    ...mapState(['post', 'user', 'comments'])
  },
  methods: {
    ...mapActions(['fetchPost', 'fetchUser', 'fetchComments']),
    async loadPostData() {
      this.loading = true
      this.error = null
      try {
        const postId = parseInt(this.$route.params.id)
        await this.fetchPost(postId)
        await this.fetchComments(postId)
        if (this.post) {
          await this.fetchUser(this.post.userId)
        }
        console.log('Post:', this.post)
        console.log('User:', this.user)
        console.log('Comments:', this.comments)
      } catch (error) {
        console.error('Error fetching post data:', error)
        this.error = 'Failed to load post details. Please try again later.'
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.loadPostData()
  },
  watch: {
    '$route.params.id': function() {
      this.loadPostData()
    }
  }
}
</script>

<style scoped>
</style>