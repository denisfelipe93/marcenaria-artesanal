<template>
  <div class="hist" data-hist>
    <!-- ===== TÍTULO ===== -->
    <div class="title">
      <div class="title-line">
        <div class="title-group">
          <h1>+30</h1>
          <span>anos</span>
        </div>
        <div class="title-group">
          <h1>+20k</h1>
          <span>projetos</span>
        </div>
      </div>
    </div>

    <!-- ===== INTRO (vídeo + texto) ===== -->
    <section class="intro">
      <div class="intro-media">
        <div v-if="showVideo" class="video" :class="{ loading: videoLoading }">
          <div class="video-skeleton" v-if="videoLoading">
            <div class="skeleton-loader"></div>
          </div>
          <iframe
            class="iframe"
            :src="embedSrc"
            title="Marcenaria Artesanal"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            @load="videoLoading = false"
          ></iframe>
        </div>
        <img
          v-else
          :src="imgCover"
          alt="Marcenaria Artesanal - História"
          class="cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="intro-text">
        <div class="carousel-wrapper">
          <div class="carousel" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div class="carousel-slide">
              <p>Desde 1991, cada móvel que nasce aqui carrega duas forças que se completam: <strong>a precisão da tecnologia e a sensibilidade das mãos.</strong></p>
              <p>São elas que moldam, lapidam e dão vida à madeira, transformando matéria-prima de origem certificada em peças únicas feitas para atravessar gerações.</p>
            </div>
            <div class="carousel-slide">
              <p>Nosso parque fabril abriga <strong>uma das estruturas mais modernas do setor</strong>, mas é o olhar atento de quem domina o ofício que garante a excelência.</p>
              <p>Em parceria com arquitetos, decoradores e designers renomados, criamos ambientes que unem inovação, responsabilidade ambiental e um design exclusivo, pensado em cada detalhe.</p>
              <p class="highlight">Mais que móveis sob medida, entregamos memórias feitas em madeira. Porque a tradição só tem valor quando caminha de mãos dadas com o futuro.</p>
            </div>
          </div>
          
          <div class="carousel-controls">
            <button 
              v-for="(_, index) in 2" 
              :key="index" 
              :class="['carousel-indicator', { active: currentSlide === index }]"
              @click="goToSlide(index)"
              :aria-label="`Ir para o slide ${index + 1}`"
              :aria-current="currentSlide === index ? 'true' : 'false'"
            >
              <span class="indicator-progress" v-if="currentSlide === index"></span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SEÇÕES ===== -->
    <section
      v-for="(sec, i) in sections"
      :key="sec.key"
      class="sect"
      :class="{ flip: i % 2 === 1, 'last-section': i === sections.length - 1 }"
    >
      <div class="row">
        <div class="col text">
          <h3>{{ sec.title }}</h3>
          <div class="copy">
            <p
              v-for="(p, k) in sec.paragraphs"
              :key="k"
              v-html="p"
            ></p>
          </div>
        </div>
        <div class="col media">
          <img
            :src="sec.img"
            :alt="sec.title"
            class="photo"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 1024px) 100vw, 50vw"
            @load="imageLoaded($event)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import imgCover from '@/assets/history/cover.jpg'
import img1 from '@/assets/history/img1.jpg'
import img2 from '@/assets/history/img2.jpg'
import img3 from '@/assets/history/img3.jpg'

