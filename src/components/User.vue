<template>
  <article class="user">
    <img 
      v-bind:src="avatarUrl"
      v-bind:alt="name"
    />
    <h2> <a v-bind:href="url"> {{ name }} </a> </h2>
    <div v-if="email"> {{ email }} </div>
    <div v-if="location" > {{ location }} </div>
  </article>
</template>

<script>
export default {
  name: 'User',
  props: {
    name: String,
    email: String,
    location: String,
    avatarUrl: String,
    url: String
  }
}
</script>


<style scoped>
  .user {
    padding: var(--padding-base);
  }
  .user img {
    max-height: 200px;
    max-width: 100%;
  }
</style>