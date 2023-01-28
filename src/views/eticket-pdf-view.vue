<template>
  <div>
    <pdf-component
      ref="pdf-component"
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      filename="tickets"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-content-width="100%"
    >
      <section slot="pdf-content">
        <div class="pdf-container">
          <div class="pdf-ticket-wrapper" v-for="(item, index) in tickets" :key="index">
            <div class="pdf-ticket">
              <p class="pdf-font">{{ formatStringDateTime(item.creationDate) }}</p>
              <p class="pdf-font">{{ item.serviceName }}</p>
              <p class="pdf-font">{{ item.stateName }}</p>
              <vue-barcode class="pdf-font" :value="item.ticketId" />
              <!-- <svg :id="`barcode-${index}`"></svg> -->
            </div>
          </div>
        </div>
        <!-- <svg viewBox="0 0 312 340" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0H288C301.255 0 312 10.7452 312 24V148C299.85 148 290 157.85 290 170C290 182.15 299.85 192 312 192V316C312 329.255 301.255 340 288 340H24C10.7452 340 0 329.255 0 316V192C12.1503 192 22 182.15 22 170C22 157.85 12.1503 148 0 148V24Z" fill="white"/><line x1="23" y1="169.5" x2="289" y2="169.5" stroke="#F1F1F1" stroke-dasharray="2 2"/></svg> -->
      </section>
    </pdf-component>
  </div>
</template>

<script>
import { formatStringDateTime } from '@/tools/format';
import vueBarcode from 'vue-barcode';
import pdfComponent from './pdf-component.vue';

export default {
  name: 'eticket-pdf-view',

  components: { pdfComponent, vueBarcode },

  computed: {
    tickets: (vm) => vm.ticketsData
  },

  methods: {
    formatStringDateTime: formatStringDateTime,

    savePdf (tickets) {
      this.ticketsData = tickets;
      this.$refs['pdf-component'].generatePdf();
      // const pdf = this.$refs['pdf-content'];
      // var opt = {
      //   margin: 1,
      //   filename: 'tickets.pdf',
      //   image: { type: 'jpeg', quality: 0.98 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      // };
      // html2pdf(pdf, opt);
    }
  },

  data: () => ({
    ticketsData: []
  })
};
</script>

<style lang="scss" scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.pdf-ticket-wrapper {
  display: flex;
  flex-direction: column;
  padding-left: 2vw;
  padding-right: 2vw;
  page-break-inside:avoid; 
  page-break-after:auto;
}
.pdf-font {
  font-family: Proxima Nova;
  display: flex;
  justify-content: center;
}
.pdf-ticket {
  display: flex;
  flex-direction: column;
  border-bottom-style: dotted;
  border-color: gray;
  border-width: 1px;
  background-color: white;
  padding-top: 2vh;
  padding-bottom: 2vh;
}
.pdf-container :last-child .pdf-ticket {
  border-bottom-style: none;
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
</style>
