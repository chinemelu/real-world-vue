<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <event-card v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
    </template>
    <template v-if="page < this.maxNumberOfPages">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      perPage: 3
    }
  },
  computed: {
    ...mapState({
      event: state => state.event,
      user: state => state.user.user,
      totalNumberOfEvents: state => state.event.totalNumberOfEvents
    }),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    maxNumberOfPages() {
      return this.totalNumberOfEvents / this.perPage
    }
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  }
}
</script>

<style></style>
