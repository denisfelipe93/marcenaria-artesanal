<template>
  <!-- Namespace leve para evitar conflito com CSS global -->
  <div class="hist" data-hist>
    <!-- ===== TÍTULO ===== -->
    <div class="title">
      <div class="title-line">
        <h1>30</h1>
        <span>anos</span>
        <div class="spacer"></div>
        <h1>+20k</h1>
        <span>projetos</span>
      </div>
    </div>

    <!-- ===== INTRO (vídeo + texto) ===== -->
    <section class="intro">
      <div class="intro-media">
        <!-- A URL do YouTube é montada no computed 'embedSrc' -->
        <div v-if="showVideo" class="video">
          <iframe
            class="iframe"
            :src="embedSrc"
            title="Marcenaria Artesanal"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
        <!-- fallback: imagem de capa -->
        <img v-else :src="imgCover" alt="Marcenaria Artesanal - História" class="cover" />
      </div>

      <div class="intro-text">
        <p>Desde 1991, cada móvel que nasce aqui carrega duas forças que se completam: <strong>a precisão da tecnologia e a sensibilidade das mãos.</strong></p>
        <p>São elas que moldam, lapidam e dão vida à madeira, transformando matéria-prima de origem certificada em peças únicas feitas para atravessar gerações.</p>
        <p>Nosso parque fabril abriga <strong>uma das estruturas mais modernas do setor</strong>, mas é o olhar atento de quem domina o ofício que garante a excelência.</p>
        <p>Em parceria com arquitetos, decoradores e designers renomados, criamos ambientes que unem inovação, responsabilidade ambiental e um design exclusivo, pensado em cada detalhe.</p>
        <p class="highlight">Mais que móveis sob medida, entregamos memórias feitas em madeira. Porque a tradição só tem valor quando caminha de mãos dadas com o futuro.</p>
      </div>
    </section>

    <!-- ===== SEÇÕES ===== -->
    <!-- Renderizadas por v-for; 'flip' alterna a ordem texto/mídia no desktop -->
    <section
      v-for="(sec, i) in sections"
      :key="sec.key"
      class="sect"
      :class="{ flip: i % 2 === 1 }"
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
          <img :src="sec.img" :alt="sec.title" class="photo" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Imports estáticos (Vite/Webpack-friendly)
import imgCover from '@/assets/history/cover.jpg'
import img1 from '@/assets/history/img1.jpg'
import img2 from '@/assets/history/img2.jpg'
import img3 from '@/assets/history/img3.jpg'

export default {
  name: 'History',
  data() {
    return {
      // mídia da intro
      imgCover,
      showVideo: true,      // mude para false se quiser foto na intro
      videoId: 'shopq-fKYwE',
      useNoCookie: true,    // usa youtube-nocookie
      autoplay: 0,          // 1 para autoplay (requer mute:1 em muitos browsers)
      mute: 0,

      // conteúdo das seções (fácil de manter/expandir)
      sections: [
        {
          key: 'design',
          title: 'DESIGN & ENGENHARIA',
          img: img1,
          paragraphs: [
            'Na Marcenaria Artesanal, o projeto não para na execução.',
            '<strong>Contamos com arquitetos e engenheiros próprios</strong>, prontos para apoiar cada etapa: da concepção ao detalhamento técnico, garantindo precisão, viabilidade e soluções inovadoras para o seu projeto.',
            'Essa integração entre <strong>criação, técnica e execução</strong> permite entregar móveis sob medida com excelência, unindo estética, funcionalidade e durabilidade.',
            'Mais do que uma marcenaria, somos <strong>parceiros completos</strong> na realização de ambientes únicos.',
          ],
        },
        {
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
        },
      ],
    }
  },
  computed: {
    // Monta a URL de embed do YouTube com opções seguras
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
}
</script>

<style scoped>
/* ==========
   Paleta original (preto/cinza) + namespace para evitar conflitos
   ========== */
[data-hist] {
  /* variáveis de cor “originais” do template */
  --ink-900: #000;                 /* títulos/números fortes */
  --ink-800: #111;                 /* leve reforço se precisar */
  --ink-700: #222;                 /* texto principal */
  --ink-600: #4b5563;              /* parágrafo suave */
  --muted: rgba(0,0,0,.6);         /* h3, labels, detalhes */
  --divider: rgba(0,0,0,.2);       /* linhas/acento */

  width: 100%;
  padding: 80px 5%;
  margin: 0 auto;
  max-width: 1400px;
  font-family: 'Arboria-Light', Arial, sans-serif;
  color: var(--ink-700);
}

/* ===== TÍTULO ===== */
[data-hist] .title { text-align: center; margin-bottom: 80px; }
[data-hist] .title-line {
  display: flex; justify-content: center; align-items: center;
  gap: 20px; flex-wrap: wrap;
}
[data-hist] .title-line h1 {
  font-family: 'Arboria-Thin', Arial, sans-serif;
  font-size: 70px; font-weight: 100; line-height: 1; color: var(--ink-900); margin: 0;
}
[data-hist] .title-line span {
  font-family: 'Arboria-Light', Arial, sans-serif;
  font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted);
}
[data-hist] .spacer { width: 30px; }

