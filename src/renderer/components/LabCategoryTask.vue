<template>
    <div style="position: relative" class="tasks-item"
         :class="{[`tasks-item-difficulty-${task.difficult}`]: true}">
        <div class="tasks-item-index">{{index + 1}}</div>
        <div class="tasks-item-description ">
            <div class="text" v-html="task.decriprionRendered"></div>
        </div>
        <div class="task-item-students">
            <div v-for="s in associatedStudents" class="task-item-student">
                <div class="task-item-student-name">
                    <div class="">{{s.second_name}} {{s.first_name}}</div>
                    <div class="task-item-student-group">{{s.group_title}}</div>
                </div>
                <button class="btn btn-sm btn-danger" @click="$emit('studentBindingRemove', task, s)">x</button>
            </div>
            <div class="btn btn-block task-item-student" data-toggle="modal" data-target="#addStudentModal" @click="$emit('addStudentClick')">
                <div class="task-item-student-name" >
                    +
                </div>
            </div>
        </div>


    </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: "LabCategoryTask",
    props: ['task', 'index', 'studentTasksAssociations', 'students'],
    computed: {
      associatedStudents() {
        return this.studentTasksAssociations[this.task.id];
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
    .tasks-list .tasks-item .task-item-students {
        flex-basis: 200px;
    }
</style>