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
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '@/components/EventCard'
import getPageEvents from '@/helper'

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
    maxNumberOfPages() {
      return this.totalNumberOfEvents / this.perPage
    },
    hasNextPage() {
      return this.page < this.maxNumberOfPages
    }
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next)
  }
}
</script>

<style></style>
