import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import userEvent from '@testing-library/user-event'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'

describe('JobFilterSidebarOrganizations', () => {
  const renderJobFilterSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    const $router = { push: vi.fn() }

    render(JobFilterSidebarOrganizations, {
      global: {
        mocks: { $router },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore, userStore, $router }
  }
  it('renders unique list of organizations from jobs', async () => {
    const { jobsStore } = renderJobFilterSidebarOrganizations()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    const button = screen.getByRole('button', {
      name: /organizations/i
    })

    await userEvent.click(button)

    const organizationListItems = screen.getAllByRole('listitem')

    const organizations = organizationListItems.map((node) => node.textContent)

    expect(organizations).toEqual(['Google', 'Amazon'])
  })

  describe('when user click checkbox', () => {
    it('communicates that user has selected checkbox for organization', async () => {
      const { jobsStore, userStore } = renderJobFilterSidebarOrganizations()
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

      const button = screen.getByRole('button', {
        name: /organizations/i
      })

      await userEvent.click(button)

      const googleCheckbox = screen.getByRole('checkbox', {
        name: /google/i
      })

      await userEvent.click(googleCheckbox)

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['Google'])
    })
    it('navigates user to job results page to see fresh batch of filtered organizations', async () => {
      const { jobsStore, $router } = renderJobFilterSidebarOrganizations()
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Microsoft'])

      const button = screen.getByRole('button', {
        name: /organizations/i
      })

      await userEvent.click(button)

      const orgCheckbox = screen.getByRole('checkbox', {
        name: /google/i
      })

      await userEvent.click(orgCheckbox)

      expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
