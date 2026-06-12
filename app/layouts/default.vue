<script setup lang="ts">
const { user, loggedIn } = useUserSession()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
      <UButton
        v-if="!loggedIn"
        to="/auth/frigear"
        external
      >
        Login
      </UButton>
      <UButton
        v-else
        to="/app"
      >
        Dashboard
      </UButton>
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <USeparator icon="i-simple-icons-nuxtdotjs" />

  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        Frigear • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://frigear.nu"
        target="_blank"
        icon="i-lucide-globe"
        aria-label="Website"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
