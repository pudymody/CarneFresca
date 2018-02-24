<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  background: #ddd;
}
input[type="text"] {
			border: none;
			border-bottom: 3px solid #ddd;
      width: calc(100% - 40px);
      margin: 20px 20px 0 20px;
			font-size: 1.5em;
		}
</style>
