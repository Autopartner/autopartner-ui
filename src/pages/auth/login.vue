<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useHead } from '@vueuse/head'
import { toFormValidator } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z as zod } from 'zod'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import { useUserSession } from '/@src/stores/userSession'
import { login } from '/@src/api/login'

const darkmode = useDarkmode()
const router = useRouter()
const notif = useNotyf()
const userSession = useUserSession()

const isLoading = ref(false)
const { t } = useI18n()

const validationSchema = toFormValidator(
  zod.object({
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
  })
)

const { handleSubmit } = useForm({
  validationSchema,
})

const onLogin = handleSubmit(async (values) => {
  console.log('handleSignup values')
  console.table(values)

  if (!isLoading.value) {
    isLoading.value = true
    notif.dismissAll()

    const { token } = await login({ email: values.email, password: values.password })
    if (token) {
      userSession.setToken(token)
      notif.success(`Welcome, ${values.email}`)

      router.push({ name: '/app' })
    } else {
      notif.error({ message: 'Login failed', duration: 5000 })
    }

    isLoading.value = false
  }
})

useHead({
  title: 'Auth Login',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-8 h-hidden-mobile h-hidden-tablet-p hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <!--<div class="column is-10 is-offset-1">
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/landing/landing.jpeg"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/landing/landing.jpeg"
                alt=""
              />
            </div>-->
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>

    <!-- Form section -->
    <div class="column is-4">
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
              <AnimatedLogo width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content">
                  <h2>Welcome Back.</h2>
                  <p>Please sign in to your account</p>
                  <RouterLink to="/auth/signup">
                    I do not have an account yet
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit="onLogin">
                    <div class="login-form">
                      <!-- Username -->
                      <SignupField
                        :type="'text'"
                        :name="'email'"
                        :icon="'feather:user'"
                        :placeholder="'Email'"
                      />

                      <!-- Password -->
                      <SignupField
                        :type="'password'"
                        :name="'password'"
                        :icon="'feather:lock'"
                        :placeholder="'Password'"
                      />

                      <!-- Submit -->
                      <div class="login">
                        <VField>
                          <VControl class="login">
                            <VButton
                              :loading="isLoading"
                              color="primary"
                              type="submit"
                              bold
                              fullwidth
                              raised
                            >
                              Sign In
                            </VButton>
                          </VControl>
                        </VField>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
