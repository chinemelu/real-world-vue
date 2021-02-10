<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
      />

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect
        label="Select a time"
        v-model="event.time"
        :options="times"
        class="field"
      />

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    createEvent() {
      NProgress.start() // start progress bar before the API is called
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done() // end progress bar when there is an error
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user.name
      const id = Math.floor(Math.random() * 10000000)
      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  components: {
    Datepicker
  },
  computed: {
    localComputed() {
      return 'something'
    },
    catLength() {
      return this.$store.getters.catLength
    },
    ...mapState(['user']),
    ...mapGetters(['event/getEventById'])
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
