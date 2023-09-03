import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'
import { ref } from 'vue'

describe('usePreviousAndNextPages', () => {
  it('calculates page before current one', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)

    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBe(7)
  })

  describe('current page is first page ', () => {
    it('will not provide previous page', () => {
      const currentPage = ref(1)
      const maxPage = ref(1)

      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(previousPage.value).toBeUndefined()
    })
  })

  it('calculates page after current one', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)

    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBe(9)
  })

  describe('current page is last one ', () => {
    it('will not provide next page', () => {
      const currentPage = ref(8)
      const maxPage = ref(8)

      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(nextPage.value).toBeUndefined()
    })
  })
})
