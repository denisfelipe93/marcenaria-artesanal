<template>
  <div class="ps-wrap">
    <div
      class="ps-row"
      role="region"
      aria-label="Projetos"
      ref="row"
      @mousedown="dragStart"
      @mouseup="dragStop"
      @mouseleave="dragStop"
      @mousemove="dragMove"
      @wheel="wheelScroll"
      :class="{ 'is-dragging': isDragging }"
    >
      <article
        v-for="(project, pIdx) in projects"
        :key="project.id"
        class="ps-card"
        role="listitem"
      >
        <button
          type="button"
          class="ps-cardBtn"
          :aria-label="`Abrir galeria ${project.title}`"
          @click="open(pIdx, 0)"
        >
          <div class="ps-media">
            <img
              :src="project.cover"
              :alt="project.title"
              class="ps-img"
              loading="lazy"
              decoding="async"
              @error="onImgError"
            />
            <div class="ps-grad"></div>
            <div class="ps-cap">
              <h3 class="ps-title">{{ project.title }}</h3>
              <p class="ps-sub">Ver galeria</p>
            </div>
          </div>
        </button>
      </article>
    </div>

    <!-- Modal -->
    <transition name="ps-fade">
      <div
        v-if="lightboxOpen && activeProject"
        class="ps-backdrop"
        role="dialog"
        aria-modal="true"
        :aria-label="`Galeria: ${activeProject.title}`"
        @click.self="close"
      >
        <div class="ps-panel">
          <button
            class="ps-close"
            type="button"
            aria-label="Fechar (Esc)"
            @click="close"
            ref="btnClose"
          >✕</button>

          <div class="ps-view">
            <img
              :src="activeProject.photos[current]"
              :alt="`${activeProject.title} - imagem ${current + 1} de ${total}`"
              class="ps-big"
              loading="lazy"
              decoding="async"
            />
            <button class="ps-nav ps-prev" :disabled="!canPrev" @click.stop="prev" aria-label="Anterior">←</button>
            <button class="ps-nav ps-next" :disabled="!canNext" @click.stop="next" aria-label="Próxima">→</button>
            <div class="ps-count">{{ current + 1 }} / {{ total }}</div>
          </div>

          <div class="ps-thumbs">
            <button
              v-for="(p, i) in activeProject.photos"
              :key="p + i"
              type="button"
              class="ps-thumb"
              :class="{ active: i === current }"
              @click="current = i"
            >
              <img :src="p" :alt="`${activeProject.title} miniatura ${i + 1}`" />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import image1  from "@/assets/carousel/image1.png";
import image2  from "@/assets/carousel/image2.png";
import image3  from "@/assets/carousel/image3.png";
import image4  from "@/assets/carousel/image4.png";
import image5  from "@/assets/carousel/image5.png";
import image6  from "@/assets/carousel/image6.png";
import image7  from "@/assets/carousel/image7.png";
import image8  from "@/assets/carousel/image8.png";
import image9  from "@/assets/carousel/image9.png";
import image10 from "@/assets/carousel/image10.png";
import image11 from "@/assets/carousel/image11.png";
import image12 from "@/assets/carousel/image12.png";

export default {
  name: "ProjectsSection",
  data() {
    return {
      projects: [
        { id: "sala-de-estar",  title: "Sala de Estar",  cover: image1,  photos: [image5, image6] },
        { id: "office",         title: "Office",         cover: image2,  photos: [image7, image8] },
        { id: "sala-de-jantar", title: "Sala de Jantar", cover: image3,  photos: [image9, image10] },
        { id: "comercial",      title: "Comercial",      cover: image4,  photos: [image11, image12] },
      ],
      lightboxOpen: false,
      activeIndex: -1,
      current: 0,

      // drag-to-scroll
      isDragging: false,
      startX: 0,
      scrollStart: 0,
    };
  },
  computed: {
    activeProject() { return this.activeIndex >= 0 ? this.projects[this.activeIndex] : null; },
    total()         { return this.activeProject ? this.activeProject.photos.length : 0; },
    canPrev()       { return this.current > 0; },
    canNext()       { return this.current < this.total - 1; },
  },
  mounted() { window.addEventListener("keydown", this.onKey); },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKey);
    document.body.style.overflow = "";
  },
  methods: {
    open(projectIndex, start = 0) {
      this.activeIndex = projectIndex;
      this.current = start;
      this.lightboxOpen = true;
      document.body.style.overflow = "hidden";
      this.$nextTick(() => this.$refs.btnClose?.focus());
    },
    close() { this.lightboxOpen = false; this.activeIndex = -1; document.body.style.overflow = ""; },
    next() { if (this.canNext) this.current++; },
    prev() { if (this.canPrev) this.current--; },
    onKey(e) {
      if (!this.lightboxOpen) return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    },
    onImgError(e) {
      e.target.style.display = "none";
      const parent = e.target.closest(".ps-media");
      if (parent) parent.style.background = "#d9d9d9";
    },

    // ---- Drag-to-scroll (desktop mouse) ----
    dragStart(e) {
      this.isDragging = true;
      this.startX = e.pageX - this.$refs.row.offsetLeft;
      this.scrollStart = this.$refs.row.scrollLeft;
    },
    dragStop() {
      this.isDragging = false;
    },
    dragMove(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.row.offsetLeft;
      const walk = (x - this.startX) * 1.2; // sensibilidade
      this.$refs.row.scrollLeft = this.scrollStart - walk;
    },
    // rolagem com a rodinha do mouse na horizontal
    wheelScroll(e) {
      // se o gesto é vertical, usa para mover horizontalmente a faixa
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        this.$refs.row.scrollLeft += e.deltaY;
      }
    },
  },
};
</script>

