<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <div>
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
          to="/login"
          external
        >
          Login
        </UButton>
        <AccountMenu v-else />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <AppFooter />
  </div>
</template>
