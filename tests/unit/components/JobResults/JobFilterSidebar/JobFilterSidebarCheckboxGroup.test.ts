import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'vue-router'
vi.mock('vue-router')

import type { Mock } from 'vitest'

const useRouterMock = useRouter as Mock

import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'
import { useUserStore } from '@/stores/user'
describe('JobFilterSidebarCheckboxGroup', () => {
  interface JobFilterSidebarCheckboxGroup {
    uniqueValues: Set<string>
    action: Mock
  }
  const createProps = (
    props: Partial<JobFilterSidebarCheckboxGroup> = {}
  ): JobFilterSidebarCheckboxGroup => ({
    uniqueValues: new Set(['Value A', 'Value B']),
    action: vi.fn(),
    ...props
  })
  const renderJobFilterSidebarCheckboxGroup = (props: JobFilterSidebarCheckboxGroup) => {
    const pinia = createTestingPinia({ stubActions: false })
    const userStore = useUserStore()

    render(JobFilterSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia]
      }
    })

    return { userStore }
  }
  it('renders unique list of values ', () => {
    const props = createProps({
      uniqueValues: new Set(['Type1', 'Type2'])
    })
    renderJobFilterSidebarCheckboxGroup(props)

    const jobTypesListItems = screen.getAllByRole('listitem')

    const jobtypes = jobTypesListItems.map((node) => node.textContent)

    expect(jobtypes).toEqual(['Type1', 'Type2'])
  })

  describe('when user click checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        uniqueValues: new Set(['Type1', 'Type2']),
        action
      })
      renderJobFilterSidebarCheckboxGroup(props)

      const type1Checkbox = screen.getByRole('checkbox', {
        name: /type1/i
      })

      await userEvent.click(type1Checkbox)

      expect(action).toHaveBeenCalledWith(['Type1'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn()
      useRouterMock.mockReturnValue({ push })

      const props = createProps({
        uniqueValues: new Set(['Type1', 'Type2'])
      })

      renderJobFilterSidebarCheckboxGroup(props)

      const type1Checkbox = screen.getByRole('checkbox', {
        name: /type1/i
      })

      await userEvent.click(type1Checkbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })

  describe('when user clears job filters', () => {
    it('unchecks any checked chekboxes', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })

      const props = createProps({
        uniqueValues: new Set(['Type1', 'Type2'])
      })

      const { userStore } = renderJobFilterSidebarCheckboxGroup(props)

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
        name: /type1/i
      })

      await userEvent.click(fullTimeCheckboxBeforeAction)
      expect(fullTimeCheckboxBeforeAction.checked).toBe(true)

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS()

      const fullTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>('checkbox', {
        name: /type1/i
      })

      expect(fullTimeCheckboxAfterAction.checked).toBe(false)
    })
  })
})
