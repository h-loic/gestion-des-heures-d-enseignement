<template>
  <div class="container">
    <div class="row justify-content-around mt-4 mb-4">
      <router-link to="/formation" type="button" class="btn btn-outline-info col-md-6 mt-1 mb-1">gestion des formations</router-link>
      <router-link to="/enseignant" type="button" class="btn btn-outline-info col-md-6 mt-1 mb-1">gestion des enseignants</router-link>
    </div>
    <p class="h1 justify-content-start mt-3 mb-3">liste des projets</p>
    <div class="row justify-content-around">
      <router-link to="/projet/new" type="button" class="btn btn-outline-info col-md-5 mt-3 mb-1">creer un nouveau projet</router-link>
    </div>
    <div class="row justify-content-around">
      <router-link to="/projet/clone" type="button" class="btn btn-outline-info col-md-5 mt-1 mb-5">cloner un  projet</router-link>
    </div>
    <div class="row">
      <router-link to="/accueil-date" type="button" class="btn btn-success col-2 m-1">trier par date</router-link>
      <router-link to="/accueil-nom" type="button" class="btn btn-success col-2 m-1">trier par nom</router-link>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Accueil',
}
</script>
