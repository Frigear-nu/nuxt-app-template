<script lang="ts" setup>
const { user, session } = useUserSession()
</script>

<template>
  <UContainer>
    <UPageHeader title="App Area" />
    <UPageBody>
      <UPageCard title="Welcome">
        <p>This is the app area.</p>
        <pre>{{ user }}</pre>
      </UPageCard>
      <UPageCard title="Session">
        <pre>{{ session }}</pre>
      </UPageCard>
    </UPageBody>
  </UContainer>
</template>
