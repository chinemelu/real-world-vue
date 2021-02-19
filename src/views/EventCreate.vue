<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p class="errorMessage" v-if="!$v.event.category.required">
          Cetegory is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="[$v.event.title.$error ? 'error' : '', 'field']"
      />

      <template v-if="$v.event.title.$error">
        <p class="errorMessage" v-if="!$v.event.title.required">
          Title is required
        </p>
      </template>

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="[$v.event.description.$error ? 'error' : '', 'field']"
      />
      <template v-if="$v.event.description.$error">
        <p class="errorMessage" v-if="!$v.event.description.required">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="[$v.event.location.$error ? 'error' : '', 'field']"
      />
      <template v-if="$v.event.location.$error">
        <p class="errorMessage" v-if="!$v.event.location.required">
          Location is required
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @focusin.native="$v.event.date.$touch()"
        />
      </div>

      <template v-if="$v.event.date.$error">
        <p class="errorMessage" v-if="!$v.event.date.required">
          Date is required
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        v-model="event.time"
        :options="times"
        @blur="$v.event.time.$touch()"
        :class="[$v.event.time.$error ? 'error' : '', 'field']"
      />
      <template v-if="$v.event.time.$error">
        <p class="errorMessage" v-if="!$v.event.time.required">
          Time is required
        </p>
      </template>

      <BaseButton
        :disabled="$v.anyError"
        type="submit"
        buttonClass="-fill-gradient"
        >Submit</BaseButton
      >
      <p class="errorMessage" v-if="$v.$anyError">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

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
  validations: {
    event: {
      time: { required },
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
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
