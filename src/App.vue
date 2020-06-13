<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ name: 'home'}" class="navbar-brand">Examples</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{ name: 'home'}" class="nav-link">Home</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>