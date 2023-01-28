<template>
  <footer class="footer">
    <div class="pt-8 px-6">
      <p class="pb-6 mb-0 font-T1-semi-bold">{{ CONST_FOOTER_DATA.name }}</p>
      <p class="font-T3-semi-bold mb-3">О нас</p>
      <p class="font-ST1-regular mb-2 ">{{ CONST_FOOTER_DATA.address }}</p>
      <p class="font-ST1-regular mb-2">{{ CONST_FOOTER_DATA.phone }}</p>
      <p class="font-ST1-regular mb-2">{{ CONST_FOOTER_DATA.email }}</p>
      <p class="font-ST1-regular mb-5">{{ CONST_FOOTER_DATA.workingHours }}</p>
    <p class="font-T3-semi-bold mb-3">Покупателям</p>
    <a class="font-ST1-regular" @click.prevent="showPrivacyPolicy"><p style="margin: 0 0 8px 0">Политика конфиденциальности персональных данных</p></a>
    <a class="font-ST1-regular" @click.prevent="showPrivacyPolicy"><p style="margin: 0 0 24px 0">Условия покупки и возврата билетов</p></a>
    </div>
    <hr style="background-color: #C4C4C4;"/>
    <div class="pt-6 pb-8 px-6">
      <p class=" font-ST2-regular mb-2 ">Версия сервиса {{appVersion}}-{{CONST_VERSION_API}}.{{CONST_VERSION_FRONT}}-{{api2CardsVersion}}</p>
      <p class=" font-ST2-regular mb-0 ">© 2023 «GAME-KEEPER»</p>
    </div>
  </footer>
</template>

<script>

import { CONST_FOOTER_DATA } from '@/tools/const-footer-data';

export default {
  name: 'gk-footer',

  data () {
    return {
      CONST_FOOTER_DATA: CONST_FOOTER_DATA
    };
  }

};
</script>

<style lang="scss">
.font-T1-semi-bold {
  font-family: Proxima Nova;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}

.font-T3-semi-bold {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.font-ST1-regular {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.font-ST2-regular {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

</style>
