<template>
  <div class="repositories">
    <div class="repositories__list">
     <div v-for="repo in repositories.nodes" :key="repo.name">
        <Repository v-bind:repository="repo"/>
    </div>
    </div>
    <Pagination 
      v-bind:totalCount="totalCount"
      v-bind:perPage="perPage"
      v-bind:currentPage="currentPage"
      v-on:changePage="onChangePage"
    />
  </div>
</template>

<script>
import Repository from './Repository.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'Repositories',
  components: {
    Repository,
    Pagination    
  },
  props: {
    repositories: Object,
    totalCount: Number,
    perPage: Number,
    currentPage: Number,
    handleChangePage: Function    
  },
  methods: {
    onChangePage: function (currentPage) {
      const { edges } = this.repositories;
      const edgesLength = edges.length;
      const isAfter = currentPage > this.currentPage;
      const cursorIndex = isAfter ? edgesLength - 1 : 0;
      const cursor = edges[cursorIndex].cursor;
    
      this.handleChangePage(isAfter, currentPage, cursor);
    }
  }
};
</script>


<style scoped>
  .repositories {
    display: flex;
    flex-direction: column;
  }
  .repositories__list {
    display: flex;
    min-width: 250px;
    flex-direction: column;
    padding: var(--padding-base);
    flex-grow: 1;
  }
</style>