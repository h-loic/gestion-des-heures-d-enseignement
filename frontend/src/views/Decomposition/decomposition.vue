<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <router-link class="breadcrumb-item" :to="'/projet/'+ projet._id">Projet {{ projet.nom }}</router-link>
            <span class="breadcrumb-item active">Decomposition {{ formation.nom }}</span>
        </nav>
        <div class="container text-center">
            <p class="h1 justify-content-start mt-3 mb-3">{{ projet.nom }}</p>

            <div class="h4 mt-5" v-for="periode in formation.periodes" v-bind:key="periode._id">{{ periode.nom_periode }}</div>
                <table class="table table-editable table-bordered mb-3">
                    <tr>
                        <td :colspan="tableau_decomposition.length"></td>
                        <td v-for="semaine in periode.duree" v-bind:key="semaine._id">{{ semaine+1 }}</td> <!-- VERIFIER SI FONCTIONNE -->
                        <td>Total </td>
                    </tr>
                    <div v-for="UE in tableau_decomposition[0]" v-bind:key="UE._id">
                        <tr v-if="UE.element_parent  === periode._id">
                            <td :colspan="periode.duree + tableau_decomposition.length" class="bg-light">
                                <div class="row float-right mr-2">
                                    <router-link :to="'/projet/decomposition/edit/'+projet._id+'/'+ formation._id +'/'+ UE._id" class="float-right"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                    </svg></router-link>
                                    <router-link :to="'/projet/decomposition/delete/'+ projet._id+'/'+ formation._id +'/'+ UE._id " class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                    </svg>
                                    </router-link>
                                </div>
                                {{ UE.nom }}
                                <br>
                                <router-link :to="'/projet/decomposition/new/'+ projet._id+'/'+ formation._id +'/'+ UE._id +'/2'" class="mr-3">ajouter un fils</router-link>
                            </td>
                        </tr>
                        <div v-for="i in tableau_decomposition[1]" v-bind:key="i._id">
                        <form v-if="UE._id === i.element_parent && i.mode_saisie === 'hebdo'" method="post" :action="'/projet/decomposition/record/'+ projet._id+'/'+ formation._id +'/'+ periode.duree +'/'+ i._id " enctype="multipart/form-data">
                            <tr>
                                <td :colspan="tableau_decomposition.length - 1" rowspan="4">
                                    <div class="row float-right mr-2">
                                        <router-link :to="'/projet/decomposition/edit/'+ projet._id+'/'+ formation._id +'/'+ i._id " class="float-right"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                        </svg></router-link>
                                        <router-link :to="'/projet/decomposition/delete/'+ projet._id+'/'+ formation._id +'/'+ i._id" class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                        </svg>
                                        </router-link>
                                    </div>
                                    <div class="m-3">
                                        {{ i.nom }}
                                        <br>
                                        <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                        <br>
                                        <div class="dropdown mt-5 mb-0">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                ajouter intervenant
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <router-link v-for="intervenant in intervenants" v-bind:key="intervenant._id" class="dropdown-item"
                                                   :to="'/projet/decomposition/new-intervenant/'+ projet._id+'/'+ formation._id +'/'+ i._id +'/'+ intervenant._id">
                                                    {{ intervenant.enseignant.nom }} {{ intervenant.enseignant.prenom }}</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>CM ({{periode.nombre_groupe_CM}} grp)</td>
                                <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_CM[]"
                                                        :value=" i.nombre_heure_CM[semaine] "></td>
                                <td class="p-0"><div class="form-control align-middle text-center input-form">{{ i.nombre_heure_CM[periode.duree] }}</div></td>
                            </tr>
                            <tr>
                                <td>TD ({{periode.nombre_groupe_TD}} grp)</td>
                                <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_TD[]"
                                           v-if="i.nombre_heure_Partiel[semaine] !== 0" :value=" i.nombre_heure_Partiel[semaine]"></td>
                                <td class="p-0"><div class="form-control align-middle text-center input-form">{{ i.nombre_heure_TD[periode.duree] }}</div></td>
                            </tr>
                            <tr>
                                <td>TP ({{periode.nombre_groupe_TP}} grp)</td>
                                <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_TP[]"
                                           v-if="i.nombre_heure_Partiel[semaine] !== 0" :value=" i.nombre_heure_Partiel[semaine]"></td>
                                <td class="p-0"><div class="form-control align-middle text-center input-form">{{ i.nombre_heure_TP[periode.duree] }}</div></td>
                            </tr>
                            <tr>
                                <td>Partiel ({{periode.nombre_groupe_Partiel}} grp)</td>
                                <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_Partiel[]"
                                           v-if="i.nombre_heure_Partiel[semaine] !== 0" :value=" i.nombre_heure_Partiel[semaine]"></td>
                                <td class="p-0"><div class="form-control align-middle text-center input-form">{{ i.nombre_heure_Partiel[periode.duree] }}</div></td>
                            </tr>
                        </form>
                            <div v-for="intervenant in i.intervenants" v-bind:key="intervenant._id">
                                <div v-for="intervenant_decomposition in intervenants" v-bind:key="intervenant_decomposition._id">
                                    <form v-if="intervenant.intervenant === intervenant_decomposition._id" method="post" :action="'/projet/decomposition/intervenant/record/'+ projet._id+'/'+ formation._id +'/'+ periode.duree +'/'+ i._id +'/'+ intervenant._id" enctype="multipart/form-data">
                                        <tr>
                                            <td :colspan="tableau_decomposition.length" rowspan="5">
                                                {{ intervenant_decomposition.enseignant.nom }} {{ intervenant_decomposition.enseignant.prenom }}
                                                <br>
                                                <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                                <div class="row float-right mr-2">
                                                    <router-link :to="'/projet/decomposition/delete-intervenant/'+ projet._id+'/'+ formation._id +'/'+ i._id +'/'+ intervenant._id" class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                    </svg>
                                                    </router-link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            {% for semaine in range(1, periode.duree+1) %}
                                            <td class="p-0"><input class="form-control align-middle text-center input-form" name="nombre_heure_CM[]" v-if="intervenant.nombre_heure_Partiel[semaine - 1] !== 0" :value="intervenant.nombre_heure_Partiel[semaine - 1]"></td>
                                            {% endfor %}
                                        </tr>
                                        <tr>
                                            {% for semaine in range(1, periode.duree+1) %}
                                            <td class="p-0"><input class="form-control align-middle text-center input-form" name="nombre_heure_TD[]" v-if="intervenant.nombre_heure_Partiel[semaine - 1] !== 0" :value="intervenant.nombre_heure_Partiel[semaine - 1]"></td>
                                            {% endfor %}
                                        </tr>
                                        <tr>
                                            {% for semaine in range(1, periode.duree+1) %}
                                            <td class="p-0"><input class="form-control align-middle text-center input-form" name="nombre_heure_TP[]" v-if="intervenant.nombre_heure_Partiel[semaine - 1] !== 0" :value="intervenant.nombre_heure_Partiel[semaine - 1]"></td>
                                            {% endfor %}
                                        </tr>
                                        <tr>
                                            {% for semaine in range(1, periode.duree+1) %}
                                            <td class="p-0"><input class="form-control align-middle text-center input-form" name="nombre_heure_Partiel[]" v-if="intervenant.nombre_heure_Partiel[semaine - 1] !== 0" :value="intervenant.nombre_heure_Partiel[semaine - 1]"></td>
                                            {% endfor %}
                                        </tr>
                                    </form>
                                    <form v-else-if="i.mode_saisie === 'global'" method="post" :action="'/projet/decomposition/record-global/'+ projet._id+'/'+ formation._id +'/'+ i._id" enctype="multipart/form-data">
                                        <tr>
                                            <td :colspan=" tableau_decomposition.length" class="bg-light">
                                                <div class="row float-right mr-2">
                                                    <router-link :to="'/projet/decomposition/edit/'+ projet._id+'/'+ formation._id+'/'+ i._id" class="float-right"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                                        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                                    </svg></router-link>
                                                    <router-link :to="'/projet/decomposition/delete/'+ projet._id+'/'+ formation._id +'/'+ i._id" class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                    </svg>
                                                    </router-link>
                                                </div>
                                                <div class="m-3">
                                                    {{ i.nom }}
                                                </div>
                                                <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                                <div class="dropdown mt-3 mb-0">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        ajouter intervenant
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <router-link class="dropdown-item" v-for="intervenant in intervenants" v-bind:key="intervenant._id"
                                                           :to="'/projet/decomposition/new-intervenant/'+ projet._id+'/'+ formation._id +'/'+ i._id +'/'+ intervenant._id">
                                                            {{ intervenant.enseignant.nom }} {{ intervenant.enseignant.prenom }}</router-link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td :colspan="periode.duree/2">
                                                <div class="form-group">
                                                    <label for="nombre_groupe">nombre de groupe :</label>
                                                    <input class="form-control text-center" id="nombre_groupe" name="nombre_groupe" :value="i.nombre_groupe">
                                                </div>
                                            </td>
                                            <td :colspan=" periode.duree/2">
                                                <div class="form-group">
                                                    <label for="forfait">forfait :</label>
                                                    <input class="form-control text-center" id="forfait" name="forfait" :value=" i.forfait ">
                                                </div>
                                            </td>
                                        </tr>
                                    </form>
                                </div>
                            </div>
                            <div v-for="intervenant in i.intervenants" v-bind:key="intervenant._id">
                                <div v-for="intervenant_decomposition in intervenants" v-bind:key="intervenant_decomposition._id">
                                    <form v-if="intervenant.intervenant === intervenant_decomposition._id" method="post" :action="'/projet/decomposition/intervenant/record-global/'+ projet._id+'/'+ formation._id +'/'+ i._id +'/'+ intervenant._id" enctype="multipart/form-data">
                                        <tr>
                                            <td :colspan="tableau_decomposition.length">
                                                {{ intervenant_decomposition.enseignant.nom }} {{ intervenant_decomposition.enseignant.prenom }}
                                                <br>
                                                <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                                <div class="row float-right mr-2">
                                                    <router-link :to="'/projet/decomposition/delete-intervenant/'+ projet._id+'/'+ formation._id+'/'+ i._id +'/'+ intervenant._id " class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                    </svg>
                                                    </router-link>
                                                </div>
                                            </td>
                                            <td :colspan=" periode.duree">
                                                <div class="form-group row">
                                                    <label for="nombre_groupe_suivis" class="col-sm-6 col-form-label">nombre de groupe suivis :</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control" id="nombre_groupe_suivis"
                                                               name="nombre_groupe_suivis" :value="intervenant.nombre_groupe ">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </form>
                                    <tr v-else>
                                        <td :colspan="tableau_decomposition.length" class="bg-light">
                                            <div class="row float-right mr-2">
                                                <router-link :to="'/projet/decomposition/edit/'+ projet._id+'/'+ formation._id +'/'+ i._id" class="float-right"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                                </svg></router-link>
                                                <router-link :to="'/projet/decomposition/delete/'+ projet._id+'/'+ formation._id +'/'+ i._id" class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                </svg>
                                                </router-link>
                                            </div>
                                            <div class="m-3">
                                                {{ i.nom }}
                                            </div>
                                            <br>
                                            <router-link :to="'/projet/decomposition/new/'+ projet._id+'/'+ formation._id +'/'+ i._id +'/3'">ajouter un fils</router-link>
                                        </td>
                                        <td :colspan="periode.duree +1"></td>
                                    </tr>
                                </div>
                            </div>
                            <div v-for="j in tableau_decomposition[2]" v-bind:key="j._id">
                                <form v-if="i._id  === j.element_parent && j.mode_saisie === 'hebdo'"
                                        method="post" :action="'/projet/decomposition/record/'+ projet._id+'/'+ formation._id+'/'+ periode.duree +'/'+ j._id" enctype="multipart/form-data">
                                    <tr>
                                        <td :colspan="tableau_decomposition.length - 1" rowspan="4">
                                            <div class="row float-right mr-2">
                                                <router-link :to="'/projet/decomposition/edit/'+ projet._id+'/'+ formation._id +'/'+ j._id" class="float-right"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                                </svg></router-link>
                                                <router-link :to="'/projet/decomposition/delete/'+projet._id+'/'+ formation._id +'/'+ j._id " class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                </svg>
                                                </router-link>
                                            </div>
                                            <div class="m-3">
                                                {{ j.nom }}
                                                <br>
                                                <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                                <br>
                                                <div class="dropdown mt-5 mb-0">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        ajouter intervenant
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <router-link class="dropdown-item" v-for="intervenant in intervenants" v-bind:key="intervenant._id"
                                                           :to="'/projet/decomposition/new-intervenant/'+ projet._id+'/'+ formation._id +'/'+ j._id +'/'+ intervenant._id">
                                                            {{ intervenant.enseignant.nom }} {{ intervenant.enseignant.prenom }}</router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>CM ({{periode.nombre_groupe_CM}} grp)</td>
                                        <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                            <input class="form-control align-middle text-center input-form" name="nombre_heure_CM[]" v-if="j.nombre_heure_Partiel[semaine] !== 0" :value="j.nombre_heure_Partiel[semaine]"></td>
                                        <td class="p-0"><div class="form-control align-middle text-center input-form">{{ j.nombre_heure_CM[periode.duree] }}</div></td>
                                    </tr>
                                    <tr>
                                        <td>TD ({{periode.nombre_groupe_TD}} grp)</td>
                                        <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                            <input class="form-control align-middle text-center input-form" name="nombre_heure_TD[]" v-if="j.nombre_heure_Partiel[semaine] !== 0" :value="j.nombre_heure_Partiel[semaine]"></td>
                                        <td class="p-0"><div class="form-control align-middle text-center input-form">{{ j.nombre_heure_TD[periode.duree] }}</div></td>
                                    </tr>
                                    <tr>
                                        <td>TP ({{periode.nombre_groupe_TP}} grp)</td>
                                        <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                            <input class="form-control align-middle text-center input-form" name="nombre_heure_TP[]" v-if="j.nombre_heure_Partiel[semaine] !== 0" :value="j.nombre_heure_Partiel[semaine]"></td>
                                        <td class="p-0"><div class="form-control align-middle text-center input-form">{{ j.nombre_heure_TP[periode.duree] }}</div></td>
                                    </tr>
                                    <tr>
                                        <td>Partiel ({{periode.nombre_groupe_Partiel}} grp)</td>
                                        <td class="p-0" v-for="semaine in periode.duree" v-bind:key="semaine._id">
                                            <input class="form-control align-middle text-center input-form" name="nombre_heure_Partiel[]" v-if="j.nombre_heure_Partiel[semaine] !== 0" :value="j.nombre_heure_Partiel[semaine]"></td>
                                        <td class="p-0"><div class="form-control align-middle text-center input-form">{{ j.nombre_heure_Partiel[periode.duree] }}</div></td>
                                    </tr>
                                </form>
                                <div v-for="intervenant in j.intervenants" v-bind:key="intervenant._id">
                                    <div v-for="intervenant_decomposition in intervenants" v-bind:key="intervenant_decomposition._id">
                                        <form v-if="intervenant.intervenant === intervenant_decomposition._id" method="post" :action="'/projet/decomposition/intervenant/record/'+ projet._id+'/'+ formation._id +'/'+ periode.duree +'/'+ j._id +'/'+ intervenant._id" enctype="multipart/form-data">
                                            <tr>
                                                <td :colspan="tableau_decomposition.length" rowspan="5">
                                                    {{ intervenant_decomposition.enseignant.nom }} {{ intervenant_decomposition.enseignant.prenom }}
                                                    <br>
                                                    <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                                    <div class="row float-right mr-2">
                                                        <router-link :to="'/projet/decomposition/delete-intervenant/'+ projet._id+'/'+ formation._id +'/'+ j._id +'/'+ intervenant._id " class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                        </svg>
                                                        </router-link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="p-0" v-for="semaine in periode.duree+1" v-bind:key="semaine._id">
                                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_CM[]"  v-if="intervenant.nombre_heure_Partiel[semaine] !== 0" :value="intervenant.nombre_heure_Partiel[semaine]"></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0" v-for="semaine in periode.duree+1" v-bind:key="semaine._id">
                                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_TD[]"  v-if="intervenant.nombre_heure_Partiel[semaine] !== 0" :value="intervenant.nombre_heure_Partiel[semaine]"></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0" v-for="semaine in periode.duree+1" v-bind:key="semaine._id">
                                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_TP[]"  v-if="intervenant.nombre_heure_Partiel[semaine] !== 0" :value="intervenant.nombre_heure_Partiel[semaine]"></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0" v-for="semaine in periode.duree+1" v-bind:key="semaine._id">
                                                    <input class="form-control align-middle text-center input-form" name="nombre_heure_Partiel[]" v-if="intervenant.nombre_heure_Partiel[semaine] !== 0" :value="intervenant.nombre_heure_Partiel[semaine]"></td>
                                            </tr>
                                        </form>
                                        <form v-else-if="j.mode_saisie === 'global'" method="post" :action="'/projet/decomposition/record-global/'+ projet._id+'/'+ formation._id+'/'+ j._id" enctype="multipart/form-data">
                                            <tr>
                                                <td :colspan="tableau_decomposition.length">
                                                    <div class="row float-right mr-2">
                                                        <router-link :to="'/projet/decomposition/edit/'+ projet._id+'/'+ formation._id +'/'+ j._id " class="float-right"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                                        </svg></router-link>
                                                        <router-link :to="'/projet/decomposition/delete/'+ projet._id+'/'+ formation._id +'/'+ j._id " class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                        </svg>
                                                        </router-link>
                                                    </div>
                                                    <div class="m-3">
                                                        {{ j.nom }}
                                                    </div>
                                                    <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                                    <div class="dropdown mt-3 mb-0">
                                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            ajouter intervenant
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <router-link class="dropdown-item" v-for="intervenant in intervenants" v-bind:key="intervenant._id"
                                                               :to="'/projet/decomposition/new-intervenant/'+ projet._id+'/'+ formation._id+'/'+ j._id +'/'+ intervenant._id">
                                                                {{ intervenant.enseignant.nom }} {{ intervenant.enseignant.prenom }}</router-link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td :colspan="periode.duree/2">
                                                    <div class="form-group">
                                                        <label for="nombre_groupe">nombre de groupe :</label>
                                                        <input class="form-control text-center" name="nombre_groupe" :value="j.nombre_groupe">
                                                    </div>
                                                </td>
                                                <td :colspan="periode.duree/2">
                                                    <div class="form-group">
                                                        <label for="forfait">forfait :</label>
                                                        <input class="form-control text-center" name="forfait" :value="j.forfait">
                                                    </div>
                                                </td>
                                            </tr>
                                        </form>
                                    </div>
                                </div>
                                <div v-for="intervenant in j.intervenants" v-bind:key="intervenant._id">
                                    <div v-for="intervenant_decomposition in intervenants" v-bind:key="intervenant_decomposition._id">
                                        <form v-if="intervenant.intervenant === intervenant_decomposition._id"
                                                method="post" :action="'/projet/decomposition/intervenant/record-global/'+projet._id+'/'+ formation._id+'/'+ j._id +'/'+ intervenant._id" enctype="multipart/form-data">
                                            <tr>
                                                <td :colspan="tableau_decomposition.length">
                                                    {{ intervenant_decomposition.enseignant.nom }} {{ intervenant_decomposition.enseignant.prenom }}
                                                    <br>
                                                    <button type="submit" class="btn btn-primary mt-3 text-white">enregistrer</button>
                                                    <div class="row float-right mr-2">
                                                        <router-link :to="'/projet/decomposition/delete-intervenant/'+ projet._id+'/'+ formation._id +'/'+ j._id +'/'+ intervenant._id" class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                        </svg>
                                                        </router-link>
                                                    </div>
                                                </td>
                                                <td :colspan="periode.duree">
                                                    <div class="form-group row">
                                                        <label for="nombre_groupe_suivis" class="col-sm-6 col-form-label">nombre de groupe suivis :</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" class="form-control"
                                                                   name="nombre_groupe_suivis" :value="intervenant.nombre_groupe">
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </form>
                                        <div v-else>
                                            <tr>
                                                <td :colspan="tableau_decomposition.length"></td>
                                                <td>
                                                    <div class="row float-right mr-2">
                                                        <router-link :to="'/projet/decomposition/edit/'+ projet._id+'/'+ formation._id +'/'+ j._id" class="float-right"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                                        </svg></router-link>
                                                        <router-link :to="'/projet/decomposition/delete/'+ projet._id+'/'+ formation._id +'/'+ j._id" class="text-danger float-right" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                                        </svg>
                                                        </router-link>
                                                    </div>
                                                    {{ j.nom }}
                                                    <br>
                                                    <router-link :to="'/projet/decomposition/new/'+projet._id+'/'+formation._id +'/'+ j._id +'/4'">ajouter un fils</router-link>
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <tr>
                        <td  :colspan="periode.duree + tableau_decomposition.length + 1">
                            <a :href="'/projet/decomposition/new/'+ projet._id+'/'+ formation._id+'/'+ periode._id+'/1'" class="text-center">ajouter un fils</a>
                        </td>
                    </tr>
                </table>
            <input type="submit" class="btn btn-primary text-center" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import DecompositionService from "../../service/DecompositionService";

    export default {
        name: 'Projet-decomposition',
        data() {
            return {
                formation : '',
                projet : '',
                tableau_decomposition : '',
                intervenants : ''
            }
        },
        async created() {
            try {
                let get = await DecompositionService.getDecomposition(this.$route.params.idProjet,this.$route.params.idFormation);
                this.formation = get.formation;
                this.projet = get.projet;
                this.tableau_decomposition = get.tableau_decomposition;
                this.intervenants = get.intervenants;
                console.log(this.formation.periode[0]);
            } catch (err) {
                this.error = err.message;
            }
        }
    }

</script>