<template>
  <v-dialog v-model="showDialog" :persistent="isLoading" width="40rem">
    <v-card>
      <v-card-title v-if="isError" class="error"> Ошибка! </v-card-title>
      <v-container>
        <template v-if="isLoading">
          <v-row align-content="center" justify="center">
            <v-col class="text-h5 text-center">
              <p class="ma-0 mt-3">Подождите</p>
            </v-col>
          </v-row>
          <v-row align-content="center" justify="center">
            <v-col>
              <v-progress-linear color="blue darken-2" indeterminate rounded height="20"></v-progress-linear>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <div class="ma-3">
            <div>
              {{ errorMessage }}
            </div>
          </div>
        </template>
      </v-container>
      <v-card-actions v-if="isError" class="justify-center">
        <v-btn color="error" @click="showDialog=false" >Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { PROGRESS_STATE_ERROR, PROGRESS_STATE_IN_PROGRESS } from '@/store/const-progress';
import { MUTATION_PROGRESS_NONE } from '@/store/const-mutations';
export default {
  name: 'gk-progress',

  data: function () {
    return {
      showDialog: false
    };
  },

  props: {
    tag: { type: String, default: null }
  },

  mounted: function () {
    this.showDialog = this.isLoading || this.isError;
  },

  watch: {
    isLoading: function (newVal) {
      this.showDialog = newVal || this.isError;
    },

    isError: function (newVal) {
      this.showDialog = newVal || this.isLoading;
    },

    showDialog: function (newVal) {
      if (newVal !== true)
        this.$store.commit(MUTATION_PROGRESS_NONE);
    }
  },

  computed: {
    isLoading: (vm) => vm.isInProgressStateAndTag(PROGRESS_STATE_IN_PROGRESS),

    isError: (vm) => vm.isInProgressStateAndTag(PROGRESS_STATE_ERROR),

    errorMessage: function () {
      if (this.isError) {
        const error = this.$store.state.progress.error.error;
        if (error) {
          const result = error.message;
          return result;
        }
        return null;
      }
      return null;
    }
  },

  methods: {
    isInProgressStateAndTag: function (state) {
      if (!this.$store.state.progress)
        return false;
      if (this.$store.state.progress.state === state) {
        if (this.tag !== null && this.tag !== undefined) {
          return this.$store.state.progress.tag === this.tag;
        }
        return true;
      }
      else
        return false;
    }
  }
};
</script>
