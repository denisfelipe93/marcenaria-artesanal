<template>
  <section class="history-bg theme-neutral">
    <div class="hist" data-hist>
      
      <!-- ===== PARTE 1 — VÍDEO ===== -->
      <section class="hero-video">
        <div class="frame">
          <button class="thumb" type="button" @click="openVideo" aria-label="Reproduzir vídeo">
            <img :src="imgCover" alt="" />
            <span class="play">▶</span>
          </button>
          <div class="ring" aria-hidden="true"></div>
        </div>
      </section>

      <!-- Modal do vídeo -->
      <div v-if="videoOpen" class="ov" @click.self="closeVideo" role="dialog" aria-modal="true" aria-label="Vídeo">
        <div class="ov-dialog">
          <button class="ov-close" @-click="closeVideo" @keyup.enter="closeVideo" aria-label="Fechar">✕</button>
          <div class="ov-player">
            <iframe
              class="player"
              :src="embedPlaySrc"
              title="Marcenaria Artesanal"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- ===== PARTE 2 — TEXTO + AUTOR + MÉTRICAS ===== -->
      <section class="quote-block">
        <div class="quote-wrap">
          <div :class="['quote-text','single', { collapsed: !showMore }]">
            <span class="lead">
              Desde 1991, cada móvel que nasce aqui carrega duas forças que se completam:
              <strong> a precisão da tecnologia e a sensibilidade das mãos</strong>.
            </span>
            São elas que moldam, lapidam e dão vida à madeira, transformando matéria-prima de origem certificada em peças
            únicas feitas para atravessar gerações. Nosso parque fabril abriga
            <strong> uma das estruturas mais modernas do setor</strong>, mas é o olhar atento de quem domina o ofício que
            garante a excelência. Em parceria com arquitetos, decoradores e designers renomados, criamos ambientes que unem
            inovação, responsabilidade ambiental e um design exclusivo, pensado em cada detalhe. Mais que móveis sob medida,
            entregamos memórias feitas em madeira. Porque a tradição só tem valor quando caminha de mãos dadas com o futuro.
          </div>

          <button class="more-btn" type="button" @click="showMore = !showMore" :aria-expanded="showMore ? 'true' : 'false'">
            {{ showMore ? 'Mostrar menos' : 'Ler mais' }}
          </button>

          <div class="soft-sep" aria-hidden="true"></div>

          <div class="quote-author vertical">
            <img :src="logoSvg" alt="Marcenaria Artesanal" class="author-logo" />
            <div class="author-meta">
              <div class="author-name">Elias Sampaio</div>
              <div class="author-role">Founder da Marcenaria Artesanal</div>
            </div>
          </div>

          <div class="soft-sep lg" aria-hidden="true"></div>

          <!-- métricas -->
          <div class="stats-card dark rounded" aria-label="Métricas de experiência">
            <div class="stat">
              <div class="value" aria-label="trinta anos">30+</div>
              <div class="label">Anos de História</div>
            </div>
            <div class="divider" aria-hidden="true"></div>
            <div class="stat">
              <div class="value" aria-label="vinte mil projetos">20k+</div>
              <div class="label">Projetos Criados</div>
            </div>
            <div class="divider" aria-hidden="true"></div>
            <div class="stat">
              <div class="value" aria-label="trinta e cinco mil clientes">8k+</div>
              <div class="label">Clientes Satisfeitos</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== PARTE 3 — DESIGN & ENGENHARIA ===== -->
      <section class="feature-3">
        <div class="f3-wrap">
          <div class="f3-text">
            <h3>DESIGN & ENGENHARIA</h3>
            <div class="copy">
              <p>Na Marcenaria Artesanal, o projeto não para na execução.</p>
              <p><strong>Contamos com arquitetos e engenheiros próprios</strong>, prontos para apoiar cada etapa: da concepção ao detalhamento técnico, garantindo precisão, viabilidade e soluções inovadoras para o seu projeto.</p>
              <p>Essa integração entre <strong>criação, técnica e execução</strong> permite entregar móveis sob medida com excelência, unindo estética, funcionalidade e durabilidade.</p>
              <p>Mais do que uma marcenaria, somos <strong>parceiros completos</strong> na realização de ambientes únicos.</p>
            </div>
          </div>
          <div class="f3-media">
            <img :src="img1" alt="Design & Engenharia" class="photo" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import imgCover from '@/assets/history/cover.jpg'
import logoSvg from '@/assets/history/martesanal.svg'
import img1 from '@/assets/history/a13.webp'

