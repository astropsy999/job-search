import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

vi.mock('axios')

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores jobs listings', () => {
    const store = useJobsStore()

    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_JOBS', () => {
    it('makes API request and stores recieved jobs', async () => {
      axios.get.mockResolvedValue({ data: ['Job1', 'Job2'] })

      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['Job1', 'Job2'])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('find unuque organizations from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' }
      ]

      const result = store.UNIQUE_ORGANIZATIONS

      expect(result).toEqual(new Set(['Google', 'Amazon']))
    })
  })

  describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
    it('identifies jobs that are associated with the given organizations', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Microsoft' }
      ]

      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']

      const result = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS

      expect(result).toEqual([{ organization: 'Google' }, { organization: 'Microsoft' }])
    })
  })

  describe('when the user has not selected any organizations', () => {
    it('returns all jobs', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Microsoft' }
      ]

      const userStore = useUserStore()
      userStore.selectedOrganizations = []

      const result = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS

      expect(result).toEqual(jobStore.jobs)
    })
  })
})