<style scoped>
.ps-wrap { position: relative; }

/* faixa de cards */
.ps-row{
  --ps-gap: 24px;
  display:flex;
  gap: var(--ps-gap);
  overflow-x:auto;
  padding-right: var(--ps-gap);
  scroll-snap-type:x mandatory;
  -ms-overflow-style:none;
  scrollbar-width:none;
  min-height: 1px; /* suficiente; a própria mídia define a altura */
  cursor: grab;
}
.ps-row.is-dragging{ cursor: grabbing; user-select: none; }
.ps-row::-webkit-scrollbar{ display:none; }

/* Larguras: 1 / 2 / 3 cards */
.ps-card{ flex:0 0 90%; scroll-snap-align:start; }
@media (min-width:640px){
  .ps-card{ flex-basis: calc((100% - var(--ps-gap)) / 2); } /* 2 cards */
}
@media (min-width:1024px){
  .ps-card{ flex-basis: calc((100% - (2 * var(--ps-gap))) / 3); } /* 3 cards */
}

/* Cartão */
.ps-cardBtn{ all:unset; display:block; cursor:pointer; border-radius:16px; }

/* Mídia responsiva:
   - usa aspect-ratio para manter proporção
   - altura com clamp para não ficar gigante nem minúsculo */
.ps-media{
  position:relative;
  width:100%;
  aspect-ratio:16/9;
  background:#e5e5e5;
  border-radius:16px;
  overflow:hidden;
  height: clamp(180px, 22vw, 320px);
}
.ps-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
.ps-grad{ position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0)); }
.ps-cap{ position:absolute; left:0; right:0; bottom:0; padding:16px 20px; color:#fff; }
.ps-title{ font-weight:600; font-size:18px; font-family:Arboria-Bold, system-ui; }
.ps-sub{ font-size:13px; opacity:.9; margin-top:4px; font-family:Arboria-Light, system-ui; }

/* Modal */
.ps-fade-enter-active,.ps-fade-leave-active{ transition:opacity .18s ease; }
.ps-fade-enter-from,.ps-fade-leave-to{ opacity:0; }

.ps-backdrop{
  position:fixed; inset:0; z-index:9999;
  display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,.7);
}
.ps-panel{ width:min(1200px,92vw); position:relative; }

.ps-close{
  position:absolute; top:-44px; right:0;
  border:none; background:rgba(255,255,255,.2); color:#fff;
  width:36px; height:36px; border-radius:999px; cursor:pointer;
  display:inline-flex; align-items:center; justify-content:center;
}
@media (max-width:640px){ .ps-close{ top:-48px; } }

.ps-view{ position:relative; background:rgba(0,0,0,.35); border-radius:12px; overflow:hidden; }
.ps-big{ display:block; width:100%; height:70vh; object-fit:contain; background:#000; }

.ps-nav{
  position:absolute; top:50%; transform:translateY(-50%);
  border:none; padding:10px 14px; border-radius:999px;
  background:rgba(255,255,255,.15); color:#fff; cursor:pointer;
}
.ps-nav:disabled{ opacity:.4; cursor:default; }
.ps-prev{ left:8px; } .ps-next{ right:8px; }

.ps-count{ position:absolute; left:0; right:0; bottom:8px; text-align:center; color:#fff; opacity:.9; }

.ps-thumbs{ display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:8px; margin-top:12px; }
.ps-thumb{ border:2px solid transparent; border-radius:8px; overflow:hidden; padding:0; background:none; cursor:pointer; }
.ps-thumb.active{ border-color:#fff; }
.ps-thumb img{ display:block; width:100%; height:70px; object-fit:cover; }

@media (max-width:640px){
  .ps-big{ height:60vh; }
  .ps-thumb img{ height:56px; }
}
</style>
