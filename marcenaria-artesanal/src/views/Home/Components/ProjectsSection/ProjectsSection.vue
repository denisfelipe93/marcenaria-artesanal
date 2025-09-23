<template>
  <div class="ps-wrap">
    <div class="ps-rowWrap">
      <div
        class="ps-row"
        role="region"
        aria-label="Projetos"
        ref="row"
        @scroll="onRowScroll"
        @wheel="wheelScroll"
        @keydown="onRowKey"
        @mouseenter="focusRow"
        @pointerdown="pointerStart"
        @pointermove="pointerMove"
        @pointerup="pointerEnd"
        @pointercancel="pointerEnd"
        :class="{ 'is-dragging': isDragging }"
        tabindex="0"
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
            @click.stop.prevent="onCardClick(pIdx)"
          >
            <div class="ps-media">
              <div v-if="!coverLoaded[pIdx]" class="ps-skel" aria-hidden="true"></div>

              <img
                :src="project.cover"
                :alt="project.title"
                class="ps-img"
                loading="lazy"
                decoding="async"
                @load="coverLoaded[pIdx] = true"
                @error="onImgError"
              />
              <div class="ps-grad"></div>
              <div class="ps-cap">
                <h3 class="ps-title">{{ project.title }}</h3>
                <p class="ps-sub">Abrir galeria • {{ project.photos.length }} fotos</p>
              </div>
            </div>
          </button>
        </article>
      </div>

      <button
        class="ps-arrow ps-left"
        type="button"
        aria-label="Projetos anteriores"
        @click="scrollByCards(-1)"
        :disabled="!canScrollPrev"
      >‹</button>
      <button
        class="ps-arrow ps-right"
        type="button"
        aria-label="Mais projetos"
        @click="scrollByCards(1)"
        :disabled="!canScrollNext"
      >›</button>
    </div>

    <div class="ps-dots" v-if="projects.length > 1">
      <span
        v-for="(_, index) in projects"
        :key="index"
        :class="['ps-dot', { active: currentVisibleIndex === index }]"
        @click="scrollToIndex(index)"
        tabindex="0"
        @keydown.enter.space.prevent="scrollToIndex(index)"
        :aria-label="`Ir para o projeto ${index + 1}`"
      />
    </div>

    <teleport to="body">
      <transition name="ps-fade">
        <div
          v-if="lightboxOpen && activeProject"
          class="ps-backdrop"
          role="dialog"
          aria-modal="true"
          :aria-label="`Galeria: ${activeProject.title}`"
          @click.self="close"
        >
          <div class="ps-panel" ref="panel">
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
              <div class="ps-count" aria-live="polite">{{ current + 1 }} / {{ total }}</div>
            </div>

            <div class="ps-thumbs">
              <button
                v-for="(p, i) in activeProject.photos"
                :key="p + i"
                type="button"
                class="ps-thumb"
                :class="{ active: i === current }"
                @click="current = i"
                :aria-label="`${activeProject.title} miniatura ${i + 1}`"
              >
                <img :src="p" alt="" />
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
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
      coverLoaded: [false, false, false, false],

      lightboxOpen: false,
      activeIndex: -1,
      current: 0,

      // arrasto
      isDragging: false,
      startX: 0,
      scrollStart: 0,
      movedPx: 0,

      // setas
      canScrollPrev: false,
      canScrollNext: true,
      gapPx: 24,

      // dots
      currentVisibleIndex: 0,

      // trap
      _trapHandler: null,
    };
  },
  computed: {
    activeProject() { return this.activeIndex >= 0 ? this.projects[this.activeIndex] : null; },
    total()         { return this.activeProject ? this.activeProject.photos.length : 0; },
    canPrev()       { return this.current > 0; },
    canNext()       { return this.current < this.total - 1; },
  },
  mounted() {
    window.addEventListener("keydown", this.onKey);
    this.$nextTick(() => {
      this.updateArrows();
      this.updateVisibleIndex();
      window.addEventListener("resize", this.onResize, { passive: true });
    });
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKey);
    window.removeEventListener("resize", this.onResize);
    document.body.style.overflow = "";
    if (this._trapHandler) {
      const panel = this.$refs.panel;
      panel && panel.removeEventListener("keydown", this._trapHandler);
    }
  },
  methods: {
    /* ===== Modal ===== */
    open(projectIndex, start = 0) {
      this.activeIndex = projectIndex;
      this.current = start;
      this.lightboxOpen = true;
      document.body.style.overflow = "hidden";

      this.$nextTick(() => {
        const panel = this.$refs.panel;
        if (panel) {
          const focusable = panel.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          this._trapHandler = (e) => {
            if (e.key !== "Tab") return;
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last && last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first && first.focus(); }
          };
          panel.addEventListener("keydown", this._trapHandler);
        }
        this.$refs.btnClose?.focus();
      });
    },
    close() {
      this.lightboxOpen = false;
      this.activeIndex = -1;
      document.body.style.overflow = "";
      if (this._trapHandler) {
        const panel = this.$refs.panel;
        panel && panel.removeEventListener("keydown", this._trapHandler);
        this._trapHandler = null;
      }
    },
    next() { if (this.canNext) this.current++; },
    prev() { if (this.canPrev) this.current--; },
    onKey(e) {
      if (this.lightboxOpen) {
        if (e.key === "Escape") this.close();
        if (e.key === "ArrowRight") this.next();
        if (e.key === "ArrowLeft")  this.prev();
      }
    },
    onImgError(e) {
      e.target.style.display = "none";
      const parent = e.target.closest(".ps-media");
      if (parent) parent.style.background = "#d9d9d9";
    },

    onCardClick(pIdx) {
      if (this.movedPx > 8) return; // ignorar se arrastou
      this.open(pIdx, 0);
    },

    /* ===== Pointer Events (drag só no mouse) ===== */
    pointerStart(e) {
      if (e.pointerType !== 'mouse') return; // mobile usa scroll nativo
      this.isDragging = true;
      this.movedPx = 0;
      this.startX = e.clientX - this.$refs.row.offsetLeft;
      this.scrollStart = this.$refs.row.scrollLeft;
    },
    pointerMove(e) {
      if (!this.isDragging || e.pointerType !== 'mouse') return;
      const x = e.clientX - this.$refs.row.offsetLeft;
      const delta = x - this.startX;
      this.movedPx = Math.max(this.movedPx, Math.abs(delta));
      this.$refs.row.scrollLeft = this.scrollStart - delta * 1.2;
    },
    pointerEnd(e) {
      if (!this.isDragging || (e && e.pointerType !== 'mouse')) return;
      this.isDragging = false;
      if (this.movedPx > 8) this.snapToNearest();
      setTimeout(()=>{ this.movedPx = 0; }, 0);
    },

    /* ===== Setas & rolagem ===== */
    onRowScroll(){ this.updateArrows(); this.updateVisibleIndex(); },
    wheelScroll(e){
      const row = this.$refs.row; if(!row) return;
      // no desktop, rolagem vertical vira horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        row.scrollLeft += e.deltaY;
        this.updateArrows(); this.updateVisibleIndex();
      }
    },
    updateArrows(){
      const row = this.$refs.row; if(!row) return;
      const max = row.scrollWidth - row.clientWidth;
      const sl = row.scrollLeft;
      this.canScrollPrev = sl > 4;
      this.canScrollNext = sl < max - 4;
    },
    cardStride(){
      const row = this.$refs.row; if(!row) return 0;
      const first = row.querySelector(".ps-card"); if(!first) return 0;
      return Math.round(first.getBoundingClientRect().width + this.gapPx);
    },
    scrollByCards(dir=1){
      const row = this.$refs.row; if(!row) return;
      const stride = this.cardStride() || row.clientWidth * 0.9;
      const target = Math.max(0, Math.min(row.scrollLeft + dir*stride, row.scrollWidth - row.clientWidth));
      row.scrollTo({ left: target, behavior:"smooth" });
      setTimeout(()=>{ this.updateArrows(); this.updateVisibleIndex(); }, 220);
    },
    snapToNearest(){
      const row = this.$refs.row; if(!row) return;
      const stride = this.cardStride(); if(!stride) return;
      const idx = Math.round(row.scrollLeft / stride);
      row.scrollTo({ left: idx*stride, behavior:"smooth" });
      this.updateVisibleIndex();
    },

    /* ===== Teclado & dots ===== */
    onRowKey(e){
      if(this.lightboxOpen) return;
      if(e.key==="ArrowRight"){ e.preventDefault(); this.scrollByCards(1); }
      if(e.key==="ArrowLeft"){  e.preventDefault(); this.scrollByCards(-1); }
    },
    focusRow(){ this.$refs.row?.focus({ preventScroll:true }); },

    updateVisibleIndex(){
      const row = this.$refs.row; if(!row) return;
      const stride = this.cardStride(); if(!stride){ this.currentVisibleIndex=0; return; }
      const idx = Math.round(row.scrollLeft / stride);
      this.currentVisibleIndex = Math.max(0, Math.min(idx, this.projects.length-1));
    },
    scrollToIndex(index){
      const row = this.$refs.row; if(!row) return;
      const stride = this.cardStride();
      row.scrollTo({ left: index*stride, behavior:"smooth" });
      this.currentVisibleIndex = index;
    },

    onResize(){ this.updateArrows(); this.updateVisibleIndex(); },
  },
};
</script>

