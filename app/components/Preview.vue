<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'
import {useOnboardingAutoFill} from "~/composables/useOnboardingAutoFill";
import {getInitials} from "~/utils/initials";

const { fullName, avatarUrl } = useOnboardingAutoFill()
const items: NavigationMenuItem[][] = [
  [
    {
      icon: 'i-lucide-house',
      skeletonWidth: 'w-[250px]',
    },
    {
      icon: 'i-lucide-settings',
      skeletonWidth: 'w-[250px]',
      defaultOpen: false,
      children: [
        {
          icon: 'i-lucide-user',
        }
      ]
    },
    {
      icon: 'i-lucide-users',
      skeletonWidth: 'w-[250px]',
    },
    {
      icon: 'i-lucide-bell',
      skeletonWidth: 'w-[250px]',
    }
  ],
  [
    {
      icon: 'i-lucide-message-circle',
      skeletonWidth: 'w-[80px]',
    },
    {
      icon: 'i-lucide-info',
      skeletonWidth: 'w-[43px]',
    },
    {
      icon: 'i-lucide-info',
      skeletonWidth: 'w-[29px]',
    }
  ]
]
</script>

<template>
  <div class="h-[480px] w-[407px] relative shadow-lg">
    <UDashboardGroup
        unit="rem"
        class="relative h-full"
    >
      <UDashboardSidebar
          :ui="{
            body: 'pb-0 pt-4 px-1.5',
            footer: 'border-t border-default',
            root: 'min-h-auto min-w-[140px] w-[140px]'
          }"
      >
        <template #default="{ collapsed }">
          <UDropdownMenu
            size="xs"
            :ui="{
              root: 'py-1',
              content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)'
            }"
          >
            <UButton
                trailingIcon="i-lucide-chevrons-up-down"
                size="xs"
                color="neutral"
                variant="ghost"
                block
                :square="collapsed"
                class="bg-[#F9FAFB]"
                :class="[!collapsed && 'py-1']"
                :ui="{
                  trailingIcon: 'size-3'
                }"
            >
              <UAvatar
                  size="xs"
                  :ui="
                    {
                      root: 'bg-white size-4 rounded-[2.67px] shadow',
                    }
                  "
              />
              <USkeleton class="h-[0.315rem] w-[250px] bg-[#EAECF0]"/>
              <UButton
                icon="i-lucide-settings"
                size="xs"
                color="neutral"
                variant="ghost"
                :ui="{
                  base: 'px-0',
                  leadingIcon: 'size-3',
                  trailingIcon: 'size-3'
                }"
                />
            </UButton>
          </UDropdownMenu>

          <UNavigationMenu
              :collapsed="collapsed"
              :items="items[0]"
              orientation="vertical"
              size="xs"
              :ui="{
                linkLeadingIcon: 'size-2',
                linkTrailingIcon: 'size-2'
              }"
          >
            <template #item-label="{ item }">
              <USkeleton class="h-0.75 w-[250px]"/>
            </template>
          </UNavigationMenu>

          <UNavigationMenu
              :collapsed="collapsed"
              :items="items[1]"
              orientation="vertical"
              class="mt-auto"
              size="xs"
              :ui="{
                linkLeadingIcon: 'size-2'
              }"
          >
            <template #item-label="{ item }">
              <USkeleton class="h-0.75" :class="item.skeletonWidth"/>
            </template>
          </UNavigationMenu>
        </template>

        <template #footer="{ collapsed }">
          <UButton
              :avatar="{
                src: avatarUrl,
                text: avatarUrl ? undefined : getInitials(fullName)
              }"
              :label="fullName"
              color="neutral"
              variant="ghost"
              class="w-full"
              :block="collapsed"
          />
        </template>
      </UDashboardSidebar>
      <UDashboardPanel id="preview" :ui="{
      root: 'min-h-auto',
      body: 'p-1 bg-[#F9FAFB]'
    }">
        <template #header>
          <AppHeader class="preview-header"/>
        </template>
      </UDashboardPanel>
    </UDashboardGroup>

  </div>
</template>

<style>
.preview-header {
  position: relative !important;
  height: 24px !important;
}

.preview-header .logo {
  height: 16px !important;
}
</style>