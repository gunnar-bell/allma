<template>
  <div class="container">
    <div class="header-container">
      <div class="controls-block">
        <div class="search">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Search"
          ></b-form-input>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="tasks.length"
          :per-page="perPage"
          aria-controls="table"
        ></b-pagination>
      </div>
      <div class="data-block">
        <div>{{ dueDateRangeDisplay }}</div>
        <div>{{ completionRateDisplay }}</div>
        <div>{{ troubleRateDisplay }}</div>
      </div>
    </div>
    <b-table 
      id="table" 
      outlined 
      striped 
      hover 
      stacked="md"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :per-page="perPage"
      :current-page="currentPage"
      :items="tasks"
      :fields="fields"
    >
      <template v-slot:cell(assignedToUser)="data">
        <span>{{ data.item.assignedToUser.fullName }}</span>
      </template>
      <template v-slot:cell(user)="data">
        <span>{{ data.item.user.fullName }}</span>
      </template>
      <template v-slot:cell(dueDate)="data">
        <span>{{moment(data.item.dueDate).format("MMM D, YYYY") }}</span>
      </template>
      <template v-slot:cell(daysLeft)="data">
        <span>
          {{ 
            moment(data.item.dueDate).diff(moment(), 'days')
          }}
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>

// this would probably be an api endpoint
import tasks from './tasks.json'

const moment = require('moment')

const fields = [
  {key: 'name', label: 'Description', sortable: true},
  {key: 'dueDate', sortable: true}, // TODO: add function to sort by date instead of string
  {key: 'user', label: 'Author', sortable: true},
  {key: 'assignedToUser', label: 'Assignee', sortable: true},
  {key: 'taskStatusId', label: 'Status', sortable: true},
  {key: 'daysLeft'}
]

const COMPLETED_STATUSES = [
  "Completed", 
  "Canceled",
  "Incompletable"
]
const TROUBLED_STATUSES = [
  "Delayed",
  "Blocked",
  "Stuck"
]

export default {
  name: 'TasksContainer',
  data() {
    return {
      tasks: tasks['tasks'],
      fields: fields,
      perPage: 10,
      currentPage: 1,
      filter: null,
      filterOn: [
        "name",
        "user",
        "assignedToUser",
        "taskStatusId"
      ]
    }
  },
  computed: {
    dueDateRangeDisplay() {
      const dueDatesArray = this.tasks.map(task => moment(task.dueDate))
      const sortedDueDates = dueDatesArray
        .map(
          dueDate => moment(dueDate)
        )
        .sort(
          (a, b) => a.unix() - b.unix()
        )

      const minDueDate = sortedDueDates[0]
      const maxDueDate = sortedDueDates.slice(-1)[0]
      const dayDifference = maxDueDate.diff(minDueDate, 'days')
      return `Due Dates (${dayDifference} days): ${minDueDate.format("MMM D, YYYY")} - ${maxDueDate.format("MMM D, YYYY")}`
    },
    completionRateDisplay() {
      const completedCount = this.tasks.filter(
        task => COMPLETED_STATUSES.includes(task.taskStatusId)
      ).length
      
      const completionRate = completedCount / this.tasks.length
      return `Completion Rate: ${completionRate * 100}%`
    },
    troubleRateDisplay() {
      const troubledCount = this.tasks.filter(
        task => TROUBLED_STATUSES.includes(task.taskStatusId)
      ).length
      
      const troubledRate = troubledCount / this.tasks.length
      return `Troubled Rate: ${troubledRate * 100}%`
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
.header-container {
  display: flex;
  justify-content: space-between;
}
.data-block {
  text-align: right;
}
.controls-block {
  display: inline-flex;
  flex-direction: column;
}
.search {
  margin-bottom: 8px;
  max-width: 250px;
}
</style>
