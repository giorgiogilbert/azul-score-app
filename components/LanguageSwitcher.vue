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
  <div class="ls-container">
    <button class="languageSwitcher px-2 py-1 border rounded" @click="showDropdown = !showDropdown" >
      {{ flag(currentLocale) }}
    </button>
    <ul
        v-if="showDropdown"
        class="absolute z-10 mt-2 w-24 bg-white border rounded shadow"
    >
      <li
          v-for="l in localesList"
          :key="l.code"
      >
        <NuxtLink
            :to="switchLocalePath(l.code)"
            class="block px-2 py-1 hover:bg-gray-100"
            @click="showDropdown = false"
        >
          {{ l.flag }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.ls-container {
  text-align: center;
}
.languageSwitcher {
  cursor: pointer;
}
ul {
  padding: 0;
  margin: var(--cell-gap);
  li {
    list-style: none;
    display: inline-block;
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
  width: 3rem;
  padding: 0;
}
</style>
