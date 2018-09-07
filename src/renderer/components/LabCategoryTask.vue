<template>
    <div style="position: relative" class="tasks-item"
         :class="{[`tasks-item-difficulty-${task.difficult}`]: true}">
        <div class="tasks-item-index">{{index + 1}}</div>
        <div class="tasks-item-description ">
            <div class="text" v-html="task.decriprionRendered"></div>
        </div>
        <div class="task-item-students">
            <div v-for="s in associatedStudents" class="task-item-student" style="align-items: center">
                <div style="margin-right: auto">
                    <button class="btn btn-sm btn-default" :class="{'btn-default': s.done_at == null, 'btn-success': s.done_at != null}" style="margin-right: 0.5em"
                            @click="$emit('studentTaskDone', task, s.student)">
                        <i class="far fa-check-circle"></i>
                    </button>
                </div>
                <div class="task-item-student-name">
                    <div class="text-right">{{s.student.second_name}} {{s.student.first_name}}</div>
                    <div class="task-item-student-group">{{s.student.group_title}}</div>
                </div>
                <button class="btn btn-sm btn-danger" @click="$emit('studentBindingRemove', task, s.student)"><i
                        class="fas fa-times"></i></button>
            </div>
            <div class="btn btn-block task-item-student" data-toggle="modal" data-target="#addStudentModal"
                 @click="$emit('addStudentClick')">
                <div class="task-item-student-name">
                    <i class="fa fa-plus"></i>
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
    methods: {}
  }
</script>

<style lang="scss" scoped>
    .tasks-list .tasks-item .task-item-students {
        flex-basis: 200px;
    }
</style>