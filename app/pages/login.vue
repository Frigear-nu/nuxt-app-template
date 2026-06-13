<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

const { loggedIn, openInPopup } = useUserSession()

watch(loggedIn, (value) => {
  if (value) {
    navigateTo('/app')
  }
}, { immediate: true })

const providers = computed<ButtonProps[]>(() => [{
  label: 'Frigear SSO',
  icon: '/logo.png',
  iconDark: '/logo-dark.png',
  onClick: () => openInPopup('/auth/frigear'),
}])
</script>

<template>
  <UPageBody class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard
      v-if="providers && providers.length > 0"
      class="w-full max-w-md"
    >
      <UAuthForm
        title="Login"
        description="Choose your login method to continue."
        icon="i-lucide-user"
        :providers="providers"
      >
        <template #providers>
          <div class="flex flex-col gap-2 space-y-3">
            <UButton
              v-for="provider in providers"
              :key="provider.label"
              v-bind="provider"
              block
              variant="subtle"
              color="neutral"
            >
              <template
                v-if="provider.icon && provider.icon.startsWith('/')"
                #leading
              >
                <UColorModeImage
                  :light="provider.icon"
                  :dark="provider?.iconDark"
                  class="w-6 h-6"
                />
              </template>
            </UButton>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
    <UEmpty
      v-else
      title="No available sign-in option."
    />
  </UPageBody>
</template>
