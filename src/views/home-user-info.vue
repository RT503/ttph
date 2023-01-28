<template>
  <v-container class="elevation-10 px-md-15 px-sm-10" style="height: 100%">
    <v-form v-model="validForm" ref="form" class="my-5">
      <v-row>
        <v-col>
          <v-btn large color="primary" @click="onBack"><v-icon class="mr-2">mdi-keyboard-backspace</v-icon>Назад</v-btn>
          <v-spacer />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-center my-10">
          <v-subheader class="text-h5 text--primary">Введите ваш номер телефона</v-subheader>
        </v-col>
      </v-row>

      <v-row class="mb-5">
        <v-col>
          <vue-tel-input-vuetify
            outlined
            defaultCountry="RU"
            disabledFetchingCountry
            autofocus
            placeholder="пусто"
            label="Введите ваш номер телефона"
            @input="onInputPhone"
            v-model="phone"
            ref="tel-input"
            :validCharactersOnly="true"
            :error-messages="errorMessage"
            @keydown.enter.prevent="onBuyTicket"
          ></vue-tel-input-vuetify>
        </v-col>
      </v-row>

      <v-row class="mb-5">
        <v-col>
          <p class="text-body-1 text--primary">
            Нажимая кнопку "{{ ticketCaption }}", я подтверждаю, что ознакомился с <a @click.prevent="showRules">правилами посещения</a> и
            <a @click.prevent="showConsentProcessing">обработки персональных данных</a>
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="9">
          <v-btn :disabled="(!validForm) || (!isValidPhone)" color="primary" width="100%" @click="onBuyTicket" large>
            <v-icon class="mx-3">mdi-check-outline</v-icon>
            {{ ticketCaption }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <dlg-consent-processing ref="dlg-consent-processing" />
    <dlg-rules ref="dlg-rules" />

  </v-container>
</template>

<script>
import { MUTATION_PHONE_SET } from '@/store/const-mutations';
import dlgConsentProcessing from '@/components/dlg-consent-processing.vue';
import dlgRules from '@/components/dlg-rules.vue';

export default {
  components: { dlgConsentProcessing, dlgRules },

  name: 'home-first',

  data: function () {
    return {
      validForm: false,
      phone: null,
      isValidPhone: null,
      phoneNormalized: null,
      phoneParams: null,
      errorMessage: null
    };
  },

  mounted () {
    this.phone = this.$store.state.data.phone;
  },

  watch: {
    isValidPhone: function (newVal) {
      if (newVal === null) {
        this.errorMessage = null;
        return;
      }
      if (newVal === false) {
        this.errorMessage = 'Введите корректный номер телефона';
        return;
      }
      this.errorMessage = null;
    }
  },

  computed: {
    qnt: (vm) => {
      const catalog = vm.catalog || [];
      const result = catalog.reduce((sum, current) => {
        return sum + current.qnt;
      }, 0);
      return result;
    },

    ticketCaption: (vm) => vm.qnt === 1 ? 'Оплатить билет' : 'Оплатить билеты'
  },

  methods: {
    onInputPhone: function (str, params) {
      this.phoneParams = params;
      this.isValidPhone = params.valid;
      if (this.isValidPhone) {
        this.$store.commit(MUTATION_PHONE_SET, {
          phone: params.number.e164
        });
      }
      else
        this.$store.commit(MUTATION_PHONE_SET, { phone: null });
    },

    onBuyTicket () {
      if (!this.isValidPhone) {
        return;
      }
      this.$emit('action', { action: 'buy' });
    },

    onBack () {
      this.$emit('action', { action: 'back' });
    },

    showConsentProcessing: function () {
      this.$refs['dlg-consent-processing'].show();
    },

    showRules: function () {
      this.$refs['dlg-rules'].show();
    }
  }
};
</script>
