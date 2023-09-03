import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('CollapsibleAccordion', () => {
  const renderCollapsiblaAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        header: 'My category'
      },
      slots: {
        default: '<h3>My nested child</h3>'
      },
      ...config
    })
  }
  it('renders child content', async () => {
    const props = {
      header: 'My category'
    }
    const slots = {
      default: '<h3>My nested child</h3>'
    }
    const config = { props, slots }

    renderCollapsiblaAccordion(config)

    expect(screen.queryByText('My nested child')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: /my category/i })
    await userEvent.click(button)
    expect(screen.getByText('My nested child')).toBeInTheDocument()
  })

  describe('when parent does not provide custom child content', () => {
    it('renders deafult content', async () => {
      const props = {
        header: 'My category'
      }
      const slots = {}
      const config = { props, slots }
      renderCollapsiblaAccordion(config)

      const button = screen.getByRole('button', { name: /my category/i })
      await userEvent.click(button)
      expect(screen.getByText('Whoops! Somebody forgot to populate me')).toBeInTheDocument()
    })
  })
})
