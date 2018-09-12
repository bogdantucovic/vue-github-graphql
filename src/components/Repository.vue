<template>
  <div class="repository">
    <a v-bind:href="repository.url"> 
        {{repository.name}} 
    </a>
    <div class="repository__updated-time">
     Updated at: 
     <time> {{ repository.updatedAt | fromNow }}  </time>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Repository',
  props: {
    repository: Object
  }
};
</script>


<style scoped>
  .repository {
    flex-grow: 1;
    padding: var(--padding-base);
  }
  .repository__updated-time {
    font-size: 80%;
    text-transform: lowercase;
  }
</style>