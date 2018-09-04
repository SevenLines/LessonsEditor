<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item" v-for="category in categories" :key="category.id" @click="onCategoryClick(category)">
                <a class="nav-link" :class="{active: category == currentCategory}" href="#">{{category.title}}</a>
            </li>
        </ul>
        <LabCategoryTasks :lab="lab" :category="currentCategory"></LabCategoryTasks>
    </div>
</template>

<script>
  import db from '../db';
  import LabCategoryTasks from './LabCategoryTasks';

  export default {
    name: "LabsCategories",
    props: ['lab'],
    data () {
      return {
        categories: [],
        currentCategory: null,
      }
    },
    components: {
      LabCategoryTasks,
    },
    watch: {
      lab() {
        this.categories = [];
        db.each(`SELECT * FROM labs_categories WHERE lab_id = ${this.lab.id}`, (err, row) => {
          this.categories.push(row);
        });
      }
    },
    methods: {
      onCategoryClick(category) {
        this.currentCategory = category;
      }
    }
  }
</script>

<style scoped>

</style>