/* ===== INTRO ===== */
[data-hist] .intro { display: flex; gap: 60px; margin: 60px 0; align-items: flex-start; }
[data-hist] .intro-media { flex: 1; min-width: 0; }
[data-hist] .intro-text  { flex: 1; min-width: 0; }

[data-hist] .video {
  /* wrapper 16:9 — mantém proporção em qualquer largura */
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,.1);
  overflow: hidden;
}
/* fallback para navegadores sem aspect-ratio */
@supports not (aspect-ratio: 16/9) {
  [data-hist] .video { position: relative; padding-top: 56.25%; }
  [data-hist] .video .iframe { position: absolute; inset: 0; width: 100%; height: 100%; }
}
[data-hist] .iframe { width: 100%; height: 100%; border: 0; display: block; border-radius: 12px; }
[data-hist] .cover  { width: 100%; height: 350px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,.1); }

[data-hist] .intro-text p {
  font-family: 'Arboria-Light', Arial, sans-serif;
  font-size: 18px; line-height: 1.7; margin: 0 0 24px;
  color: var(--ink-700);
}
[data-hist] .intro-text strong { color: var(--ink-900); font-weight: 600; }
[data-hist] .intro-text .highlight {
  color: var(--ink-900);
  border-left: 3px solid var(--divider);
  padding-left: 15px; margin-top: 30px;
}

/* ===== SEÇÕES ===== */
[data-hist] .sect { margin: 80px 0; }
[data-hist] .row  { display: flex; gap: 60px; align-items: flex-start; }
[data-hist] .col  { flex: 1; min-width: 0; }

[data-hist] h3 {
  font-family: 'Arboria-Medium', Arial, sans-serif;
  font-size: 22px; text-transform: uppercase; color: var(--muted);
  margin: 0 0 25px; letter-spacing: 1px; position: relative; padding-bottom: 10px;
}
[data-hist] h3::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 50px; height: 2px; background: var(--divider);
}

[data-hist] .copy p {
  font-family: 'Arboria-Light', Arial, sans-serif;
  font-size: 17px; line-height: 1.7; color: var(--ink-600); margin: 0 0 20px;
}
[data-hist] .copy p strong { color: var(--ink-900); }

/* imagens das seções */
[data-hist] .photo {
  width: 100%; height: 350px; object-fit: cover; border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,.1); transition: transform .3s ease;
}
[data-hist] .photo:hover { transform: scale(1.02); }

/* ===== Alternância feita no TEMPLATE (classe flip) ===== */
@media (min-width: 1025px) {
  [data-hist] .sect .row { flex-direction: row; }            /* padrão: texto-esq / mídia-dir */
  [data-hist] .sect.flip .row { flex-direction: row-reverse; } /* itens ímpares invertidos */
}

/* ===== Responsivo ===== */
@media (max-width: 1024px) {
  [data-hist] { padding: 60px 4%; }
  [data-hist] .intro { gap: 32px; flex-direction: column; }   /* intro em coluna */
  [data-hist] .row   { gap: 32px; flex-direction: column; }   /* seções em coluna */
  [data-hist] .title-line h1 { font-size: 60px; }
}
@media (max-width: 768px) {
  [data-hist] .title-line { flex-direction: column; gap: 10px; }
  [data-hist] .title-line h1 { font-size: 50px; }
  [data-hist] .cover, [data-hist] .photo { height: 250px; }
  [data-hist] .intro-text p { font-size: 16px; }
  [data-hist] h3 { font-size: 20px; }
  [data-hist] .copy p { font-size: 16px; }
}
@media (max-width: 480px) {
  [data-hist] { padding: 40px 3%; }
  [data-hist] .title-line h1 { font-size: 40px; }
  [data-hist] .cover, [data-hist] .photo { height: 200px; }
}
</style>
