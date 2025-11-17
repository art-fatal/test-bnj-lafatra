<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'
import {useOnboardingAutoFill} from "~/composables/useOnboardingAutoFill";
import {getInitials} from "~/utils/initials";
import EntrepriseIcon from '~/assets/img/entreprise.svg'

const highlited = computed(() => {
  const route = useRoute()
  const path = route.path
  return path.replace('/welcome/', '')
})

const {fullName, avatarUrl, companyLogoUrl, companyName} = useOnboardingAutoFill()
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
  <div id="preview-container" class="h-[480px] w-[407px] relative shadow-lg overflow-visible"
       :class="highlited ? 'has-hihghlited' : ''">
    <UDashboardGroup
        unit="rem"
        id="preview-group"
        class="relative h-full overflow-visible"
    >
      <UDashboardSidebar
          :ui="{
            body: 'pb-0 pt-4 px-1.5',
            footer: 'border-default overflow-visible p-0 pb-4',
            root: 'min-h-auto min-w-[140px] w-[140px] overflow-visible'
          }"
      >
        <template #default="{ collapsed }">
          <UDropdownMenu
              size="xs"
              :ui="{
                root: 'py-1',
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
                :class="[!collapsed && 'py-1', highlited === 'company-details' ? 'highlited' : '']"
                :ui="{
                  trailingIcon: 'size-3'
                }"
            >
              <div class="w-full flex flex-row justify-between">
                <div class="flex flex-row items-center gap-1">
                  <UAvatar
                      size="xs"
                      :src="companyLogoUrl"
                      :ui="{
                          root: 'bg-white size-4 rounded-[2.67px] shadow',
                        }"
                  >
                    <template v-if="!companyLogoUrl" #default>
                      <img :src="EntrepriseIcon" alt="Entreprise" class="w-2.5 h-2.5"/>
                    </template>
                  </UAvatar>
                  <USkeleton v-if="!companyName" class="h-[0.315rem] w-[50px] bg-[#EAECF0]"/>
                  <span v-else class="text-[7px] font-medium truncate max-w-[60px]">{{ companyName }}</span>
                </div>
                <UButton
                    id="preview-company-details-button"
                    icon="i-lucide-settings"
                    size="xs"
                    color="neutral"
                    variant="ghost"
                    :ui="{
                      base: 'p-0',
                      leadingIcon: 'size-3',
                      trailingIcon: 'size-3'
                    }"
                />
              </div>
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
          <UDropdownMenu
              :content="{ align: 'center', collisionPadding: 12 }"
          >
            <UButton
                :avatar="{
                  src: avatarUrl,
                  text: avatarUrl ? undefined : getInitials(fullName)
                }"
                :label="fullName"
                trailingIcon="i-lucide-chevron-down"
                color="neutral"
                variant="ghost"
                block
                size="xs"
                :class="highlited === 'personal-details' ? 'highlited' : ''"
                :ui="{
                  leadingAvatar: 'size-4',
                  label: 'text-[7px]',
                  trailingIcon: 'size-3'
                }"
            />
          </UDropdownMenu>
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

#preview-container.has-hihghlited {
  transform: translateX(65px);
}

.highlited {
  transform: translate(-20px, -8px) scale(1.5);
  position: absolute;
  z-index: 99;
  background: white;
  border-radius: 6px;
  border: 1px solid #0072FF;
  box-shadow: 0 0 0 3px #0073ff3d;
  justify-content: start;
}
</style>