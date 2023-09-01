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
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore()
      store.loginUser()
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
})
