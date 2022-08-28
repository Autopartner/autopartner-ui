<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { Field } from 'vee-validate'

  export interface SignupFieldProps {
    name: string
    icon: string
    placeholder: string
  }

  const { t } = useI18n()

  const props = withDefaults(defineProps<SignupFieldProps>(), {
    name: '',
    icon: '',
    placeholder: ''
  })
</script>

<template>
  <Field v-slot="{ field, errorMessage, meta }" :name=props.name>
    <VField>
      <VControl :icon=props.icon :has-error="Boolean(errorMessage) && meta.dirty">
        <input
          v-bind=field
          class="input"
          type="text"
          :placeholder="t(props.placeholder)"
          v-bind:autocomplite="props.name === 'password' ? 'new-password' : null "
        />
        <slot :field="field"></slot>
        <p v-if="errorMessage && meta.dirty" class="help is-danger">
          {{ errorMessage }}
        </p>
      </VControl>
    </VField>
  </Field>
</template>