<style scoped>
.ps-wrap { position: relative; }
.ps-rowWrap{ position: relative; }

/* faixa de cards */
.ps-row{
  --ps-gap: 24px;
  display:flex; gap: var(--ps-gap);
  overflow-x:auto; overflow-y:visible;
  overscroll-behavior-x: contain;
  padding-right: var(--ps-gap); padding-bottom: 8px;
  scroll-snap-type:x mandatory; -ms-overflow-style:none; scrollbar-width:none;
  min-height: 1px; cursor: grab; scroll-behavior: smooth; outline: none;
  touch-action: pan-x;                 /* ← permite swipe horizontal no mobile */
  -webkit-overflow-scrolling: touch;  /* ← momentum no iOS */
}
.ps-row.is-dragging{ cursor: grabbing; user-select: none; }
.ps-row::-webkit-scrollbar{ display:none; }

/* ajuda a não bloquear o gesto ao tocar no card */
.ps-cardBtn, .ps-media{ touch-action: pan-x; }

/* 1 / 2 / 3 cards por vez */
.ps-card{ flex:0 0 90%; scroll-snap-align:start; scroll-snap-stop: always; }
@media (min-width:640px){ .ps-card{ flex-basis: calc((100% - var(--ps-gap))/2); } }
@media (min-width:1024px){ .ps-card{ flex-basis: calc((100% - (2*var(--ps-gap)))/3); } }

