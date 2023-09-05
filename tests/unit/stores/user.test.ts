import { useUserStore } from '@/stores/user'
import { createPinia, setActivePinia } from 'pinia'

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('keeps track of if user is logged in', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('stores organizations that the user would like to filter jobs by', () => {
    const store = useUserStore()

    expect(store.selectedOrganizations).toEqual([])
  })
  it('stores degrees that user would like to filter jobs by', () => {
    const store = useUserStore()

    expect(store.selectedDegrees).toEqual([])
  })
  it('stores user serch term for skills and qualifications', () => {
    const store = useUserStore()
    expect(store.skillSearchTerm).toBe('')
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('LOGIN_USER', () => {
    it('logs the user in', () => {
      const store = useUserStore()
      store.LOGIN_USER()
      expect(store.isLoggedIn).toBe(true)
    })
  })

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('updates organizations the user has choosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2'])
      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2'])
    })
    it('stores job types that the users would like to filter jobs by  ', () => {
      const store = useUserStore()
      expect(store.selectedJobTypes).toEqual([])
    })
  })

  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates jobtypes the user has choosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_JOB_TYPES(['type1', 'type2'])
      expect(store.selectedJobTypes).toEqual(['type1', 'type2'])
    })
  })
  describe('ADD_SELECTED_DEGREES', () => {
    it('updates degrees the user has choosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"])
      expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"])
    })
  })
  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('recieves search term for skills the user has entered', () => {
      const store = useUserStore()
      store.skillSearchTerm = ''
      store.UPDATE_SKILLS_SEARCH_TERM('Some search term')
      expect(store.skillSearchTerm).toBe('Some search term')
    })
  })
  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useUserStore()

      store.selectedDegrees = ['Random degree']
      store.selectedJobTypes = ['Random jobType']
      store.selectedOrganizations = ['Random organization']
      store.skillSearchTerm = 'Vue Developer'

      store.CLEAR_USER_JOB_FILTER_SELECTIONS()

      expect(store.selectedDegrees).toEqual([])
      expect(store.selectedJobTypes).toEqual([])
      expect(store.selectedOrganizations).toEqual([])
      expect(store.skillSearchTerm).toBe('')
    })
  })
})
