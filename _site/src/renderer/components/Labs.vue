<template>
    <div class="container">
        <h1>Лабораторные</h1>
        <ul class="nav nav-pills">
            <li class="nav-item" v-for="lab in labs" @click="onLabClick(lab)" :key="lab.id">
                <a class="nav-link" :class="{active: lab == currentLab}" href="#">{{lab.title}}</a>
            </li>
        </ul>
        <hr>
        <LabsCategories :lab="currentLab"></LabsCategories>
    </div>
</template>

<script>
  import LabsCategories from "./LabsCategories";
  import db from '../db';
  export default {
    name: "Labs",
    data() {
      return {
        labs: [],
        currentLab: null,
      }
    },
    components: {
      LabsCategories
    },
    mounted() {
      this.labs = [];
      db.each("SELECT * FROM labs", (err, row) => {
        this.labs.push(row);
      });
    },
    methods: {
      onLabClick(lab) {
        this.currentLab = lab;
      }
    }
  }
</script>

<style scoped>

</style>