export default {
  name: 'History',
  data() {
    return {
      imgCover,
      logoSvg,
      img1,
      videoId: 'EzirQte5neU',
      useNoCookie: true,
      videoOpen: false,
      showMore: false,
    }
  },
  computed: {
    embedPlaySrc() {
      const base = this.useNoCookie
        ? 'https://www.youtube-nocookie.com/embed/'
        : 'https://www.youtube.com/embed/'
      const params = new URLSearchParams({
        rel: '0', modestbranding: '1', playsinline: '1', autoplay: '1', mute: '0',
      })
      return `${base}${this.videoId}?${params.toString()}`
    },
  },
  methods: {
    openVideo() { this.videoOpen = true; document.documentElement.style.overflow = 'hidden' },
    closeVideo() { this.videoOpen = false; document.documentElement.style.overflow = '' },
  },
  beforeUnmount() { document.documentElement.style.overflow = '' },
}
</script>

<style scoped>
/* ===================== THEMES (full-bleed) ===================== */
/* NEUTRAL (clean) */
.history-bg.theme-neutral{
  --bg-1:#f5f6f8; --bg-2:#ffffff;
  background:
    radial-gradient(1200px 600px at 20% -10%, rgba(0,0,0,.04), transparent 55%),
    linear-gradient(180deg, var(--bg-1), var(--bg-2));
  position:relative; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw; width:100vw;
}
.history-bg.theme-neutral [data-hist]{
  --ink-100:#0b0b0b; --ink-300:#222; --ink-500:#3a3a3a; --ink-700:#4b5563; --ink-900:#0b0b0b;
  --muted:rgba(0,0,0,.62); --panel-dark:#0f1115; --panel-dark-ink:#ffffff;
  max-width:1400px; margin:0 auto; padding:90px 5% 84px; color:var(--ink-700);
}

/* WARM (amadeirado) — opcional */
.history-bg.theme-warm{
  --bg-1:#f6f2ec; --bg-2:#fffaf4;
  background:
    radial-gradient(1200px 600px at 15% -10%, rgba(138,84,26,.06), transparent 55%),
    linear-gradient(180deg, var(--bg-1), var(--bg-2));
  position:relative; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw; width:100vw;
}
.history-bg.theme-warm [data-hist]{
  --ink-100:#0b0b0b; --ink-300:#222; --ink-500:#3a3a3a; --ink-700:#4b5563; --ink-900:#0b0b0b;
  --muted:rgba(0,0,0,.62); --panel-dark:#0f1115; --panel-dark-ink:#ffffff;
  max-width:1400px; margin:0 auto; padding:90px 5% 84px; color:var(--ink-700);
}

/* ===================== PARTE 1 — VÍDEO ===================== */
.hero-video{ display:grid; place-items:center; margin: 10px 0 60px; }
.hero-video .frame{
  position:relative; width:100%; max-width:1160px; aspect-ratio:16/9;
  border-radius:18px;
  background:
    radial-gradient(1400px 500px at 0% -10%, rgba(0,0,0,.04), transparent 60%),
    linear-gradient(180deg, #f7f8fa, #fff 60%);
  outline:1px solid rgba(0,0,0,.06);
  box-shadow:0 14px 40px rgba(0,0,0,.10);
  overflow:hidden;
}
@media (min-width:1440px){ .hero-video .frame{ max-width:1320px; } }
.hero-video .ring{
  position:absolute; inset:0; pointer-events:none; border-radius:inherit; padding:1px;
  background:linear-gradient(135deg, rgba(0,0,0,.12), rgba(0,0,0,.04), rgba(0,0,0,.12));
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude; opacity:.6;
}
.hero-video .thumb{ position:absolute; inset:0; border:0; padding:0; background:transparent; cursor:pointer; }
.hero-video .thumb img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform .35s ease; }
.hero-video .thumb:hover img{ transform:scale(1.015); }
.hero-video .play{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  width:78px; height:78px; line-height:78px; text-align:center;
  border-radius:999px; background:rgba(0,0,0,.55); color:#fff; font-size:30px;
  box-shadow:0 10px 28px rgba(0,0,0,.35);
}
@media (max-width:640px){ .hero-video .play{ width:60px; height:60px; line-height:60px; font-size:24px; } }

/* Modal */
.ov{ position:fixed; inset:0; background:rgba(0,0,0,.65); backdrop-filter:blur(1px);
  display:grid; place-items:center; z-index:9999; }
.ov-dialog{ position:relative; width:min(1280px, calc(100% - 32px)); aspect-ratio:16/9; border-radius:14px; overflow:hidden; background:#000;
  box-shadow:0 18px 48px rgba(0,0,0,.35); }
