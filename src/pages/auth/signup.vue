<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Field, useForm } from 'vee-validate'
import * as yup from 'yup'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'

import {createCompany} from '../../api/createCompany'

const darkmode = useDarkmode()
const router = useRouter()
const notif = useNotyf()

const isLoading = ref(false)
const { t } = useI18n()
const phoneRegExp =
  /^\+38((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{0,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// Define a validation schema
const schema = yup.object({
  promotional: yup.mixed(),
  // name: yup.string().required(t('auth.errors.name.required')),
  email: yup
    .string()
    .required(t('auth.errors.email.required'))
    .email(t('auth.errors.email.format')),
  password: yup
    .string()
    .required(t('auth.errors.password.required'))
    .min(8, t('auth.errors.password.length')),
  passwordCheck: yup
    .string()
    .required(t('auth.errors.passwordCheck.required'))
    .oneOf([yup.ref('password')], t('auth.errors.passwordCheck.match')),
  name: yup.string().required(t('auth.errors.name.required')),
  country: yup.string().required(t('auth.errors.country.required')),
  city: yup.string().required(t('auth.errors.city.required')),
  firstName: yup.string().required(t('auth.errors.firstName.required')),
  lastName: yup.string().required(t('auth.errors.lastName.required')),
  phone: yup
    .string()
    .matches(phoneRegExp, t('auth.errors.phone.match'))
    .required(t('auth.errors.phone.required')),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSignup = handleSubmit(async (values) => {
  console.log('handleSignup values')
  console.table(values)

  if (!isLoading.value) {
    isLoading.value = true
    notif.dismissAll()

    const response = await createCompany(values)

    if (response?.status === 200) {
      notif.success(`Welcome, ${values.firstName} ${values.lastName}`)

      router.push({ name: 'app' })
    } else {
      notif.error({message: response, duration: 5000})
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
            <RouterLink :to="{ name: 'index' }">
              <AnimatedLogo class="top-logo" width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>

        <div :style="[isLoading ? {'position': 'absolute', 'height': '100%', 'width': '100%'} : {'display': 'none'}]">
          <VLoader size="large" :active="isLoading" :translucent="true" :style="{height: '100%'}"></VLoader>
        </div>
        
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
        
                <div class="auth-content">
                  <h2>{{ t('auth.title') }}</h2>
                  <p>{{ t('auth.subtitle') }}</p>
                  <RouterLink :to="{ name: 'app' }">
                    {{ t('auth.action.login') }}
                  </RouterLink>
                </div>

                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit="onSignup">
                    <div id="signin-form" class="login-form">
                      <SignupField
                        :name="'firstName'"
                        :icon="'feather:user'"
                        :placeholder="'auth.placeholder.firstName'"
                      />

                      <SignupField
                        :name="'lastName'"
                        :icon="'feather:users'"
                        :placeholder="'auth.placeholder.lastName'"
                      />

                      <SignupField
                        :name="'email'"
                        :icon="'feather:mail'"
                        :placeholder="'auth.placeholder.email'"
                      />

                      <SignupField
                        :name="'password'"
                        :icon="'feather:lock'"
                        :placeholder="'auth.placeholder.password'"
                      />

                      <SignupField
                        :name="'passwordCheck'"
                        :icon="'feather:lock'"
                        :placeholder="'auth.placeholder.passwordCheck'"
                      />
                      
                      <SignupField
                        :name="'name'"
                        :icon="'lnil lnil-briefcase'"
                        :placeholder="'auth.placeholder.name'"
                      />

                      <SignupField
                        :name="'country'"
                        :icon="'lnir lnir-house'"
                        :placeholder="'auth.placeholder.country'"
                      />
                      
                      <SignupField
                        :name="'city'"
                        :icon="'lnir lnir-house'"
                        :placeholder="'auth.placeholder.city'"
                      />
                      
                      <SignupField
                        :name="'phone'"
                        :icon="'lnir lnir-phone-ring'"
                        :placeholder="'auth.placeholder.phone'"
                      />

                      <VField>
                        <VControl class="setting-item">
                          <label for="promotional" class="form-switch is-primary">
                            <Field
                              id="promotional"
                              type="checkbox"
                              name="promotional"
                              value="yes"
                            />

                            <i aria-hidden="true"></i>
                          </label>
                          <div class="setting-meta">
                            <label for="promotional">
                              <span>{{ t('auth.label.promotional') }} </span>
                            </label>
                          </div>
                        </VControl>
                      </VField>

                      <!-- Submit -->

                      <VField>
                        <VControl class="login">
                          <VButton type="submit" color="primary" bold fullwidth raised >
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
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/apps/vuero-banking-light.png?format=webp"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/apps/vuero-banking-dark.png?format=webp"
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
