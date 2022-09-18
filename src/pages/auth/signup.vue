<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useHead } from '@vueuse/head'
import { toFormValidator } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z as zod } from 'zod'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import { useUserSession } from '/@src/stores/userSession'

import { createCompany } from '../../api/createCompany'
import { login } from '../../api/login'

const darkmode = useDarkmode()
const router = useRouter()
const notif = useNotyf()
const userSession = useUserSession()

const isLoading = ref(false)
const { t } = useI18n()
const phoneRegExp =
  /^\+38((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{0,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = toFormValidator(
  zod
    .object({
      email: zod
        .string({
          required_error: t('auth.errors.email.required'),
        })
        .email(t('auth.errors.email.format')),
      password: zod
        .string({
          required_error: t('auth.errors.password.required'),
        })
        .min(6, t('auth.errors.password.required')),
      passwordCheck: zod.string({
        required_error: t('auth.errors.passwordCheck.required'),
      }),
      name: zod.string({ required_error: t('auth.errors.name.required') }),
      country: zod.string({ required_error: t('auth.errors.country.required') }),
      city: zod.string({ required_error: t('auth.errors.city.required') }),
      firstName: zod.string({ required_error: t('auth.errors.firstName.required') }),
      lastName: zod.string({ required_error: t('auth.errors.lastName.required') }),
      phone: zod
        .string({ required_error: t('auth.errors.phone.required') })
        .regex(phoneRegExp, t('auth.errors.phone.required')),
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: t('auth.errors.passwordCheck.match'),
      path: ['passwordCheck'],
    })
)

const { handleSubmit } = useForm({
  validationSchema,
})

const onSignup = handleSubmit(async (values) => {
  console.log('handleSignup values')
  console.table(values)

  if (!isLoading.value) {
    isLoading.value = true
    notif.dismissAll()

    const response = await createCompany(values as any)

    if (response?.status === 200) {
      const { token } = await login({ email: values.email, password: values.password })
      if (token) {
        userSession.setToken(token)
        notif.success(`Welcome, ${values.firstName} ${values.lastName}`)

        router.push({ name: '/app' })
      } else {
        notif.error({ message: response, duration: 5000 })
      }
    } else {
      notif.error({ message: response, duration: 5000 })
    }

    isLoading.value = false
  }
})

useHead({
  title: 'Auth Signup 2 - Vuero',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Form section -->
    <div class="column is-5">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <label
            class="dark-mode ml-auto"
            tabindex="0"
            @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
          >
            <input
              type="checkbox"
              :checked="!darkmode.isDark"
              @change="darkmode.onChange"
            />
            <span></span>
          </label>
          <div class="auth-logo">
            <RouterLink to="/">
              <AnimatedLogo class="top-logo" width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>

        <div
          :style="[
            isLoading
              ? { position: 'absolute', height: '100%', width: '100%' }
              : { display: 'none' },
          ]"
        >
          <VLoader
            size="large"
            :active="isLoading"
            :translucent="true"
            :style="{ height: '100%' }"
          ></VLoader>
        </div>

        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content">
                  <h2>{{ t('auth.title') }}</h2>
                  <p>{{ t('auth.subtitle') }}</p>
                  <RouterLink to="/app">
                    {{ t('auth.action.login') }}
                  </RouterLink>
                </div>

                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit="onSignup">
                    <div id="signin-form" class="login-form">
                      <SignupField
                        :type="'text'"
                        :name="'firstName'"
                        :icon="'feather:user'"
                        :placeholder="'auth.placeholder.firstName'"
                      />

                      <SignupField
                        :type="'text'"
                        :name="'lastName'"
                        :icon="'feather:users'"
                        :placeholder="'auth.placeholder.lastName'"
                      />

                      <SignupField
                        :type="'text'"
                        :name="'email'"
                        :icon="'feather:mail'"
                        :placeholder="'auth.placeholder.email'"
                      />

                      <SignupField
                        :type="'password'"
                        :name="'password'"
                        :icon="'feather:lock'"
                        :placeholder="'auth.placeholder.password'"
                      />

                      <SignupField
                        :type="'password'"
                        :name="'passwordCheck'"
                        :icon="'feather:lock'"
                        :placeholder="'auth.placeholder.passwordCheck'"
                      />

                      <SignupField
                        :type="'text'"
                        :name="'name'"
                        :icon="'lnil lnil-briefcase'"
                        :placeholder="'auth.placeholder.name'"
                      />

                      <SignupField
                        :type="'text'"
                        :name="'country'"
                        :icon="'lnir lnir-house'"
                        :placeholder="'auth.placeholder.country'"
                      />

                      <SignupField
                        :type="'text'"
                        :name="'city'"
                        :icon="'lnir lnir-house'"
                        :placeholder="'auth.placeholder.city'"
                      />

                      <SignupField
                        :type="'text'"
                        :name="'phone'"
                        :icon="'lnir lnir-phone-ring'"
                        :placeholder="'auth.placeholder.phone'"
                      />

                      <VField>
                        <VControl class="login">
                          <VButton type="submit" color="primary" bold fullwidth raised>
                            {{ t('auth.action.signup') }}
                          </VButton>
                        </VControl>
                      </VField>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-7 is-hidden-mobile hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <p>тут буде гарна картинка</p>
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/apps/vuero-banking-light.webp"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/apps/vuero-banking-dark.webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>
  </div>
</template>
