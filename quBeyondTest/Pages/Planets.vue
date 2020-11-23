<template>
<div class="general">
    <div class="header">
        <h1 class="title">Qu Beyond</h1>
    </div>
    <div>
        <h3 class="title">Planets</h3>
    </div>
    <div class="content">        
       <v-table :data="planets" id="planets">
            <thead slot="head">                
                <v-th sortKey="name">Name</v-th>
                <th>Period</th>                
                <v-th sortKey="diameter">Diameter</v-th>                
                <v-th sortKey="climate" defaultSort="desc">Climate</v-th>
                <v-th sortKey="gravity" defaultSort="desc">Gravity</v-th>
                <v-th sortKey="terrain" defaultSort="desc">Terrain</v-th>
                <v-th sortKey="surface_water" defaultSort="desc">Surface Water</v-th>
                <v-th sortKey="population" defaultSort="desc">Population</v-th>
                <th>Action</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="row in displayData" :key="row.name">
                <td>{{ row.name }}</td>
                <td>                    
                        <li>Orbital Period: {{ row.orbital_period }}</li>
                        <li>Rotation Period: {{ row.rotation_period }}</li>                                            
                </td>                
                <td>{{ row.diameter }}</td>                
                <td>{{ row.climate }}</td>                
                <td>{{ row.gravity }}</td>                
                <td>{{ row.terrain }}</td>                
                <td>{{ row.surface_water }}</td>                
                <td>{{ row.population }}</td>                
                <td>
                    <button v-on:click="handleShowDetails(row)">View</button>
                </td>                
                </tr>
            </tbody>
        </v-table>
         <div class="paginator">
             <button v-on:click="handlePrevious()">Previous</button>
             [{{currentPage}}]
             <button v-on:click="handleNext()">Next</button>
         </div>

        <hr>
        <div  v-if="showDetails">
            <h3 class="title">Films</h3>
        
        <hr>
         <v-table :data="films" id="planets">
            <thead slot="head">                
                <v-th sortKey="title">Title</v-th>
                <v-th sortKey="director">Director</v-th>
                <v-th sortKey="producer">Producer</v-th>                                    
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="row in displayData" :key="row.name">
                <td>{{ row.title }}</td>
                <td>{{ row.director }}</td>
                <td>{{ row.producer }}</td>                                                        
                </tr>
            </tbody>
        </v-table>
        <hr>
           <h3 class="title">Residents</h3>        
        <hr>
         <v-table :data="residents" id="planets">
            <thead slot="head">                
                <v-th sortKey="name">Name</v-th>
                <v-th sortKey="gender">Gender</v-th>
                <v-th sortKey="hair_color">Hair Color</v-th>                                    
                <v-th sortKey="eye_color">Eye Color</v-th>                                    
                <v-th sortKey="birth_year">Birth Year</v-th>                                    
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="row in displayData" :key="row.name">
                <td>{{ row.name }}</td>
                <td>{{ row.gender }}</td>
                <td>{{ row.hair_color }}</td>                                                        
                <td>{{ row.eye_color }}</td>                                                        
                <td>{{ row.birth_year }}</td>                                                        
                </tr>
            </tbody>
        </v-table>
        <div class="paginator">
            <button v-on:click="handleClose()">Close</button>
         </div>
        
        </div>
        <hr>
       
    </div>
</div>    
</template>

<script>
import Vue from 'vue';
 import axios from 'axios';
 import SmartTable from 'vuejs-smart-table';
 Vue.use(SmartTable)

export default {          
    data(){
        return{
            currentPage: 1,
            planets:[],
            showDetails:false,
            previuosUrl:null,
            films:[],
            residents:[],
            nextUrl:null,
            initialUrl:'https://swapi.dev/api/planets/'
        }    
    },

    mounted(){
        this.getPlanets(this.initialUrl);
    },

    methods:{
        getPlanets(url){
        axios
            .get(url)        
            .then(response => {
                this.planets = response.data.results;            
                this.nextUrl = response.data.next;
                this.previuosUrl = response.data.previous;
                
            }).
            catch(e => {
                console.log(e);
            })
        },

        handlePrevious(){        
            if(this.previuosUrl != null){
                this.currentPage--;
                this.showDetails = false;
                console.log(this.previuosUrl);
                this.getPlanets(this.previuosUrl)
            }        
        },

        handleNext(){                
            if(this.nextUrl != null){
                this.currentPage++;
                this.showDetails = false;
                console.log(this.nextUrl);
                this.getPlanets(this.nextUrl)
            } 
        },

        handleClose(){
            this.showDetails = false;
        },

        handleShowDetails(row){

            this.showDetails = true;
            let arrayFilms=[];
            let arrayResidents=[];

            row.films.forEach(element => {
                axios.get(element).then(response =>{
                arrayFilms.push(response.data);                 
            });
            });

            row.residents.forEach(element => {
                axios.get(element).then(response =>{
                arrayResidents.push(response.data);                 
            });
            });  

            this.films = arrayFilms;
            this.residents = arrayResidents;                        
        }
    }
}
</script>

<style>
.header{
    min-height: 140px;
    text-align: center;
    margin: 'auto';
    background: #BA343D;
    color: #f2f2f2;
}

.content{
    width: 90%;
    margin: 0 auto;
}
.paginator{
    padding-top: 15px;
    width: 40%;
    margin: 0 auto;
    margin-bottom: 10px;
}

.title{    
    padding-top: 40px;
}
#planets {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#planets td, #planets th {
  border: 1px solid #ddd;
  padding: 8px;
}

#planets tr:nth-child(even){background-color: #f2f2f2;}

#planets tr:hover {background-color: #ddd;}

#planets th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #BA343D;
  color: white;
}
</style>
