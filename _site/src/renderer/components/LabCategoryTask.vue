<template>
    <div style="position: relative" class="tasks-item"
         :class="{[`tasks-item-difficulty-${task.difficult}`]: true}">
        <div class="tasks-item-index">{{index + 1}}</div>
        <div class="tasks-item-description ">
            <div v-html="task.decriprionRendered"></div>
            <div class="task-item-students">
                <div v-for="s in associatedStudents" class="task-item-student">
                    <div class="task-item-student-name">
                        <div class="">{{s.second_name}} {{s.first_name}}</div>
                        <div class="task-item-student-group">{{s.group_title}}</div>
                    </div>
                    <button class="btn btn-sm btn-danger" @click="$emit('studentBindingRemove', task, s)">x</button>
                </div>
            </div>
        </div>

        <div class="buttons" style="position: absolute; right: 10px; top: 10px">
            <button class="btn btn-success" data-toggle="modal" data-target="#addStudentModal"
                    @click="$emit('addStudentClick')">+
            </button>
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

</style>