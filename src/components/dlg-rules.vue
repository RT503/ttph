<template>
  <v-dialog v-model="showDlg" max-width="30rem" scrollable persistent>
    <v-card>
      <v-card-text style="height: 30rem;">
        <html-static class="mt-5"
          fileName="docConsentRules.html"
        ></html-static>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="my-3" color="primary" @click="showDlg=false">ОК</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import htmlStatic from '@/components/html-static';

export default {
  name: 'dlg-consent-processing',

  components: { htmlStatic },

  data: function () {
    return {
      showDlg: false
    };
  },

  methods: {
    show: function () {
      this.showDlg = true;
    }
  }
};
</script>
