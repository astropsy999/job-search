import { defineStore } from 'pinia'
import { ref } from 'vue'

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS'
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES'
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES'
export const UPDATE_SKILLS_SEARCH_TERM = 'UPDATE_SKILLS_SEARCH_TERM'
export const CLEAR_USER_JOB_FILTER_SELECTIONS = 'CLEAR_USER_JOB_FILTER_SELECTIONS'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const skillSearchTerm = ref('')

  const LOGIN_USER = () => {
    isLoggedIn.value = true
  }

  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations
  }

  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }

  const ADD_SELECTED_DEGREES = (degree: string[]) => {
    selectedDegrees.value = degree
  }
  const UPDATE_SKILLS_SEARCH_TERM = (term: string) => {
    skillSearchTerm.value = term
  }

  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedDegrees.value = []
    selectedJobTypes.value = []
    selectedOrganizations.value = []
    skillSearchTerm.value = ''
  }

  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    skillSearchTerm,
    LOGIN_USER,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    CLEAR_USER_JOB_FILTER_SELECTIONS,
    UPDATE_SKILLS_SEARCH_TERM
  }
})
