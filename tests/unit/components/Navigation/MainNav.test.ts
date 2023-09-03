import MainNav from '@/components/Navigation/MainNav.vue'
import { render, screen } from '@testing-library/vue'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import type { Mock } from 'vitest'
vi.mock('vue-router')

const useRouteMock = useRoute as Mock

describe('MainNav', () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia({ stubActions: false })
    useRouteMock.mockReturnValue({ name: 'Home' })
    render(MainNav, {
      global: {
        plugins: [pinia],

        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    })
  }
  it('display company name', () => {
    renderMainNav()
    const companyName = screen.getByText('Get Job')
    expect(companyName).toBeInTheDocument()
  })

  it('displays menu items for navigation', () => {
    renderMainNav()

    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent)
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Job',
      'How We Hire',
      'Students',
      'Jobs'
    ])
  })
  describe('when the user logged in', () => {
    it('displays user profile picture', async () => {
      renderMainNav()
      const userStore = useUserStore()

      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i
      })

      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      })

      userStore.isLoggedIn = true

      await userEvent.click(loginButton)

      profileImage = screen.getByRole('img', {
        name: /user profile image/i
      })

      expect(profileImage).toBeInTheDocument()
    })
  })
})
