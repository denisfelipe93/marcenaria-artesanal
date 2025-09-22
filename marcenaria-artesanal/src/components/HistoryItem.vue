<script setup lang="ts">
import type { HistoryItem } from '@/data/history'

const props = defineProps<{
  item: HistoryItem
}>()
</script>

<template>
  <article class="card">
    <header class="card-head">
      <h3 class="title">{{ item.title }}</h3>
      <p v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</p>
    </header>

    <figure v-if="item.cover" class="media">
      <img :src="item.cover" :alt="item.title" />
    </figure>

    <p v-if="item.description" class="desc">
      {{ item.description }}
    </p>

    <div v-if="item.tags?.length" class="tags">
      <span v-for="t in item.tags" :key="t" class="tag">{{ t }}</span>
    </div>

    <a
      v-if="item.href"
      :href="item.href"
      target="_blank"
      rel="noopener"
      class="more"
    >Ver mais</a>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 16px;
  background: rgba(255,255,255,.9);
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
}
:host(.dark) .card, .dark .card {
  background: rgba(24,24,27,.9);
  border-color: rgba(255,255,255,.08);
}

.card-head { display: grid; gap: 2px; }
.title { margin: 0; font-weight: 700; font-size: 1.05rem; }
.subtitle { margin: 0; color: #6b7280; }
.dark .subtitle { color: #9ca3af; }

/* imagem com altura previsível */
.media {
  overflow: hidden; border-radius: 12px;
  border: 1px solid rgba(0,0,0,.08); margin: 12px 0;
}
.dark .media { border-color: rgba(255,255,255,.08); }
.media img {
  width: 100%;
  height: 14rem !important;       /* md-ish */
  object-fit: cover !important;
  display: block;
}
@media (min-width: 1024px) { .media img { height: 16rem !important; } }

.desc { margin: 10px 0 0; color: #374151; line-height: 1.6; }
.dark .desc { color: #e5e7eb; }

.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
.tag {
  font-size: 12px; padding: 2px 8px; border-radius: 9999px;
  border: 1px solid #d4d4d8; background: #fff; color: #374151;
}
.dark .tag { border-color: #3f3f46; background: #18181b; color: #e4e4e7; }

.more {
  display: inline-block; margin-top: 8px;
  text-decoration: underline; text-underline-offset: 3px;
  color: #111827;
}
.dark .more { color: #e5e7eb; }
.more:hover { opacity: .9; }
</style>
