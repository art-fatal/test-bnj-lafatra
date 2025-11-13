<template>
  <div class="h-screen">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  height: 48px;
  background: #fff;
  border-bottom: 1px solid #EAECF0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 24px;
  width: auto;
}

.main-content {
  width: 1280px;
  max-width: 1280px;
  height: 750px;
  margin: auto;
  gap: 48px;
  opacity: 1;
  padding: 4rem 8rem;
}
</style>