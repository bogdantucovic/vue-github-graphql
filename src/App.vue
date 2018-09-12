<template>
  <div class="app">
    <div class="app__setings">
      <UserSearch v-on:search="handleSearchUser"/>
    </div>
    <ApolloQuery :query="query">
      <template slot-scope="{ result: { loading, error, data } }">
        <span v-if="loading">Loading...</span>
        <p v-else-if="error" >
          Something is wrong!
        </p>
        <section v-if="data" class="app__main">
          <User 
            v-bind:email="data.user.email"
            v-bind:location="data.user.location"
            v-bind:name="data.user.name"
            v-bind:avatarUrl="data.user.avatarUrl"
            v-bind:url="data.user.url"
          />
          <Repositories
            v-bind:repositories="data.user.repositories"
            v-bind:totalCount="data.user.repositories.totalCount"
            v-bind:handleChangePage="handleChangePage"
            v-bind:currentPage="currentPage"
            v-bind:perPage="perPage"
          />
        </section>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { getUser, getUserAfterRepos, getUserBeforeRepos } from './queries.js';
import Repositories from './components/Repositories.vue';
import UserSearch from './components/UserSearch.vue';
import User from './components/User.vue';

const defaultData = {
  user: 'bogdantucovic',
  perPage: 5
}

export default {
  name: 'app',
  components: {
    Repositories,
    UserSearch,
    User
  },
  data() {
    return {
      user: defaultData.user,
      currentPage: 1,
      perPage: defaultData.perPage,
      query: getUser(defaultData.user, defaultData.perPage)
    };
  },
  watch:{
    user: function (val) {
      this.query = getUser(val, defaultData.perPage);
    }
  },
  methods: {
    handleSearchUser: function (event) {
      this.user = event.target.value;
      this.currentPage = 1;
    },
    handleChangePage: function (isAfter, currentPage, cursor) {
      const { user, perPage } = this;

      cursor = cursor.slice(0, cursor.length - 2);
      this.currentPage = currentPage;
      
      if (isAfter) {
        this.query = getUserAfterRepos(user, cursor, perPage);
      } else {
        this.query = getUserBeforeRepos(user, cursor, perPage);
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:200,300,400,600');
:root {
  --link-color: #41B883;
  --link-color-inverse: white;
  --primary-color: #35495e;
  --gray: #d3d3d3;

  --padding-base: 0.5em;
  --padding-large: 1em;
}

::-moz-placeholder {
  color: var(--gray);
}

html {
  font-family: 'Raleway', sans-serif;
  line-height: 1.4;
  font-size: 1rem;
}
body {
  margin: 0;
}

a {
  text-decoration: none;
  color: var(--link-color);
  background-color: inherit;
}

button {
  border: none;
  background: var(--link-color);
  color: var(--link-color-inverse);
  cursor: pointer;
  padding: var(--padding-base);
}

button:disabled {
  background-color: var(--gray);
  cursor: not-allowed;
}

input {
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid var(--gray);
  padding: var(--padding-large);
  margin: 0 1em;
  font-size: 1rem;
}

.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary-color);
}

.app__setings {
  padding: var(--padding-base);
  text-align: center;
}

.app__main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: var(--padding-large);
  text-align: center;
}
</style>
