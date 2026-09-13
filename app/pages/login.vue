<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

const { loggedIn } = useUserSession()
watch(loggedIn, (value) => {
  if (value) {
    navigateTo('/app')
  }
}, { immediate: true })

const providers = computed<(ButtonProps & { iconDark?: string })[]>(() => [{
  label: 'Sign in with Frigear.nu',
  icon: '/logo.png',
  iconDark: '/logo-dark.png',
  onClick: () => {
    navigateTo('/auth/frigear', { external: true, replace: true })
    // window.location.replace('/auth/frigear')
    // openInPopup('/auth/frigear') // this will not work if we use another SSO on the OauthServer...
  },
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
                  :dark="provider?.iconDark!"
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