/* setas (desktop) */
.ps-arrow{
  position:absolute; top:50%; transform:translateY(-50%);
  width:36px; height:36px; border:none; border-radius:999px;
  background:rgba(0,0,0,.14); color:#fff; font-size:20px; line-height:1;
  display:none; align-items:center; justify-content:center; cursor:pointer;
  transition:transform .18s ease, background .18s ease, opacity .18s ease;
  opacity:.95; backdrop-filter:saturate(120%) blur(2px); z-index:2;
}
.ps-arrow:hover{ transform:translateY(-50%) scale(1.06); background:rgba(0,0,0,.22); }
.ps-arrow:disabled{ opacity:.35; cursor:default; }
.ps-arrow:focus-visible{ outline:3px solid #fff; outline-offset:2px; }
.ps-left{ left:4px; } .ps-right{ right:4px; }
@media (min-width:1024px){ .ps-arrow{ display:inline-flex; } }

/* cartão */
.ps-cardBtn{ all:unset; display:block; cursor:pointer; border-radius:20px; outline: none; -webkit-tap-highlight-color: transparent; }
.ps-cardBtn:focus-visible .ps-media{ box-shadow:0 0 0 3px rgba(54,39,39,.35); }

.ps-media{
  position:relative; width:100%; aspect-ratio:16/9; background:#e5e5e5;
  border-radius:20px; overflow:hidden; height:clamp(180px,20vw,290px);
  transition: transform .18s ease, box-shadow .18s ease; will-change: transform;
}
.ps-cardBtn:hover .ps-media{ transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,.08); }

