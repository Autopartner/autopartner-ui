<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { routeLocationKey, routerKey } from 'vue-router';

import { useDarkmode } from '/@src/stores/darkmode'
import { usePanels } from '/@src/stores/panels'
import { useUserSession } from '/@src/stores/userSession';

const darkmode = useDarkmode()
const { locale, t } = useI18n()
const panels = usePanels()
const userSession = useUserSession()
const router = useRouter()

const localFlagSrc = computed(() => {
  switch (locale.value) {
    case 'fr':
      return '/images/icons/flags/france.svg'
    case 'es':
      return '/images/icons/flags/spain.svg'
    case 'es-MX':
      return '/images/icons/flags/mexico.svg'
    case 'de':
      return '/images/icons/flags/germany.svg'
    case 'zh-CN':
      return '/images/icons/flags/china.svg'
    case 'en':
    default:
      return '/images/icons/flags/united-states-of-america.svg'
  }
})

const onLogout = () => {
  userSession.logoutUser()
  router.push({ name: '/auth/login' })
}

</script>

<template>
  <div class="toolbar ml-auto">
    <div class="toolbar-link">
      <label
        tabindex="0"
        class="dark-mode ml-auto"
        @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
      >
        <input
          data-cy="dark-mode-toggle"
          type="checkbox"
          :checked="!darkmode.isDark"
          @change="darkmode.onChange"
        />
        <span></span>
      </label>
    </div>

    <a
      tabindex="0"
      class="toolbar-link right-panel-trigger"
      @keydown.space.prevent="panels.setActive('languages')"
      @click="panels.setActive('languages')"
    >
      <img :src="localFlagSrc" alt="" />
    </a>

    <VButton
      class="logout-button"
      icon="feather:log-out"
      color="primary"
      role="menuitem"
      @click="onLogout"
    >
      {{ t('auth.action.logout') }}
    </VButton>

    <slot></slot>
  </div>
</template>