export default {
  name: 'History',
  data() {
    return {
      imgCover,
      showVideo: true,
      videoId: 'EzirQte5neU', // <- ID atualizado
      useNoCookie: true,
      autoplay: 0,
      mute: 0,
      currentSlide: 0,
      autoPlayInterval: null,
      videoLoading: true,
      prefersReducedMotion: false,
      
      sections: [
        {
          key: 'design',
          title: 'DESIGN & ENGENHARIA',
          img: img1,
          paragraphs: [
            'Na Marcenaria Artesanal, o projeto não para na execução.',
            '<strong>Contamos com arquitetos e engenheiros próprios</strong>, prontos para apoiar cada etapa: da concepção ao detalhamento técnico, garantindo precisão, viabilidade e soluções inovadoras para o seu projeto.',
            'Essa integração entre <strong>criação, técnica e execução</strong> permite entregar móveis sob medida com excelência, unindo estética, funcionalidade và durabilidade.',
            'Mais do que uma marcenaria, somos <strong>parceiros completos</strong> na realização de ambientes únicos.',
          ],
        },
        /* {
          key: 'beleza',
          title: 'BELEZA',
          img: img2,
          paragraphs: [
            'Com uma das maiores e mais modernas instalações no segmento de móveis sob medida da região, a Marcenaria Artesanal desenvolve projetos ao lado de renomados arquitetos e decoradores do estado de São Paulo.',
          ],
        },
        {
          key: 'sentido',
          title: 'SENTIDO',
          img: img3,
          paragraphs: [
            'Desde 1991, a Marcenaria Artesanal fabrica móveis de alta qualidade e procedência, com design arrojado e exclusivo, tendo como premissa a responsabilidade com o meio ambiente.',
          ],
        }, */
      ],
    }
  },
  computed: {
    embedSrc() {
      const base = this.useNoCookie
        ? 'https://www.youtube-nocookie.com/embed/'
        : 'https://www.youtube.com/embed/'
      const params = new URLSearchParams({
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
        autoplay: String(this.autoplay),
        mute: String(this.mute),
      })
      return `${base}${this.videoId}?${params.toString()}`
    },
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % 2
      this.resetAutoPlay()
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + 2) % 2
      this.resetAutoPlay()
    },
    goToSlide(index) {
      this.currentSlide = index
      this.resetAutoPlay()
    },
    startAutoPlay() {
      if (!this.prefersReducedMotion) {
        this.autoPlayInterval = setInterval(() => {
          this.nextSlide()
        }, 8000)
      }
    },
    resetAutoPlay() {
      clearInterval(this.autoPlayInterval)
      this.startAutoPlay()
    },
    imageLoaded(event) {
      event.target.classList.remove('loading')
    },
    checkReducedMotion() {
      this.prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    }
  },
  mounted() {
    this.checkReducedMotion()
    this.startAutoPlay()
    
    if (window.matchMedia) {
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', this.checkReducedMotion)
    }
  },
  beforeUnmount() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }
    
    if (window.matchMedia) {
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', this.checkReducedMotion)
    }
  },
}
</script>

<style scoped>
[data-hist] {
  --ink-900: #000;
  --ink-800: #111;
  --ink-700: #222;
  --ink-600: #4b5563;
  --muted: rgba(0,0,0,.6);
  --divider: rgba(0,0,0,.2);
  --carousel-transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  --hover-transition: all 0.3s ease;

  width: 100%;
  padding: 80px 5% 60px;
  margin: 0 auto;
  max-width: 1400px;
  font-family: 'Arboria-Light', Arial, sans-serif;
  color: var(--ink-700);
}

/* ===== TÍTULO ===== */
[data-hist] .title { 
  text-align: center; 
  margin-bottom: 60px;
}

[data-hist] .title-line {
  display: flex; 
  justify-content: center; 
  align-items: center;
  gap: 20px; 
  flex-wrap: wrap;
}

[data-hist] .title-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

[data-hist] .title-line h1 {
  font-family: 'Arboria-Thin', Arial, sans-serif;
  font-size: 80px;
  font-weight: 300;
  line-height: 1; 
  color: var(--ink-900); 
  margin: 0;
  display: flex;
  align-items: center;
  transition: var(--hover-transition);
}

[data-hist] .title-line h1:hover {
  transform: translateY(-2px);
}

[data-hist] .title-line span {
  font-family: 'Arboria-Light', Arial, sans-serif;
  font-size: 18px;
  text-transform: uppercase; 
  letter-spacing: 1px; 
  color: var(--muted);
  display: flex;
  align-items: center;
  position: relative;
  top: 2px;
  transition: var(--hover-transition);
}

[data-hist] .spacer { width: 30px; }

