<script setup lang="ts">
import {ref} from 'vue'
import {useI18n, useSwitchLocalePath} from '#imports'

const {locale, locales} = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = locale.value
const showDropdown = ref(false)

const flag = (code: string) => code === 'it' ? '🇮🇹' : '🇬🇧'
const localesList = locales.value.filter(l => l.code !== currentLocale).map(l => ({
  code: l.code,
  flag: flag(l.code),
}))

</script>

<template>
  <div class="relative inline-block">
    <button @click="showDropdown = !showDropdown" class="languageSwitcher px-2 py-1 border rounded">
      {{ flag(currentLocale) }}
    </button>
    <ul
        v-if="showDropdown"
        class="absolute z-10 mt-2 w-24 bg-white border rounded shadow"
    >
      <li
          v-for="locale in localesList"
          :key="locale.code"
      >
        <NuxtLink
            :to="switchLocalePath(locale.code)"
            class="block px-2 py-1 hover:bg-gray-100"
            @click="showDropdown = false"
        >
          {{ locale.flag }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.languageSwitcher {
  cursor: pointer;
}
ul {
  padding: 0;

  li {
    list-style: none;
    a {
      text-decoration: none;
    }
  }
}

.languageSwitcher, li {
  font-size: 2rem;
  border: 1px solid #ddd;
  border-radius: 2px;
  text-align: center;
  background: white;
}
</style>
