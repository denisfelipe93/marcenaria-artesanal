<template>
  <div class="ca-scroller" ref="scroller" tabindex="0" role="region" aria-label="Lista de tipos de projetos" @keydown="onKeydown">
    <article v-for="project in projects" :key="project.id" class="ca-card">
      <button type="button" class="ca-cardBtn" @click="openProject(project, 0)" :aria-label="`Abrir galeria do projeto ${project.title}`">
        <div class="ca-media">
          <img :src="project.cover" :alt="project.title" loading="lazy" decoding="async" class="ca-img" />
          <div class="ca-grad"></div>
          <div class="ca-cap">
            <h3 class="ca-title">{{ project.title }}</h3>
            <p class="ca-sub">Ver galeria</p>
          </div>
        </div>
      </button>
    </article>

    <!-- Modal -->
    <ImageModal
      :open="modalOpen"
      :project="activeProject"
      :start-index="startIndex"
      @close="closeModal"
    />
  </div>
</template>

<script>
// IMPORTS ESTÁTICOS (sem depender de alias no new URL)
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
    };
  },
  mounted() {
    const el = this.$refs.scroller;
    if (el) el.style.WebkitOverflowScrolling = "touch";
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
  },
};
</script>

<style scoped>
/* Scroller com 3 cards visíveis no desktop e snap */
.ca-scroller { overflow-x: auto; display: flex; gap: 24px; padding-right: 24px; scroll-snap-type: x mandatory; }
.ca-scroller::-webkit-scrollbar { display: none; } .ca-scroller { scrollbar-width: none; }

/* Larguras responsivas (sem Tailwind) */
.ca-card { flex: 0 0 85%; scroll-snap-align: start; }
@media (min-width: 640px) { .ca-card { flex-basis: 60%; } }
@media (min-width: 768px) { .ca-card { flex-basis: 40%; } }
@media (min-width: 1024px){ .ca-card { flex-basis: 33.333%; } }

/* Cartão */
.ca-cardBtn { all: unset; display: block; cursor: pointer; border-radius: 16px; }
.ca-cardBtn:focus-visible { outline: 2px solid rgba(0,0,0,.6); outline-offset: 2px; border-radius: 16px; }
.ca-media { position: relative; width: 100%; height: 340px; background: #e5e5e5; border-radius: 16px; overflow: hidden; }
@media (min-width: 640px){ .ca-media { height: 360px; } }
@media (min-width: 768px){ .ca-media { height: 380px; } }
@media (min-width: 1024px){ .ca-media { height: 400px; } }

.ca-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ca-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0)); }
.ca-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 20px; color: #fff; }
.ca-title { font-weight: 600; font-size: 18px; }
.ca-sub { font-size: 13px; opacity: .9; margin-top: 4px; }
</style>
