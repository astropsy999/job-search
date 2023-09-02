import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import userEvent from '@testing-library/user-event'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue'

describe('JobFilterSidebarJobTypes', () => {
  const renderJobFilterSidebarJobTypes = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    const $router = { push: vi.fn() }
    render(JobFilterSidebarJobTypes, {
      global: {
        mocks: {
          $router
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore, userStore, $router }
  }
  it('renders unique list of job types from jobs', async () => {
    const { jobsStore } = renderJobFilterSidebarJobTypes()
    jobsStore.UNIQUE_JOB_TYPES = new Set(['Type1', 'Type2'])

    const button = screen.getByRole('button', {
      name: /job types/i
    })

    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole('listitem')

    const jobtypes = jobTypesListItems.map((node) => node.textContent)

    expect(jobtypes).toEqual(['Type1', 'Type2'])
  })

  describe('when user click checkbox', () => {
    it('communicates that user has selected checkbox for job types', async () => {
      const { jobsStore, userStore } = renderJobFilterSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(['Type1', 'Type2'])

      const button = screen.getByRole('button', {
        name: /job types/i
      })

      await userEvent.click(button)

      const type1Checkbox = screen.getByRole('checkbox', {
        name: /type1/i
      })

      await userEvent.click(type1Checkbox)

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(['Type1'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const { jobsStore, $router } = renderJobFilterSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(['Type1', 'Type2'])

      const button = screen.getByRole('button', {
        name: /job types/i
      })

      await userEvent.click(button)

      const type1Checkbox = screen.getByRole('checkbox', {
        name: /type1/i
      })

      await userEvent.click(type1Checkbox)

      expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
