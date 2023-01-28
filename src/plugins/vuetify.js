import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/lib/locale/ru';
import iconArrowLeft from '../components/icon-arrow-left';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#1D58F2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        textPrimary: '#2C3C4D',
        textSecondary: '#67697E'
      }
    }
  },
  icons: {
    values: {
      iconArrowLeft: {
        component: iconArrowLeft // our custom component
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
});
