<template>
  <div class="pagination">
    <div class="pagination__counter"> {{ from }} / {{ to }} </div>
    <div>
      <button
        v-on:click="$emit('changePage', currentPage - 1)" 
        v-bind:disabled="isDisabledPrevious"
      > 
        Previous 
      </button>
      <button 
        v-on:click="$emit('changePage', currentPage + 1)" 
        v-bind:disabled="isDisabledNext"
      > 
        Next 
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalCount: Number,
    currentPage: Number,
    perPage: Number
  },
  computed: {
    isDisabledNext: function () {
      return this.currentPage * this.perPage >= this.totalCount;
    },
    isDisabledPrevious: function () {
      return this.currentPage === 1;
    },
    from: function () {
      return (this.currentPage - 1) * this.perPage;
    },
    to: function () {
      return Math.min(this.currentPage * this.perPage, this.totalCount);
    }
  }
};
</script>


<style scoped>
  .pagination__counter {
    font-size: 80%;
  }
</style>