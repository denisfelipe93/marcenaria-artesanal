<template>
  <div v-if="open && project" class="im-backdrop" role="dialog" :aria-label="`Galeria: ${project.title}`">
    <div class="im-panel">
      <div class="im-head">
        <h3 class="im-title">{{ project.title }}</h3>
        <button ref="btnClose" class="im-close" type="button" @click="close">✕</button>
      </div>

      <div class="im-view">
        <img :src="project.photos[current]" :alt="`${project.title} - imagem ${current + 1} de ${total}`" class="im-img" loading="lazy" decoding="async" />
        <button class="im-nav im-prev" :disabled="!canGoPrev" @click.stop="prev" aria-label="Anterior">←</button>
        <button class="im-nav im-next" :disabled="!canGoNext" @click.stop="next" aria-label="Próxima">→</button>
        <div class="im-count">{{ current + 1 }} / {{ total }}</div>
      </div>

      <div class="im-thumbs">
        <button v-for="(p, idx) in project.photos" :key="p + idx" type="button"
          class="im-thumb" :class="{ active: idx === current }" @click="current = idx">
          <img :src="p" :alt="`${project.title} miniatura ${idx + 1}`" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageModal",
  props: { open: Boolean, project: Object, startIndex: Number },
  emits: ["close"],
  data() { return { current: 0 }; },
  computed: {
    total() { return (this.project?.photos?.length || 0); },
    canGoPrev() { return this.current > 0; },
    canGoNext() { return this.current < this.total - 1; },
  },
  watch: {
    open(val) {
      if (val) {
        this.current = this.startIndex || 0;
        this.$nextTick(() => this.$refs.btnClose && this.$refs.btnClose.focus());
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  mounted() { window.addEventListener("keydown", this.onKey); },
  beforeUnmount() { window.removeEventListener("keydown", this.onKey); },
  methods: {
    close() { this.$emit("close"); },
    next() { if (this.canGoNext) this.current++; },
    prev() { if (this.canGoPrev) this.current--; },
    onKey(e) {
      if (!this.open) return;
      if (e.key === "Escape") this.close();
      else if (e.key === "ArrowRight") this.next();
      else if (e.key === "ArrowLeft") this.prev();
    },
  },
};
</script>

<style scoped>
.im-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.7); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.im-panel { width: min(1200px, 92vw); }
.im-head { display: flex; align-items: center; justify-content: space-between; color: #fff; margin-bottom: 12px; }
.im-title { font-weight: 600; font-size: 18px; }
.im-close { background: rgba(255,255,255,.12); color: #fff; border: none; padding: 8px 12px; border-radius: 999px; cursor: pointer; }

.im-view { position: relative; background: rgba(0,0,0,.4); border-radius: 12px; overflow: hidden; }
.im-img { display: block; width: 100%; height: 70vh; object-fit: contain; background: #000; }

.im-nav { position: absolute; top: 50%; transform: translateY(-50%); border: none; padding: 10px 14px; background: rgba(255,255,255,.12); color: #fff; border-radius: 999px; cursor: pointer; }
.im-nav:disabled { opacity: .4; cursor: default; }
.im-prev { left: 8px; } .im-next { right: 8px; }
.im-count { position: absolute; bottom: 8px; left: 0; right: 0; text-align: center; color: #fff; opacity: .9; }

.im-thumbs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
.im-thumb { border: 2px solid transparent; border-radius: 8px; overflow: hidden; padding: 0; background: none; cursor: pointer; }
.im-thumb.active { border-color: #fff; }
.im-thumb img { display: block; width: 100%; height: 70px; object-fit: cover; }

@media (max-width: 640px) { .im-img { height: 60vh; } .im-thumb img { height: 56px; } }
</style>
