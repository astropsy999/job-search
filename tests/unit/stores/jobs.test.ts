import axios from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import type { Mock } from 'vitest'
import { createJob } from '../../utils/createJob'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

vi.mock('axios')

const axiosGetMock = axios.get as Mock

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
      axiosGetMock.mockResolvedValue({ data: ['Job1', 'Job2'] })

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
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Google' })
      ]

      const result = store.UNIQUE_ORGANIZATIONS

      expect(result).toEqual(new Set(['Google', 'Amazon']))
    })
  })

  describe('UNIQUE_BY_JOB_TYPES', () => {
    it('find unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ jobType: 'Type1' }),
        createJob({ jobType: 'Type2' }),
        createJob({ jobType: 'Type1' })
      ]

      const result = store.UNIQUE_JOB_TYPES

      expect(result).toEqual(new Set(['Type1', 'Type2']))
    })
  })

  describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when the user has not selected any organization', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const store = useJobsStore()
        const job = createJob({ organization: 'Google' })

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']
      const store = useJobsStore()
      const job = createJob({ organization: 'Google' })

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)
      expect(result).toBe(true)
    })
  })
  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any job types', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const store = useJobsStore()
        const job = createJob({ jobType: 'Full-time' })

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with with given job types', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Part-time']
      const store = useJobsStore()
      const job = createJob({ jobType: 'Full-time' })

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)
      expect(result).toBe(true)
    })
  })
  describe('INCLUDE_JOB_BY_DEGREES', () => {
    describe('when the user has not selected any degrees', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedDergees = []
        const store = useJobsStore()
        const job = createJob({})

        const result = store.INCLUDE_JOB_BY_DEGREE(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with with given degrees', () => {
      const userStore = useUserStore()
      userStore.selectedJDegrees = ["Master's"]
      const store = useJobsStore()
      const job = createJob({ degree: "Master's" })

      const result = store.INCLUDE_JOB_BY_DEGREE(job)
      expect(result).toBe(true)
    })
  })
})
