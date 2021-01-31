import store from '@/store'

const getPageEvents = (to, next) => {
  const currentPage = parseInt(to.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage
      next()
    })
}

export default getPageEvents
