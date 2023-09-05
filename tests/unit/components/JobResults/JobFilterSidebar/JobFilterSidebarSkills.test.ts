import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import userEvent from '@testing-library/user-event'
vi.mock('vue-router')

import JobFilterSidebarSkills from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarSkills.vue'
import { useUserStore } from '@/stores/user'
describe('JobFilterSidebarSkills', () => {
  const renderJobfiltersidebarSkills = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()

    render(JobFilterSidebarSkills, {
      global: {
        plugins: [pinia]
      }
    })

    return { userStore }
  }

  it('populates search input from store', async () => {
    const { userStore } = renderJobfiltersidebarSkills()
    userStore.skillSearchTerm = 'Programmer'

    const input = await screen.findByRole<HTMLInputElement>('textbox')
    expect(input.value).toBe('Programmer')
  })

  it('writes userinput to store', async () => {
    const { userStore } = renderJobfiltersidebarSkills()
    userStore.skillSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'V')
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('V')
  })

  it('romoves whitespaces from user input', async () => {
    const { userStore } = renderJobfiltersidebarSkills()
    userStore.skillSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '   Vue Developer')
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue Developer')
  })
})