.ov-player,.player{ width:100%; height:100%; border:0; display:block; }
.ov-close{ position:absolute; top:-44px; right:0; width:38px; height:38px; border-radius:999px; border:0; background:#fff; color:#111827; cursor:pointer; }
@media (max-width:640px){ .ov-dialog{ width:calc(100% - 20px); border-radius:12px; } .ov-close{ top:-40px; } }

/* ===================== PARTE 2 — TEXTO + AUTOR ===================== */
.quote-wrap{ max-width:1080px; margin:0 auto; text-align:center; }
.quote-text.single{
  text-align:left; margin:0 auto; max-width:74ch;
  font-size:clamp(16px,1.5vw,18px); line-height:1.9; color:var(--ink-700);
  letter-spacing:.0045em; text-wrap:pretty; hyphens:auto;
  border-left:2px solid rgba(0,0,0,.08); padding-left:14px;
}
.quote-text.single strong{ color:var(--ink-900); font-weight:700; }
.quote-text.single .lead{ display:inline; color:var(--ink-300); }

.quote-text.collapsed{
  max-height:220px; overflow:hidden;
  mask-image:linear-gradient(180deg,#000 75%,transparent);
  -webkit-mask-image:linear-gradient(180deg,#000 75%,transparent);
}

.more-btn{
  margin:14px auto 0; border:0; background:transparent;
  font-size:13px; letter-spacing:.12em; text-transform:uppercase;
  color:#111; opacity:.7; cursor:pointer;
}
.more-btn:hover{ opacity:1; }

/* Respiros */
.soft-sep{ height:46px; }
.soft-sep.lg{ height:42px; }

/* Autor */
.quote-author.vertical{ display:grid; justify-items:center; gap:10px; }
.author-logo{ width:54px; height:54px; object-fit:contain; display:block; }
.author-meta{ display:grid; text-align:center; gap:4px; }
.author-name{ font-weight:700; color:var(--ink-900); }
.author-role{ font-size:12px; letter-spacing:.04em; color:var(--muted); }

/* ===================== CARD DE MÉTRICAS (responsivo) ===================== */
.stats-card.dark{
  margin:0 auto;
  width:100%;
  max-width:min(1080px, calc(100% - 24px));
  box-sizing:border-box;

  background:
    radial-gradient(80% 140% at 50% -30%, rgba(255,255,255,.10), transparent 60%),
    var(--panel-dark);
  color: var(--panel-dark-ink);
  border:1px solid rgba(255,255,255,.08);
  padding:28px 18px;

  display:grid;
  grid-template-columns:repeat(3,1fr);
  align-items:center;
  justify-items:center;
  gap:0;
  overflow:hidden;
}
.stats-card.dark.rounded{ border-radius:15px !important; box-shadow:0 20px 40px rgba(15,17,21,.28); }

.stat{ display:grid; gap:10px; place-items:center; padding:0 18px; text-align:center; min-width:0; }
.value{
  font-family:'Arboria-Thin', Arial, sans-serif;
  font-variant-numeric:tabular-nums;
  font-size:clamp(52px,6.2vw,82px);
  line-height:1;
  letter-spacing:-0.02em;
  color:#fff;
  text-shadow:0 2px 10px rgba(0,0,0,.35);
}
.label{
  font-size:12px; letter-spacing:.14em; text-transform:uppercase;
  color:rgba(255,255,255,.76);
  white-space:normal; word-break:keep-all;
}
.divider{ display:none; }

@media (max-width:1180px){
  .value{ font-size:clamp(48px,5.6vw,72px); }
}
@media (max-width:960px){
  .stats-card.dark{ grid-template-columns:1fr; row-gap:16px; padding:22px 16px; }
  .divider{ display:none; }
  .stat{ padding:0; }
  .value{ font-size:clamp(44px,14vw,64px); }
  .label{ font-size:11px; letter-spacing:.12em; }
}
@media (max-width:420px){
  .value{ font-size:clamp(40px,16vw,58px); }
  .label{ font-size:10.5px; letter-spacing:.11em; }
}

/* ===================== PARTE 3 — DESIGN & ENGENHARIA ===================== */
.feature-3{ margin-top:80px; }
.f3-wrap{ max-width:1200px; margin:0 auto; display:grid; gap:36px; align-items:center; }
@media (min-width:1024px){ .f3-wrap{ grid-template-columns:1.1fr 1fr; gap:48px; } }

.f3-text h3{
  font-size:14px; letter-spacing:.18em; text-transform:uppercase;
  color: var(--ink-900);  /* preto */
  margin:0 0 16px;
}
.f3-text .copy p{ margin:0 0 16px; line-height:1.8; color:var(--ink-700); font-size:16px; }
.f3-text .copy strong{ color:var(--ink-900); }

.f3-media .photo{
  width:100%; height:360px; object-fit:cover; border-radius:16px;
  outline:1px solid rgba(0,0,0,.06);
  box-shadow:0 16px 40px rgba(0,0,0,.10);
}
@media (max-width:640px){ .f3-media .photo{ height:260px; border-radius:12px; } }

/* Acessibilidade */
@media (prefers-reduced-motion:reduce){ .hero-video .thumb img{ transition:none; } }
</style>
