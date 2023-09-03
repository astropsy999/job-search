import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'vue-router'
vi.mock('vue-router')

import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'

describe('JobFilterSidebarCheckboxGroup', () => {
  const createProps = (props = {}) => ({
    header: 'Some Header',
    uniqueValues: new Set(['Value A', 'Value B']),
    action: vi.fn(),
    ...props
  })
  const renderJobFilterSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia()

    render(JobFilterSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }
  it('renders unique list of values ', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Type1', 'Type2'])
    })
    renderJobFilterSidebarCheckboxGroup(props)

    const button = screen.getByRole('button', {
      name: /job types/i
    })

    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole('listitem')

    const jobtypes = jobTypesListItems.map((node) => node.textContent)

    expect(jobtypes).toEqual(['Type1', 'Type2'])
  })

  describe('when user click checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      useRouter.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Type1', 'Type2']),
        action
      })
      renderJobFilterSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', {
        name: /job types/i
      })

      await userEvent.click(button)

      const type1Checkbox = screen.getByRole('checkbox', {
        name: /type1/i
      })

      await userEvent.click(type1Checkbox)

      expect(action).toHaveBeenCalledWith(['Type1'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })

      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Type1', 'Type2'])
      })

      renderJobFilterSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', {
        name: /job types/i
      })

      await userEvent.click(button)

      const type1Checkbox = screen.getByRole('checkbox', {
        name: /type1/i
      })

      await userEvent.click(type1Checkbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
