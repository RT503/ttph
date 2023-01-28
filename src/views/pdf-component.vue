<template>
  <div class="vue-html2pdf">
    <section
      class="layout-container"
      :class="{
        'show-layout': showLayout,
        'unset-all': !floatLayout,
      }"
    >
      <section class="content-wrapper" :style="`width: ${pdfContentWidth};`" ref="pdfContent">
        <slot name="pdf-content" />
      </section>
    </section>

    <transition name="transition-anim">
      <section class="pdf-preview" v-if="pdfFile">
        <button @click.self="closePreview()">&times;</button>

        <iframe :src="pdfFile" width="100%" height="100%" />
      </section>
    </transition>
  </div>
</template>
<script>
import html2pdf from 'html2pdf.js';
export default {
  props: {
    showLayout: { type: Boolean, default: false },
    floatLayout: { type: Boolean, default: true },
    enableDownload: { type: Boolean, default: true },
    previewModal: { type: Boolean, default: false },
    filename: { type: String, default: `${new Date().getTime()}` },
    pdfQuality: { type: Number, default: 2 },
    pdfFormat: { default: 'a4' },
    pdfOrientation: { type: String, default: 'portrait' },
    pdfContentWidth: { default: '800px' },
    htmlToPdfOptions: { type: Object }
  },
  data () {
    return {
      hasAlreadyParsed: false,
      progress: 0,
      pdfWindow: null,
      pdfFile: null
    };
  },
  watch: {
    progress (val) {
      this.$emit('progress', val);
    }
  },
  methods: {
    generatePdf () {
      this.$emit('startPagination');
      this.downloadPdf();
    },
    async downloadPdf () {
      // Set Element and Html2pdf.js Options
      const pdfContent = this.$refs.pdfContent;
      const options = this.setOptions();
      this.$emit('beforeDownload', { html2pdf, options, pdfContent });
      const html2PdfSetup = html2pdf().set(options).from(pdfContent);
      let pdfBlobUrl = null;
      if (this.previewModal) {
        this.pdfFile = await html2PdfSetup.output('bloburl');
        pdfBlobUrl = this.pdfFile;
      }
      if (this.enableDownload) {
        pdfBlobUrl = await html2PdfSetup.save().output('bloburl');
      }
      if (pdfBlobUrl) {
        const res = await fetch(pdfBlobUrl);
        const blobFile = await res.blob();
        this.$emit('hasDownloaded', blobFile);
      }
      this.progress = 100;
    },
    setOptions () {
      if (this.htmlToPdfOptions !== undefined && this.htmlToPdfOptions !== null) {
        return this.htmlToPdfOptions;
      }
      return {
        margin: 0,
        filename: `${this.filename}.pdf`,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        enableLinks: false,
        jsPDF: {
          unit: 'mm',
          format: this.pdfFormat,
          orientation: this.pdfOrientation
        },
        html2canvas: { 
          scale: 4 
        },
        pagebreak: {
          mode: 'css',
          useCORS: true
        }
      };
    },
    closePreview () {
      this.pdfFile = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-html2pdf {
  .layout-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: -100vw;
    top: 0;
    z-index: -9999;
    background: rgba(95, 95, 95, 0.8);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: auto;
    &.show-layout {
      left: 0vw;
      z-index: 9999;
    }
    &.unset-all {
      all: unset;
      width: auto;
      height: auto;
    }
  }
  .pdf-preview {
    position: fixed;
    width: 65%;
    min-width: 600px;
    height: 80vh;
    top: 100px;
    z-index: 9999999;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    box-shadow: 0px 0px 10px #00000048;
    button {
      position: absolute;
      top: -20px;
      left: -15px;
      width: 35px;
      height: 35px;
      background: #555;
      border: 0;
      box-shadow: 0px 0px 10px #00000048;
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
    }
    iframe {
      border: 0;
    }
  }
  .transition-anim-enter-active,
  .transition-anim-leave-active {
    transition: opacity 0.3s ease-in;
  }
  .transition-anim-enter,
  .transition-anim-leave-to {
    opacity: 0;
  }
}
</style>
