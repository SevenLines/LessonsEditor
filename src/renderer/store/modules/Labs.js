const sqlite3 = require('sqlite3').verbose();
const remark = require('remark');
const math = require('remark-math');
const katex = require('remark-html-katex');// Use remark-html-katex
const html = require('remark-html');
import _ from 'lodash';


const processor = remark()
  .use(math)
  .use(katex)
  .use(html);


const state = {
  labs: [],
  students: {},
  tasksAssociations: {},
  tasks: [],
  db: null
};

const mutations = {
  SET_STUDENTS(state, studentsData) {
    state.students = studentsData;
  },
  SET_TASKS(state, tasksData) {
    state.tasks = tasksData;
  },
  SET_LABS(state, labsData) {
    state.labs = labsData;
  },
  SET_DB(state, db) {
    state.db = db;
  }
};

const actions = {
  setDb({commit, state}, url) {
    state.db = new sqlite3.Database(url);
    commit("SET_DB", db);
  },
  fetchStudents({commit, state}) {
    state.db.all(`SELECT s.id, first_name, second_name, g.title as group_title
                  FROM students s
                         JOIN groups g ON g.id = s.group_id
                  ORDER BY group_id, second_name, first_name`, (err, all) => {
      let data = {};
      _.forEach(all, row => {
        processor.process(row.description, (err, file) => {
          data[row.id] = row;
        });
      });
      commit("SET_STUDENTS", data);
    });
  },
  fetchTasks({commit, state}) {
    state.db.all(`SELECT *
                   FROM tasks WHERE category_id = ${this.category.id}`, (err, all) => {
      processor.process(row.description, (err, file) => {
        row.decriprionRendered = String(file);
        this.tasks.push(row);
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
}