/* ===== INTRO ===== */
[data-hist] .intro { 
  display: flex; 
  gap: 60px; 
  margin: 40px 0 60px 0;
  align-items: center;
}
[data-hist] .intro-media { 
  flex: 1; 
  min-width: 0;
  display: flex;
  align-items: center;
}
[data-hist] .intro-text  { 
  flex: 1; 
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Carousel Styles */
[data-hist] .carousel-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

[data-hist] .carousel {
  display: flex;
  transition: var(--carousel-transition);
  height: 100%;
  margin-bottom: 24px;
}

[data-hist] .carousel-slide {
  flex: 0 0 100%;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

[data-hist] .intro-text p {
  font-family: 'Arboria-Light', Arial, sans-serif;
  font-size: 18px; 
  line-height: 1.7; 
  margin: 0 0 24px;
  color: var(--ink-700);
}
[data-hist] .intro-text strong { color: var(--ink-900); font-weight: 600; }
[data-hist] .intro-text .highlight {
  color: var(--ink-900);
  border-left: 3px solid var(--divider);
  padding-left: 15px; 
  margin-top: 10px;
  transition: var(--hover-transition);
}

[data-hist] .intro-text .highlight:hover {
  border-left-color: var(--ink-900);
  padding-left: 20px;
}

/* Controles do carrossel - Design melhorado */
[data-hist] .carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

[data-hist] .carousel-indicator {
  width: 48px;
  height: 4px;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: var(--hover-transition);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  /* Remover outline padrão */
  outline: none;
}

[data-hist] .carousel-indicator.active {
  background-color: rgba(0, 0, 0, 0.3);
}

[data-hist] .carousel-indicator:hover {
  background-color: rgba(0, 0, 0, 0.4);
  transform: scaleY(1.5);
}

/* REMOVIDO: contorno de foco padrão
[data-hist] .carousel-indicator:focus {
  outline: 2px solid var(--ink-900);
  outline-offset: 2px;
}
*/

/* Novo estilo de foco mais discreto */
[data-hist] .carousel-indicator:focus {
  background-color: rgba(0, 0, 0, 0.4);
  transform: scaleY(1.5);
}

[data-hist] .indicator-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--ink-900);
  transform: scaleX(0);
  transform-origin: left;
  animation: progress 8s linear forwards;
}

/* Loading states */
[data-hist] .video.loading {
  position: relative;
}

[data-hist] .video-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 12px;
}

[data-hist] .photo.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes progress {
  to {
    transform: scaleX(1);
  }
}

[data-hist] .video {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,.1);
  overflow: hidden;
  transition: var(--hover-transition);
}

[data-hist] .video:hover {
  box-shadow: 0 12px 30px rgba(0,0,0,.15);
  transform: translateY(-2px);
}

@supports not (aspect-ratio: 16/9) {
  [data-hist] .video { position: relative; padding-top: 56.25%; }
  [data-hist] .video .iframe { position: absolute; inset: 0; width: 100%; height: 100%; }
}
[data-hist] .iframe { 
  width: 100%; 
  height: 100%; 
  border: 0; 
  display: block; 
  border-radius: 12px;
  transition: var(--hover-transition);
}
[data-hist] .cover  { 
  width: 100%; 
  height: 350px; 
  object-fit: cover; 
  border-radius: 12px; 
  box-shadow: 0 8px 25px rgba(0,0,0,.1);
  transition: var(--hover-transition);
}

[data-hist] .cover:hover {
  box-shadow: 0 12px 30px rgba(0,0,0,.15);
  transform: translateY(-2px);
}

/* ===== SEÇÕES ===== */
[data-hist] .sect { 
  margin: 80px 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

[data-hist] .sect:nth-child(1) { animation-delay: 0.1s; }
[data-hist] .sect:nth-child(2) { animation-delay: 0.2s; }
[data-hist] .sect:nth-child(3) { animation-delay: 0.3s; }

/* Última seção com menos margem inferior */
[data-hist] .sect.last-section {
  margin-bottom: 40px;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

[data-hist] .row  { display: flex; gap: 60px; }
[data-hist] .col  { flex: 1; min-width: 0; }

[data-hist] h3 {
  font-family: 'Arboria-Medium', Arial, sans-serif;
  font-size: 22px; 
  text-transform: uppercase; 
  color: var(--muted);
  margin: 0 0 25px; 
  letter-spacing: 1px; 
  position: relative; 
  padding-bottom: 10px;
  transition: var(--hover-transition);
}

[data-hist] h3:hover {
  color: var(--ink-800);
}

[data-hist] h3::after {
  content: ''; 
  position: absolute; 
  bottom: 0; 
  left: 0; 
  width: 50px; 
  height: 2px; 
  background: var(--divider);
  transition: var(--hover-transition);
}

[data-hist] h3:hover::after {
  width: 70px;
  background: var(--ink-900);
}

[data-hist] .copy p {
  font-family: 'Arboria-Light', Arial, sans-serif;
  font-size: 17px; 
  line-height: 1.7; 
  color: var(--ink-600); 
  margin: 0 0 20px;
}

[data-hist] .copy p strong { 
  color: var(--ink-900);
  position: relative;
}

[data-hist] .copy p strong::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--ink-900);
  transition: var(--hover-transition);
}

