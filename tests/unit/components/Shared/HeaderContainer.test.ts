import { render, screen } from '@testing-library/vue'

import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer', () => {
  it('allows parent component to provide title', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h1>Some title</h1>'
      }
    })
    expect(screen.getByText('Some title')).toBeInTheDocument()
  })

  it('allows parent component to provide subtitle', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h2>Subtitle text</h2>'
      }
    })
    expect(screen.getByText('Subtitle text')).toBeInTheDocument()
  })
})
