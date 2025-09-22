<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type SlideBase = { title?: string; description?: string }
type SlideVideo = SlideBase & { type: 'video'; src: string; poster?: string }
type SlideImage = SlideBase & { type: 'image'; src: string; alt: string; caption?: string }
type SlideEmbed = SlideBase & { type: 'embed'; src: string; poster?: string } // YouTube/Vimeo
type Slide = SlideVideo | SlideImage | SlideEmbed

const props = defineProps<{
  title: string
  subtitle?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  slides: Slide[]
}>()

const idx = ref(0)
const modalOpen = ref(false)
const videoEl = ref<HTMLVideoElement | null>(null)

function ytIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || null
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return id
      const m = u.pathname.match(/\/embed\/([^/?]+)/)
      return m?.[1] ?? null
    }
  } catch {}
  return null
}
function ytPoster(url: string): string | undefined {
  const id = ytIdFromUrl(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined
}
function ytEmbed(url: string): string | null {
  const id = ytIdFromUrl(url)
  if (!id) return null
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
}

const current = computed(() => props.slides[idx.value])

function go(n: number) {
  const len = props.slides.length
  idx.value = ((n % len) + len) % len
}
function openVideo() {
  modalOpen.value = true
  requestAnimationFrame(() => videoEl.value?.play?.())
}
function closeModal() {
  modalOpen.value = false
  videoEl.value?.pause?.()
}

let io: IntersectionObserver | null = null
const host = ref<HTMLElement | null>(null)
onMounted(() => {
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (!e.isIntersecting) videoEl.value?.pause?.() }),
    { threshold: 0 }
  )
  if (host.value) io.observe(host.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section ref="host" class="featured">
    <div class="wrap">
      <!-- Coluna texto -->
      <div class="copy">
        <h3 class="title">{{ title }}</h3>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
        <p v-if="description" class="desc">{{ description }}</p>
        <a v-if="ctaHref && ctaLabel" :href="ctaHref" class="cta">{{ ctaLabel }}</a>
      </div>

      <!-- Coluna mídia -->
      <div class="media">
        <div class="carousel">
          <button class="nav prev" aria-label="Anterior" @click="go(idx - 1)">‹</button>

          <div class="viewport">
            <div class="track" :style="{ transform: `translateX(-${idx * 100}%)` }">
              <div v-for="(s, i) in slides" :key="i" class="slide">
                <!-- EMBED (YouTube) -->
                <button
                  v-if="s.type === 'embed'"
                  class="video-thumb"
                  type="button"
                  @click="openVideo()"
                  :aria-label="`Reproduzir vídeo`"
                >
                  <img :src="s.poster ?? ytPoster(s.src)" alt="" />
                  <span class="play">▶</span>
                </button>

                <!-- Arquivo de vídeo local -->
                <button
                  v-else-if="s.type === 'video'"
                  class="video-thumb"
                  type="button"
                  @click="openVideo()"
                  :aria-label="`Reproduzir vídeo`"
                >
                  <img :src="s.poster" alt="" />
                  <span class="play">▶</span>
                </button>

                <!-- Imagem -->
                <figure v-else class="img">
                  <img :src="s.src" :alt="s.alt" />
                  <figcaption v-if="s.caption">{{ s.caption }}</figcaption>
                </figure>
              </div>
            </div>
          </div>

          <button class="nav next" aria-label="Próximo" @click="go(idx + 1)">›</button>
        </div>

        <div class="dots" role="tablist" aria-label="Slides">
          <button
            v-for="(_, i) in slides"
            :key="i"
            class="dot"
            :class="{ active: i === idx }"
            @click="idx = i"
            :aria-label="`Ir para o slide ${i + 1}`"
          />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <dialog class="modal" :open="modalOpen" @close="closeModal">
      <div class="modal-body">
        <!-- EMBED -->
        <iframe
          v-if="current?.type === 'embed' && modalOpen"
          :src="ytEmbed((current as SlideEmbed).src) || ''"
          class="player"
          title="YouTube video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        />
        <!-- ARQUIVO -->
        <video
          v-else-if="current?.type === 'video' && modalOpen"
          ref="videoEl"
          :src="(current as SlideVideo).src"
          controls
          playsinline
          preload="metadata"
          class="player"
        />
        <div v-else class="player placeholder"></div>

        <button class="close" @click="closeModal" aria-label="Fechar">✕</button>
      </div>
    </dialog>
  </section>
</template>

<style scoped>
/* cartão de destaque */
.featured {
  padding: 1.25rem; border-radius: 16px;
  background: rgba(2,6,23,.03);
  outline: 1px solid rgba(0,0,0,.06);
}
.dark .featured {
  background: rgba(250,250,250,.04);
  outline-color: rgba(255,255,255,.06);
}
.wrap { display: grid; gap: 1.25rem; }
@media (min-width: 1024px){ .wrap { grid-template-columns: 1fr 1.7fr; gap: 1.5rem; } }

/* copy */
.copy { position: sticky; top: 6rem; align-self: start; }
.title { margin: 0 0 .25rem; font: 800 1.25rem/1.2 ui-sans-serif; }
.subtitle { margin: 0 0 .5rem; color:#6b7280; }
.dark .subtitle { color:#9ca3af; }
.desc { margin: .5rem 0 1rem; color:#374151; }
.dark .desc { color:#e5e7eb; }
.cta { display:inline-block; padding:.5rem .75rem; border-radius:12px; background:#111827; color:#fff; text-decoration:none; }
.cta:hover { opacity:.9; }

/* carousel */
.media { min-width: 0; }
.carousel { position: relative; }
.viewport { overflow: hidden; border-radius: 12px; }
.track { display: flex; transition: transform .35s ease; }
.slide { width: 100%; flex: 0 0 100%; }
.video-thumb, .img { display:block; position:relative; aspect-ratio:16/9; width:100%; overflow:hidden; }
.video-thumb img, .img img { width:100%; height:100%; object-fit:cover; display:block; }

/* setas discretas */
.nav {
  position:absolute; top:50%; transform:translateY(-50%); z-index:2;
  width:36px; height:36px; border-radius:999px; border:0;
  background:rgba(17,24,39,.28); color:#fff; cursor:pointer;
  backdrop-filter: blur(2px);
}
.nav:hover { background:rgba(17,24,39,.42); }
.prev { left:10px; } .next { right:10px; }

/* botão play mais legível */
.play {
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  width:64px; height:64px; line-height:64px; text-align:center;
  background:rgba(0,0,0,.55); color:#fff; border-radius:999px; font-size:28px;
  box-shadow: 0 6px 18px rgba(0,0,0,.35);
}

.dots { display:flex; gap:.5rem; justify-content:center; margin-top:.5rem; }
.dot { width:8px; height:8px; border-radius:999px; background:#d4d4d8; border:0; }
.dot.active { background:#111827; } .dark .dot.active { background:#fafafa; }

/* modal */
.modal { padding:0; border:0; background:transparent; }
.modal::backdrop { background: rgba(0,0,0,.6); }
.modal-body { position:relative; margin:8vh auto; max-width: 960px; }
.player { width:100%; aspect-ratio:16/9; border:0; border-radius:12px; background:#000; }
.placeholder { display:flex; align-items:center; justify-content:center; color:#fff; }
.close {
  position:absolute; top:-44px; right:0; border:0; width:36px; height:36px; border-radius:999px;
  background:#fff; color:#111827; cursor:pointer;
}
</style>
