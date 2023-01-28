<template>
  <v-dialog ref="dialog" v-model="modal" persistent width="20rem">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="formattedDate" :label="label" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
    </template>
    <v-date-picker :min="min" :max="max" v-model="date" scrollable @input="onDateInput"> </v-date-picker>
  </v-dialog>
</template>

<script>
import { isoDate } from '@/tools/format';

export default {
  name: 'dlg-date-input',

  props: {
    value: { default: null },
    min: { default: null },
    max: { default: null },
    label: { type: String, default: 'Дата' }
  },

  data: () => ({
    modal: false,
    date: isoDate(new Date(Date.now()))
  }),

  computed: {
    formattedDate: (vm) => {
      return new Date(Date.parse(vm.date)).toLocaleDateString();
    }
  },

  mounted () {
    this.onNewValue(this.value);
  },

  watch: {
    value (newVal) {
      this.onNewValue(newVal);
    }
  },

  methods: {
    onNewValue (newVal) {
      if (!newVal) 
        this.date = null;
      if (typeof newVal === 'object') {
        this.date = isoDate(newVal);
        return;
      }
      if (typeof newVal === 'string') {
        this.date = isoDate(new Date(Date.parse(newVal)));
        return;
      }
      if (typeof newVal === 'number') {
        this.date = isoDate(new Date(newVal));
        return;
      }
    },

    onDateInput () {
      this.dateSelect();
    },

    dateSelect () {
      const result = new Date(Date.parse(this.date) + (new Date()).getTimezoneOffset() * 60000);
      this.modal = false;
      this.$emit('input', result);
    }
  }
};
</script>

<style></style>