.ps-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
.ps-grad{ position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0)); }
.ps-cap{ position:absolute; left:0; right:0; bottom:0; padding:16px 20px; color:#fff; }
.ps-title{ font-weight:600; font-size:18px; font-family:Arboria-Bold, system-ui; }
.ps-sub{ font-size:13px; opacity:.9; margin-top:4px; font-family:Arboria-Light, system-ui; }

/* skeleton */
.ps-skel{
  position:absolute; inset:0;
  background:linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 37%, rgba(0,0,0,0.06) 63%);
  animation: ps-shimmer 1.1s infinite linear;
}
@keyframes ps-shimmer{ 0%{ background-position:-200px 0; } 100%{ background-position:200px 0; } }

/* dots */
.ps-dots{ display:flex; justify-content:center; gap:10px; margin-top:22px; }
@media (min-width:640px){ .ps-dots{ margin-top:24px; } }
.ps-dot{ width:8px; height:8px; border-radius:50%; background-color:rgba(0,0,0,0.2); cursor:pointer; transition:all .2s ease; }
.ps-dot.active{ background-color:#362727; width:24px; border-radius:4px; }
.ps-dot:focus-visible{ outline:3px solid #362727; outline-offset:2px; }
@media (min-width:1024px){ .ps-dots{ display:none; } }

/* modal */
.ps-fade-enter-active,.ps-fade-leave-active{ transition:opacity .18s ease; }
.ps-fade-enter-from,.ps-fade-leave-to{ opacity:0; }

.ps-backdrop{
  position:fixed; left:0; top:0; width:100vw; height:100vh;
  z-index:999999; display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,.82);
}
.ps-panel{ width:min(1200px,92vw); position:relative; }

.ps-close{
  position:absolute; top:-44px; right:0;
  border:none; background:rgba(255,255,255,.2); color:#fff;
  width:36px; height:36px; border-radius:999px; cursor:pointer;
  display:inline-flex; align-items:center; justify-content:center;
}

/* área grande da imagem */
.ps-view{ position:relative; background:rgba(0,0,0,.35); border-radius:12px; overflow:hidden; }
.ps-big{ display:block; width:100%; height:70vh; object-fit:contain; background:#000; }

/* setas dentro do modal */
.ps-nav{
  position:absolute; top:50%; transform:translateY(-50%);
  display:inline-flex; align-items:center; justify-content:center;
  width:clamp(36px,4.2vw,48px); height:clamp(36px,4.2vw,48px);
  border:none; padding:0; border-radius:999px;
  background:rgba(255,255,255,.18); color:#fff; cursor:pointer;
  transition:background .18s ease, transform .18s ease;
}
.ps-nav:hover{ background:rgba(255,255,255,.26); transform:translateY(-50%) scale(1.04); }
.ps-nav:disabled{ opacity:.4; cursor:default; }
.ps-nav:focus-visible{ outline:3px solid #fff; outline-offset:2px; }

.ps-prev{ left:10px; }
.ps-next{ right:10px; }
@media (min-width:1024px){
  .ps-prev{ left:18px; }
  .ps-next{ right:18px; }
}

.ps-count{ position:absolute; left:0; right:0; bottom:8px; text-align:center; color:#fff; opacity:.9; }

/* thumbs */
.ps-thumbs{ display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:8px; margin-top:12px; }
.ps-thumb{ border:2px solid transparent; border-radius:8px; overflow:hidden; padding:0; background:none; cursor:pointer; }
.ps-thumb.active{ border-color:#fff; }
.ps-thumb img{ display:block; width:100%; height:70px; object-fit:cover; }

@media (prefers-reduced-motion: reduce){
  .ps-row, .ps-media, .ps-arrow { scroll-behavior:auto; transition:none !important; }
}
</style>
