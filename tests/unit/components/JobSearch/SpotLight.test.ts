import { render, screen } from '@testing-library/vue'
import axios from 'axios'
import SpotLight from '@/components/JobSearch/SpotLight.vue'
import type { Mock } from 'vitest'

vi.mock('axios')

const axiosGetMock = axios.get as Mock

describe('SpotLight', () => {
  const queryAxiosMockObj = (spotLight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some Image',
          title: 'Some Title',
          description: 'Some Description',
          ...spotLight
        }
      ]
    })
  }
  it('provides image to parent component', async () => {
    const spotlight = { img: 'Other image' }
    queryAxiosMockObj(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps"><h1>{{ slotProps.img}}</h1></template>`
      }
    })

    const text = await screen.findByText('Other image')
    expect(text).toBeInTheDocument()
  })
  it('provides title to parent component', async () => {
    const spotlight = { title: 'Other title' }
    queryAxiosMockObj(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps"><h1>{{ slotProps.title}}</h1></template>`
      }
    })

    const text = await screen.findByText('Other title')
    expect(text).toBeInTheDocument()
  })
  it('provides description to parent component', async () => {
    const spotlight = { description: 'Some Description' }
    queryAxiosMockObj(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps"><h1>{{ slotProps.description}}</h1></template>`
      }
    })

    const text = await screen.findByText('Some Description')
    expect(text).toBeInTheDocument()
  })
})
