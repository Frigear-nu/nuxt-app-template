<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { computedAsync } from '@vueuse/core'

const { user, clear } = useUserSession()

const onSignOut = async () => {
  await clear()
  await navigateTo('/')
}

const getFirstLetter = (name: string | number) => {
  return String(typeof name === 'string' ? name.charAt(0)?.toUpperCase() : name)
}

const items = computedAsync<DropdownMenuItem[][]>(async () => {
  const items: DropdownMenuItem[][] = [
    [
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
    ],
  ]

  // Push the top part...
  if (user.value) {
    items.unshift([
      {
        type: 'label',
        label: `${user.value.email || user.value.name || user.value.id}`,
        avatar: {
          src: user.value.avatar || undefined,
          text: getFirstLetter(user.value.email || user.value.name || user.value.id),
        },
      },
    ])
  }

  // todo: if(something){ baseItems.push({...})

  return items
})
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'start' }"
    :ui="{ content: 'w-48' }"
  >
    <UButton
      aria-label="Account Menu"
      color="neutral"
      variant="ghost"
      icon="i-lucide-user"
    />
  </UDropdownMenu>
</template>
