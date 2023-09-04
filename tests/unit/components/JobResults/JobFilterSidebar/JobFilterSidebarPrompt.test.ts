import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import userEvent from '@testing-library/user-event'
vi.mock('vue-router')

import JobFilterSidebarPrompt from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarPrompt.vue'
import { useUserStore } from '@/stores/user'
describe('JobFilterSidebarPrompt', () => {
  describe('when user clicks Clear Filters Button', () => {
    it('sends message to clear all of users job search filters', async () => {
      const pinia = createTestingPinia()
      const userStore = useUserStore()

      render(JobFilterSidebarPrompt, {
        global: {
          plugins: [pinia]
        }
      })

      const button = screen.getByRole('button', { name: /clear filters/i })
      await userEvent.click(button)
      expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled()
    })
  })
})
