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
    case 'ua':
      return '/images/icons/flags/ukraine.png'
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

    <VIconButton
      class="logout-button toolbar-link right-panel-trigger"
      icon="feather:log-out"
      role="menuitem"
      @click="onLogout"
      circle
      raised
    />

    <slot></slot>
  </div>
</template>
