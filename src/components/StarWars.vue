<template>
  <div class="starwars">
    <p>
      <router-link v-bind:to="{ name: 'Kindasaurus'}">Kindasaurus</router-link>
      &bull;
      <router-link v-bind:to="{ name: 'Rhymesaurus'}">Rhymesaurus</router-link>
      &bull;
      <router-link v-bind:to="{ name: 'Starwars'}">Star Wars</router-link>
    </p>
    <div class="forms">
      <label for="findCharacter">Pick a character:</label>
      <form v-on:submit.prevent="onSubmit">
        <select v-model="selected.id">
          <option disabled value="">Please select one</option>
          <!-- <option v-for="character in characterFilm" v-bind:value="films">{{ films }}</option> -->
          <option v-for="character in people" v-bind:key="character.id" :value="character.id">{{ character.name }}</option>
        </select>
        <button type="submit">Go</button>
      </form>
    </div>

    <ul v-if="films && films.length > 0" class="results">
      <li v-for="film in films" class="film">
        <p><strong>{{ film }}</strong></p>
      </li>
    </ul>

    <div v-else-if="results && results.length === 0" class="no-results">
      <h2>No Films Found</h2>
      <p>You must be thinking about a character from the Expanded Universe.</p>
    </div>

    <ul v-if="errors.length > 0" class="errors">
      <li v-for="error in errors">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Starwars',
  data () {
    return {
      results: null,
      errors: [],
      films: [],
      name: '',
      people: [],
      selected: { id: 0 },
    }
  },
  mounted: function () {
    axios.get('https://swapi.co/api/people/')
      .then(response => {
        this.results = response.data.results;
        this.people = this.results.map((x, idx) => {
          return { "id": idx, "name": x.name,"films":x.films };
        })
      })
      .catch(error => {
        this.errors.push(error);
      })
    // this.$nextTick(function () {
    //   // Code that will run only after the
    //   // entire view has been rendered
    // })
  },
  methods: {
    onSubmit: function () {
      this.films = this.people[this.selected.id].films;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.starwars {
  font-size: 1.4rem;
}

input[type="text"]{
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0,0,0,0.02);
  padding: 0.5rem;
}
button{
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1, h2 {
  font-weight: normal;
}

ul.results {
  list-style-type: none;
  padding: 0;
}

.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  min-height: 100px;
  color: #fff;
  background: rgba(0,0,0,0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}

a {
  color: #42b983;
}
</style>
