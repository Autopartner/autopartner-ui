<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Field, ErrorMessage } from 'vee-validate'

export interface SignupFieldProps {
  type: string
  name: string
  icon: string
  placeholder: string
}

const { t } = useI18n()

const props = withDefaults(defineProps<SignupFieldProps>(), {
  type: 'text',
  name: '',
  icon: '',
  placeholder: '',
})
</script>

<template>
  <Field v-slot="{ field, errorMessage, meta }" :name="props.name">
    <VField>
      <VControl :icon="props.icon" :has-error="Boolean(errorMessage)">
        <VInput
          v-bind="field"
          :type="props.type"
          :placeholder="t(props.placeholder)"
          :autocomplete="props.name === 'password' ? 'new-password' : null"
        />
        <slot :field="field"></slot>
        <p v-if="errorMessage" class="help is-danger">
          {{ errorMessage }}
        </p>
      </VControl>
    </VField>
  </Field>
  <ErrorMessage name="props.name" />
</template>
