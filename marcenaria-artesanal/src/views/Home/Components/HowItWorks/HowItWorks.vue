<template>
  <section class="hiw">
    <div class="hiw-head">
      <h2 class="hiw-title">
        Sua jornada com a gente<br />
        é clara, leve e segura.
      </h2>
      <p class="hiw-kicker">veja as etapas</p>
    </div>

    <div class="hiw-band">
      <div class="hiw-container">
        <button
          class="hiw-arrow hiw-left"
          type="button"
          aria-label="Etapas anteriores"
          @click="scrollBy(-1)"
          :disabled="!canPrev"
        >‹</button>

        <div
          ref="row"
          class="hiw-row"
          role="list"
          aria-label="Etapas do processo"
          @scroll="onScroll"
          @keydown="onRowKey"
          tabindex="0"
        >
          <article
            v-for="step in steps"
            :key="step.id"
            class="hiw-card"
            role="listitem"
          >
            <div class="hiw-cardInner">
              <div class="hiw-num">{{ step.num }}</div>
              <h3 class="hiw-cardTitle" v-html="step.title"></h3>
              <p class="hiw-desc">{{ step.desc }}</p>
            </div>
          </article>
        </div>

        <button
          class="hiw-arrow hiw-right"
          type="button"
          aria-label="Próximas etapas"
          @click="scrollBy(1)"
          :disabled="!canNext"
        >›</button>

        <!-- contador: só mobile/tablet -->
        <div class="hiw-progress" aria-live="polite">
          {{ visibleStep }} / {{ steps.length }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const steps = [
  { id: "01", num: "01.", title: "Reunião de Briefing", desc: "É nesse primeiro contato que ouvimos sua história, rotina e o que você espera do seu novo ambiente. Aqui começa a transformação." },
  { id: "02", num: "02.", title: "Criação do<br/>Projeto", desc: "Transformamos suas ideias em um projeto 3D exclusivo, que une estilo, funcionalidade e aproveitamento inteligente de espaço." },
  { id: "03", num: "03.", title: "Proposta<br/>Personalizada", desc: "Apresentamos todos os detalhes e valores com clareza, de acordo com suas escolhas, necessidades e prioridades." },
  { id: "04", num: "04.", title: "Fechamento com<br/>Segurança", desc: "Com tudo aprovado, formalizamos o contrato com prazos definidos, garantias e total transparência para sua tranquilidade." },
  { id: "05", num: "05.", title: "Fabricação e<br/>Montagem", desc: "Seu projeto ganha vida com materiais de alta qualidade. Nossa equipe própria cuida da entrega e da montagem na sua casa." },
];

const row = ref(null);
const canPrev = ref(false);
const canNext = ref(true);
const visibleStep = ref(1);

const GAP_PX = 24;
let stride = 0, ticking = false, ro;

function computeStride(){
  const el=row.value; if(!el) return;
  const first = el.querySelector(".hiw-card"); if(!first) return;
  stride = Math.round(first.getBoundingClientRect().width + GAP_PX);
}
function updateArrows(){
  const el=row.value; if(!el) return;
  const max=el.scrollWidth-el.clientWidth, sl=el.scrollLeft;
  canPrev.value = sl>4; canNext.value = sl<max-4;
}
function updateVisibleStep(){
  const el=row.value; if(!el) return;
  const s = stride || Math.max(1, el.clientWidth*0.9);
  const idx = Math.round(el.scrollLeft / s);
  visibleStep.value = Math.min(steps.length, Math.max(1, idx+1));
}
function onScroll(){
  if(ticking) return; ticking=true;
  requestAnimationFrame(()=>{ updateArrows(); updateVisibleStep(); ticking=false; });
}
function scrollBy(dir=1){
  const el=row.value; if(!el) return;
  const s = stride || el.clientWidth*0.9;
  const target = Math.max(0, Math.min(el.scrollLeft + dir*s, el.scrollWidth-el.clientWidth));
  el.scrollTo({ left: target, behavior:"smooth" });
  setTimeout(()=>{ updateArrows(); updateVisibleStep(); }, 240);
}
function onRowKey(e){
  if(e.key==="ArrowRight"){ e.preventDefault(); scrollBy(1); }
  if(e.key==="ArrowLeft"){  e.preventDefault(); scrollBy(-1); }
}

onMounted(()=>{
  if(row.value) row.value.scrollLeft = 0;
  computeStride(); updateArrows(); updateVisibleStep();
  if("ResizeObserver" in window){
    ro = new ResizeObserver(()=>{ computeStride(); updateArrows(); updateVisibleStep(); });
    ro.observe(row.value);
  }else{
    window.addEventListener("resize", computeStride, { passive:true });
    window.addEventListener("resize", ()=>{ updateArrows(); updateVisibleStep(); }, { passive:true });
  }
});
onBeforeUnmount(()=>{
  if(ro) ro.disconnect();
});
</script>

<style scoped>
.hiw-head{ max-width:1400px; margin:0 auto; padding:40px 5vw 24px; }
.hiw-title{ color:rgba(0,0,0,.85); font-family:Arboria-Bold,system-ui; font-size:clamp(28px,3.2vw,44px); line-height:1.2; margin:0 0 8px 0; }
.hiw-kicker{ color:rgba(0,0,0,.5); margin:0; font-family:Arboria-Light,system-ui; }

.hiw-band{ background:#341818; }
.hiw-container{ position:relative; max-width:1400px; margin:0 auto; padding:56px 5vw; overflow:visible; }

.hiw-row{
  --gap:24px; display:flex; gap:var(--gap);
  overflow-x:auto; overflow-y:visible;
  -ms-overflow-style:none; scrollbar-width:none;
  scroll-snap-type:x mandatory; scroll-behavior:smooth;
  padding:8px 0 4px; outline:none;
}
.hiw-row::-webkit-scrollbar{ display:none; }

.hiw-card{ flex:0 0 88%; scroll-snap-align:start; scroll-snap-stop:always; }
@media (min-width:640px){ .hiw-card{ flex-basis: calc((100% - var(--gap))/2); } }
@media (min-width:1024px){ .hiw-card{ flex-basis: calc((100% - (3*var(--gap)))/4); } }

.hiw-cardInner{
  background:#f7f9f6; border-radius:18px;
  box-shadow:0 6px 24px rgba(0,0,0,.18);
  padding:clamp(18px,2.2vw,28px); min-height:clamp(280px,36vw,420px);
  display:grid; grid-template-rows:auto auto 1fr; row-gap:clamp(8px,1vw,12px);
  transition:transform .18s ease, box-shadow .18s ease; position:relative; will-change:transform;
}
.hiw-cardInner:hover,.hiw-cardInner:focus-within{ transform:translateY(-4px); box-shadow:0 10px 28px rgba(0,0,0,.2); z-index:2; }

.hiw-num{ font-family:Arboria-Bold,system-ui; color:#341818; font-size:clamp(28px,3.2vw,44px); line-height:1; margin-bottom:clamp(6px,.6vw,8px); }
.hiw-cardTitle{ font-family:Arboria-Medium,system-ui; color:rgba(0,0,0,.86); font-size:clamp(18px,1.6vw,22px); line-height:1.25; margin:0 0 clamp(6px,.8vw,10px) 0; }
.hiw-desc{ color:rgba(0,0,0,.8); font-size:clamp(14px,1.2vw,16px); line-height:1.6; margin:0; }

.hiw-arrow{
  position:absolute; top:50%; transform:translateY(-50%);
  width:42px; height:42px; border:none; border-radius:999px;
  background:rgba(255,255,255,.2); color:#fff; font-size:24px; line-height:1;
  display:none; align-items:center; justify-content:center; cursor:pointer;
  backdrop-filter:saturate(120%) blur(2px);
  transition:background .18s ease, transform .18s ease, opacity .18s ease; z-index:1;
}
.hiw-arrow:hover{ background:rgba(255,255,255,.3); transform:translateY(-50%) scale(1.06); }
.hiw-arrow:disabled{ opacity:.35; cursor:default; }
.hiw-left{ left:.5rem; } .hiw-right{ right:.5rem; }
.hiw-arrow:focus-visible{ outline:3px solid #fff; outline-offset:2px; }
@media (min-width:1024px){ .hiw-arrow{ display:inline-flex; } }

/* contador só até 1023px */
.hiw-progress{
  position:absolute; right:5vw; top:16px;
  background:rgba(255,255,255,.18); color:#fff;
  padding:.35rem .55rem; border-radius:999px; font-size:12px;
  backdrop-filter:saturate(120%) blur(2px); display:inline-flex;
}
@media (min-width:1024px){ .hiw-progress{ display:none; } }

.hiw-row:focus-visible{ outline:2px solid #fff; outline-offset:6px; }

@media (prefers-reduced-motion: reduce){
  .hiw-row{ scroll-behavior:auto; }
  .hiw-arrow{ transition:none !important; }
}
</style>
