<template>
  <div v-html="document"></div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'html-static',

  props: {
    fileName: { type: String, default: null }
  },

  data: function () {
    return {
      document: null
    };
  },

  mounted: function () {
    if (!this.fileName)
      return;
    const axiosInst = axios.create();
    axiosInst.get(this.fileName).then((result) => {
      this.document = result.data;
    });
  }
};
</script>