[data-hist] .copy p:hover strong::after {
  width: 100%;
}

[data-hist] .photo {
  width: 100%; 
  height: 350px; 
  object-fit: cover; 
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,.1); 
  transition: transform .3s ease, box-shadow .3s ease;
}

[data-hist] .photo:hover { 
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(0,0,0,.15);
}

/* ===== Alternância + centralização no DESKTOP ===== */
@media (min-width: 1025px) {
  [data-hist] .sect .row { 
    flex-direction: row;
    align-items: center;
  }
  [data-hist] .sect.flip .row { flex-direction: row-reverse; }

  [data-hist] .sect .col.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

/* ===== Responsivo ===== */
@media (max-width: 1024px) {
  [data-hist] { padding: 60px 4% 40px; }
  [data-hist] .intro { 
    gap: 32px; 
    flex-direction: column;
    align-items: stretch;
    margin: 30px 0 50px 0;
  }
  [data-hist] .row   { gap: 32px; flex-direction: column; align-items: stretch; }
  [data-hist] .title-line h1 { font-size: 70px; }
  [data-hist] .title { 
    margin-bottom: 50px;
  }
  
  [data-hist] .sect {
    animation: none;
    opacity: 1;
    transform: none;
    margin: 60px 0;
  }
  
  [data-hist] .sect.last-section {
    margin-bottom: 30px;
  }
}

/* ===== Tablet ===== */
@media (max-width: 768px) {
  [data-hist] .title-line { 
    flex-direction: column; 
    gap: 0; 
  }
  
  [data-hist] .title-group {
    justify-content: center;
    margin-bottom: 8px;
  }

  [data-hist] .title-line h1 { 
    font-size: 72px;
    font-weight: 400;
  }
  
  [data-hist] .title-line span {
    font-size: 16px;
    top: 1px;
  }

  [data-hist] .title-line .spacer { display: none; }

  [data-hist] .cover, [data-hist] .photo { height: 250px; }
  [data-hist] .intro-text p { font-size: 16px; }
  [data-hist] h3 { font-size: 20px; }
  [data-hist] .copy p { font-size: 16px; }
  
  [data-hist] .carousel-indicator {
    width: 36px;
  }
  
  [data-hist] .title { 
    margin-bottom: 40px;
  }
  
  [data-hist] .intro { 
    margin: 20px 0 40px 0;
  }
  
  [data-hist] .sect {
    margin: 50px 0;
  }
  
  [data-hist] .sect.last-section {
    margin-bottom: 20px;
  }
}
/* ===== Celular ===== */
@media (max-width: 480px) {
  [data-hist] { padding: 40px 3% 30px; }
  [data-hist] .title-line h1 { 
    font-size: 60px;
  }
  [data-hist] .title-line span { 
    font-size: 14px;
    top: 0;
  }
  [data-hist] .cover, [data-hist] .photo { height: 200px; }
  
  [data-hist] .carousel-indicator {
    width: 30px;
    height: 3px;
  }
  
  [data-hist] .title { 
    margin-bottom: 30px;
  }
  
  [data-hist] .intro { 
    margin: 15px 0 30px 0;
  }
  
  [data-hist] .sect {
    margin: 40px 0;
  }
  
  [data-hist] .sect.last-section {
    margin-bottom: 15px;
  }
}

/* Acessibilidade: reduz animações se o usuário preferir */
@media (prefers-reduced-motion: reduce) {
  [data-hist] .carousel, 
  [data-hist] .indicator-progress,
  [data-hist] .video,
  [data-hist] .cover,
  [data-hist] .photo,
  [data-hist] .title-line h1,
  [data-hist] .title-line span,
  [data-hist] h3,
  [data-hist] .intro-text .highlight,
  [data-hist] .copy p strong::after {
    transition: none;
    animation: none;
  }
  
  [data-hist] .sect {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  [data-hist] .video:hover,
  [data-hist] .cover:hover,
  [data-hist] .photo:hover {
    transform: none;
  }
  
  [data-hist] .title-line h1:hover,
  [data-hist] .title-line span:hover {
    transform: none;
  }
}

/* Foco visível para acessibilidade - estilo mais suave */
[data-hist] button:focus-visible {
  background-color: rgba(0, 0, 0, 0.4);
  transform: scaleY(1.5);
}
</style>
