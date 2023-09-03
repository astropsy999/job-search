import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'

import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'
vi.mock('vue-router')
import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { describe } from 'vitest'

describe('TheSubnav', () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore }
  }
  describe('when user is on jobs page', () => {
    it('displays job count', async () => {
      useRoute.mockReturnValue({ name: 'JobResults' })
      const { jobsStore } = renderTheSubnav()

      const numberOfJobs = 16

      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('when user is not on jobs page', () => {
    it('does not dispaly job count', () => {
      const routeName = 'Home'
      const { jobsStore } = renderTheSubnav(routeName)

      const numberOfJobs = 16

      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})
      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
