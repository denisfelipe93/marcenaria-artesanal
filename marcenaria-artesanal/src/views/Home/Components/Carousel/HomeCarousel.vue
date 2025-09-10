<template>
  <div class="ca-wrap">
    <!-- DEBUG: remova quando estiver ok -->
    <div class="ca-debug">DEBUG • HomeCarousel ativo • {{ projects.length }} cards</div>

    <div
      class="ca-scroller"
      ref="scroller"
      tabindex="0"
      role="region"
      aria-label="Lista de tipos de projetos"
      @keydown="onKeydown"
      @scroll="updateArrows"
    >
      <article v-for="project in projects" :key="project.id" class="ca-card" role="listitem">
        <button type="button" class="ca-cardBtn" @click="openProject(project, 0)" :aria-label="`Abrir galeria do projeto ${project.title}`">
          <div class="ca-media">
            <img :src="project.cover" :alt="project.title" loading="lazy" decoding="async" class="ca-img" @error="onImgError($event)" />
            <div class="ca-grad"></div>
            <div class="ca-cap">
              <h3 class="ca-title">{{ project.title }}</h3>
              <p class="ca-sub">Ver galeria</p>
            </div>
          </div>
        </button>
      </article>
    </div>

    <button v-if="showLeft" class="ca-arrow ca-left" type="button" @click="scrollBy(-1)" aria-label="Rolar para a esquerda">‹</button>
    <button v-if="showRight" class="ca-arrow ca-right" type="button" @click="scrollBy(1)" aria-label="Rolar para a direita">›</button>

    <ImageModal
      :open="modalOpen"
      :project="activeProject"
      :start-index="startIndex"
      @close="closeModal"
    />
  </div>
</template>

<script>
import ImageModal from "@/views/Home/Components/Carousel/ImageModal";
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
  name: "HomeCarousel",
  components: { ImageModal },
  data() {
    return {
      projects: [
        { id: "sala-de-estar",  title: "Sala de Estar",  cover: image1,  photos: [image5, image6] },
        { id: "office",         title: "Office",         cover: image2,  photos: [image7, image8] },
        { id: "sala-de-jantar", title: "Sala de Jantar", cover: image3,  photos: [image9, image10] },
        { id: "comercial",      title: "Comercial",      cover: image4,  photos: [image11, image12] },
      ],
      modalOpen: false,
      activeProject: null,
      startIndex: 0,
      showLeft: false,
      showRight: true,
    };
  },
  mounted() {
    const el = this.$refs.scroller;
    if (el) {
      el.style.WebkitOverflowScrolling = "touch";
      this.updateArrows();
      window.addEventListener("resize", this.updateArrows);
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateArrows);
  },
  methods: {
    openProject(project, index = 0) {
      this.activeProject = project;
      this.startIndex = index;
      this.modalOpen = true;
    },
    closeModal() { this.modalOpen = false; },
    onKeydown(e) {
      const el = this.$refs.scroller;
      if (!el) return;
      const delta = el.clientWidth * 0.9;
      if (e.key === "ArrowRight") { e.preventDefault(); el.scrollBy({ left:  delta, behavior: "smooth" }); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); el.scrollBy({ left: -delta, behavior: "smooth" }); }
    },
    scrollBy(dir) {
      const el = this.$refs.scroller;
      if (!el) return;
      const delta = el.clientWidth * 0.9 * dir;
      el.scrollBy({ left: delta, behavior: "smooth" });
      setTimeout(this.updateArrows, 350);
    },
    updateArrows() {
      const el = this.$refs.scroller;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      this.showLeft = scrollLeft > 4;
      this.showRight = scrollLeft + clientWidth < scrollWidth - 4;
    },
    onImgError(e) {
      e.target.style.display = "none";
      const parent = e.target.closest(".ca-media");
      if (parent) parent.style.background = "#d9d9d9";
    },
  },
};
</script>

<style scoped>
/* DEBUG — remova quando estiver tudo ok */
.ca-debug{
  font: 600 12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  color:#444; background:#f2f2f2; border:1px solid #e1e1e1;
  padding:8px 10px; border-radius:8px; margin-bottom:12px; display:inline-block;
}

.ca-wrap { position: relative; }

/* 🎯 Forçar altura mínima para o container e os cards */
.ca-scroller {
  overflow-x: auto;
  display: flex;
  gap: 24px;
  padding-right: 24px;
  scroll-snap-type: x mandatory;
  min-height: 340px;            /* <<< garante que apareça */
}
.ca-scroller::-webkit-scrollbar { display: none; }
.ca-scroller { scrollbar-width: none; }

/* Larguras responsivas (3 cards no desktop) + ALTURA FORÇADA */
.ca-card { flex: 0 0 85%; scroll-snap-align: start; height: 340px; }
@media (min-width: 640px) { .ca-card { flex-basis: 60%; height: 360px; } }
@media (min-width: 768px) { .ca-card { flex-basis: 40%; height: 380px; } }
@media (min-width: 1024px){ .ca-card { flex-basis: 33.333%; height: 400px; } }

/* Cartão */
.ca-cardBtn { all: unset; display: block; cursor: pointer; border-radius: 16px; }
.ca-cardBtn:focus-visible { outline: 2px solid rgba(0,0,0,.6); outline-offset: 2px; border-radius: 16px; }

/* A mídia acompanha a altura do card */
.ca-media { position: relative; width: 100%; height: 100%; background: #e5e5e5; border-radius: 16px; overflow: hidden; }
.ca-img  { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ca-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0)); }
.ca-cap  { position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 20px; color: #fff; }
.ca-title { font-weight: 600; font-size: 18px; }
.ca-sub   { font-size: 13px; opacity: .9; margin-top: 4px; }

/* Setas (apenas desktop) */
.ca-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  border: none; width: 40px; height: 40px; border-radius: 999px;
  background: rgba(0,0,0,.5); color: #fff; cursor: pointer; display: none;
  align-items: center; justify-content: center;
}
.ca-arrow:hover { background: rgba(0,0,0,.65); }
@media (min-width: 1024px){ .ca-arrow { display: inline-flex; } }
.ca-left  { left: 6px; } .ca-right { right: 6px; }
</style>
