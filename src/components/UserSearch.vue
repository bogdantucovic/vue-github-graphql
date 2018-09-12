<template>
  <input 
    type="search" 
    placeholder="github username"
    v-on:change="$emit('search', $event)" 
  />
</template>
