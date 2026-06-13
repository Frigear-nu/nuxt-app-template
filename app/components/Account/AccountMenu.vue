<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { NuxtLinkProps } from '#app'
import { computedAsync } from '@vueuse/core'

const { clear } = useUserSession()

const onSignOut = async () => {
  await clear()

  await navigateTo('/')
}

const items = computedAsync<ButtonProps[]>(async () => {
  const items: ButtonProps[] = [
    {
      label: 'Dashboard',
      to: '/app',
      icon: 'i-lucide-layout-dashboard',
    },
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      to: '#',
      onClick: onSignOut,
    },
  ]

  // todo: if(something){ baseItems.push({...})

  return items
})
</script>

<template>
  <UPopover
    :mode="$device.isMobile ? 'click' : 'hover'"
    :content="{ align: 'end' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      class="size-8"
      icon="i-lucide-user"
      aria-label="Menu"
    />

    <template #content>
      <ul class="flex flex-col">
        <li
          v-for="linkItem in items"
          :key="linkItem.label"
        >
          <NuxtLink
            class="flex justify-between py-1.5 px-2 gap-1 hover:bg-muted"
            :aria-label="linkItem.label"
            v-bind="linkItem as NuxtLinkProps"
          >
            <span class="text-sm">
              {{ linkItem.label }}
            </span>
            <span class="size-5 text-center">
              <UIcon :name="linkItem.icon || 'i-lucide-x'" />
            </span>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </UPopover>
</template>
