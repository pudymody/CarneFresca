<template>
  <ul>
    <li v-if="playerData"><router-link to="/player">Utilizar mi personaje</router-link></li>
    <li><router-link to="/create/0">Crear nuevo personaje</router-link></li>
  </ul>
</template>
<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li a {
    display: block;
    padding: 15px;
    text-decoration: none;
    color: #333;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
</style>


<script>
export default {
  name: 'home',
  data: function(){
    return {
      playerData : localStorage.getItem('playerData')
    }
  }
}
</script>
