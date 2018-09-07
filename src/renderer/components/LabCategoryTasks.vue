<template>
    <div>
        <!-- Button trigger modal -->
        <div class="tasks-list">
            <LabCategoryTask :studentTasksAssociations="studentTasksAssociations"
                             :index="index"
                             :students="students"
                             :task="t" v-for="(t, index) in tasksOrdered"
                             @studentBindingRemove="onStudentBindingRemove"
                             @studentTaskDone="onStudentTaskDone"
                             @addStudentClick="onAddStudentClick(t)"></LabCategoryTask>
        </div>
        <div class="modal fade" id="addStudentModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Добавить студента</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <el-select v-model="currentStudent" filterable placeholder="Select">
                            <el-option-group
                                    v-for="(students, group_title) in studentsByGroupsSorted"
                                    :key="group_title"
                                    :label="group_title">
                                <el-option
                                        v-for="(student, key) in students"
                                        :key="student.id"
                                        :label="`${student.second_name} ${student.first_name}`"
                                        :value="student.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addStudentToTask">
                            Добавить
                        </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import db from '../db';
  import LabCategoryTask from './LabCategoryTask';

  const remark = require('remark');
  const math = require('remark-math');
  const katex = require('remark-html-katex');// Use remark-html-katex
  const html = require('remark-html');
  import _ from 'lodash';
  import moment from 'moment';

  require("bootstrap");

  const processor = remark()
    .use(math)
    .use(katex)
    .use(html)

  export default {
    name: "LabCategoryTasks",
    props: ['lab', 'category'],
    data() {
      return {
        tasks: [],
        studentTasksAssociations: {},
        students: {},
        currentTask: {},
        currentStudent: {},
      }
    },
    components: {
      LabCategoryTask,
    },
    created() {
      // this.students = {};
      db.all(`SELECT s.id, first_name, second_name, g.title as group_title
              FROM students s JOIN groups g ON g.id = s.group_id ORDER BY group_id, second_name, first_name`, (err, all) => {
        let data = {};
        _.forEach(all, row => {
          processor.process(row.description, (err, file) => {
            data[row.id] = row;
          });
        });
        this.students = data;
        this.fetchStudentTaskAssociations();
      });
    },
    computed: {
      tasksOrdered() {
        return _.orderBy(this.tasks, ['difficult', 'id'])
      },
      studentsByGroupsSorted () {
        let groups = {};
        _.forEach(this.students, s => {
          if (groups[s.group_title] == null) {
            groups[s.group_title] = [];
          }
          groups[s.group_title].push(s);
        });
        _.forEach(groups, (g, key) => {
          groups[key] = _.sortBy(g, ['second_name', 'first_name']);
        });
        return groups
      }
    },
    watch: {
      category() {
        this.fetchTasks();
      }
    },
    methods: {
      fetchStudentTaskAssociations() {
        let that = this;
        // this.studentTasksAssociations = {};
        db.all(`SELECT *
                 FROM student_task`, (err, all) => {
          let data = {};
          all.forEach(row => {
            if (data[row.task_id] == null) {
              data[row.task_id] = []
            }
            data[row.task_id].push({
              student: that.students[row.student_id],
              done_at: row.done_at
            });
          })
          this.studentTasksAssociations = data;
        });

      },
      fetchTasks() {
        this.tasks = [];
        db.each(`SELECT *
                 FROM tasks WHERE category_id = ${this.category.id}`, (err, row) => {
          processor.process(row.description, (err, file) => {
            row.decriprionRendered = String(file);
            this.tasks.push(row);
          });
        });
      },
      addStudentToTask() {
        db.run(`INSERT INTO student_task(student_id, task_id)  VALUES(${this.currentStudent}, ${this.currentTask.id})`);
        this.fetchStudentTaskAssociations();
      },
      onAddStudentClick(task) {
        this.currentTask = task;
      },
      onStudentBindingRemove(task, student) {
        db.run(`DELETE FROM student_task WHERE student_id = ${student.id} and task_id = ${task.id}`);
        this.fetchStudentTaskAssociations();
      },
      onStudentTaskDone(task, student) {
        let dt = moment(new Date()).format("YYYY-MM-DD");
        db.run(`UPDATE student_task SET done_at = CASE WHEN done_at is NOT NULL THEN NULL ELSE '${dt}' END WHERE student_id = ${student.id} and task_id = ${task.id}`);
        this.fetchStudentTaskAssociations();
      }
    }
  }
</script>

<style lang='scss' scoped>
</style>