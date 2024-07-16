<template>
  <div class="home-page">
    <h1>Latest Posts</h1>

    <!-- Search and Sort Controls -->
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="Search posts...">
      <select v-model="sortCriteria">
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
      </select>
      <button @click="clearFilters">Clear Filters</button>
    </div>

    <!-- Loading, Error, and Data Display -->
    <div v-if="loading">Loading posts...</div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="filteredPosts.length === 0">No posts available.</div>

    <div v-else>
      <div v-for="post in filteredPosts" :key="post.id" class="post" @click="goToPost(post.id)">
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
      error: null,
      searchQuery: '',
      sortCriteria: 'title'
    }
  },
  computed: {
    ...mapState(['posts', 'users']),
    filteredPosts() {
      let filtered = this.posts;

      if (!Array.isArray(filtered)) {
        return [];
      }

      if (this.searchQuery) {
        filtered = filtered.filter(post =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return this.sortPosts(filtered);
    }
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
    sortPosts(posts) {
      if (!Array.isArray(posts)) {
        return [];
      }

      if (this.sortCriteria === 'title') {
        return posts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortCriteria === 'author') {
        return posts.sort((a, b) => this.getUserName(a.userId).localeCompare(this.getUserName(b.userId)));
      }
      return posts;
    },
    clearFilters() {
      this.searchQuery = '';
      this.sortCriteria = 'title'; // Reset sort criteria to 'title' when clearing filters
    },
    async loadData() {
      this.loading = true
      this.error = null
      try {
        await this.fetchPosts()
        await this.fetchUsers()
      } catch (error) {
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
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.controls input[type="text"], .controls select {
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.controls button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover {
  background-color: #2980b9;
}

.post {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer; /* This line changes the cursor to a pointer */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.post h2 {
  color: #3498db;
  margin-top: 0;
}

.post p {
  color: #555;
}

.post .author {
  color: #7f8c8d;
  font-style: italic;
}
</style>
