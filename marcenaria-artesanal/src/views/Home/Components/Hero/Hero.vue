<template>
  <!-- MOBILE -->
  <div
    v-if="$vuetify.display.xs || $vuetify.display.sm || $vuetify.display.md"
    class="hero-container"
  >
    <div class="hero-topshade" aria-hidden="true"></div>

    <v-card style="z-index: 400">
      <div class="hero-nav-container">
        <!-- Hambúrguer -->
        <button
          v-if="!drawer"
          class="burger-btn"
          @click="drawer = true"
          aria-label="Abrir menu"
        >
          <font-awesome-icon :icon="['fas','fa-bars']" class="burger-ico" />
        </button>

        <!-- Fechar -->
        <button
          v-else
          class="close-fab-btn"
          @click="drawer = false"
          aria-label="Fechar menu"
        >
          <font-awesome-icon :icon="['fas','fa-x']" class="close-fab-ico" />
        </button>

        <v-navigation-drawer
          location="right"
          v-model="drawer"
          width="250"
          style="z-index: 500; background-color: rgba(17, 16, 16, 0.95)"
          class="hero-mobile-menu"
        >
          <div class="menuContainer">
            <div class="containerIcons">
              <div v-for="(item, index) in linkIcons" :key="index">
                <a :href="item.ref" target="_blank" rel="noopener">
                  <font-awesome-icon
                    :icon="item.icon"
                    class="footer-social-icons icons"
                  />
                </a>
              </div>
            </div>

            <div class="listContainer">
              <ul>
                <li
                  class="hero-items"
                  v-for="(item, index) in menuMobile"
                  :key="index"
                >
                  <button
                    class="menuButtons"
                    @click="scrollToDrawer(item.anchor)"
                  >
                    {{ item.tab }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </v-navigation-drawer>

        <img :src="logo" class="hero-nav-icon-desktop" />
      </div>
    </v-card>

    <img :src="logo" class="hero-logo-mobile" />
  </div>

  <!-- DESKTOP / TABLET -->
  <div
    v-else
    class="headerContainer"
    :style="{ backgroundImage: `url(${heroBackground})` }"
  >
    <div class="hero-topshade" aria-hidden="true"></div>

    <div>
      <nav class="navContainer">
        <v-img
          :src="logo"
          alt="Marcenaria artesanal logo"
          class="logo"
          max-width="200px"
          min-width="150px"
        />
        <TabsNavegation :tabs="tabs" class="tabStyle" />
      </nav>
    </div>

    <div class="titleContainer">
      <div class="titleContent">
        <div
          class="separator"
          :style="{ borderBottom: `2px groove ${sloganColor}` }"
        />
        <div class="text-no-wrap">
          <h1 :style="{ color: sloganColor }">
            MARCENARIA <span>ARTESANAL</span>
          </h1>
        </div>
        <div
          class="separator"
          :style="{ borderBottom: `2px groove ${sloganColor}` }"
        />
      </div>

      <div class="portfolioTabs">
        <TabCards
          :tabs="portifolioTabs"
          @background="changeBackground"
          @slogan="changeSlogan"
          @hovering="hovering"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TabCards from "@/views/Home/Components/Tabs/TabCards";
import TabsNavegation from "@/components/Tabs/TabsNavegation";

export default {
  name: "Hero",
  components: { TabsNavegation, TabCards },
  data() {
    return {
      menuOpen: false,
      windowWidth: window.innerWidth,
      logo: `${new URL("@/assets/images/logo.svg", import.meta.url)}`,
      // DESKTOP TABS
      tabs: [
        { name: "HISTÓRIA",      anchor: "#history" },
        { name: "COMO FUNCIONA", anchor: "#how-it-works" }, // novo
        { name: "CONTATO",       anchor: "#contact" },
        { name: "PROJETOS",      anchor: "#portifolio" },
      ],
      // Cards do hero
      portifolioTabs: [
        {
          name: "cardSala",
          title: "DESIGN",
          text: "Pensamos em todos os detalhes para trazer o melhor design dentro do seu ambiente.",
          anchor: "#contact",
          card: false,
          background: `${new URL("@/assets/heroCards/a-13-1920x1080.webp", import.meta.url)}`,
          active: false,
          slogan: "white",
        },
        {
          name: "cardQuarto",
          title: "BELEZA",
          text: "Produtos de alta qualidade que conjugam tecnologia de ponta e rigor artesanal.",
          anchor: "#contact",
          card: false,
          background: `${new URL("@/assets/heroCards/a-28-1920x1080.webp", import.meta.url)}`,
          active: false,
          slogan: "white",
        },
        {
          name: "cardCozinha",
          title: "SENTIDO",
          text: "Trazendo a elegância de sua essência para dentro projeto.",
          anchor: "#contact",
          card: false,
          background: `${new URL("@/assets/heroCards/background2.WebP", import.meta.url)}`,
          active: false,
          slogan: "white",
        },
      ],
      // MOBILE MENU
      drawer: null,
      menuMobile: [
        { tab: "HOME",          anchor: "hero" },
        { tab: "HISTÓRIA",      anchor: "history" },
        { tab: "COMO FUNCIONA", anchor: "how-it-works" }, // novo
        { tab: "CONTATO",       anchor: "contact" },
        { tab: "PROJETOS",      anchor: "portifolio" },
      ],
      // BG hero
      heroBackground: `${new URL("../../../../assets/heroCards/a-28-1920x1080.webp", import.meta.url)}`,
      hovering: false,
      linkIcons: [
        { ref: "https://pt-br.facebook.com/marcenariartesanal/", icon: ["fab", "fa-facebook-f"] },
        { ref: "https://www.instagram.com/marcenariaartesanal/?hl=en", icon: ["fab", "fa-instagram"] },
        { ref: "https://wa.me/message/YRG5PWGMPL73G1", icon: ["fab", "fa-whatsapp"] },
      ],
      sloganColor: "white",
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() { this.windowWidth = window.innerWidth; },
    scrollToDrawer(section) {
      this.drawer = false;
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    scrollTo(section) {
      this.drawer = false;
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    changeBackground(background) { this.heroBackground = background; },
    changeSlogan(color) { this.sloganColor = color; },
  },
};
</script>

<style scoped>
/* ===== Contraste topo ===== */
.hero-container,
.headerContainer { --topshade-a: 0.38; }

.hero-topshade{
  position:absolute; top:0; left:0; right:0; height:24vh;
  background:linear-gradient(to bottom,
    rgba(0,0,0,var(--topshade-a)) 0%,
    rgba(0,0,0,calc(var(--topshade-a) - .12)) 55%,
    rgba(0,0,0,0) 100%);
  pointer-events:none; z-index:0;
}
.hero-container, .headerContainer { position:relative; }
.hero-container>*:not(.hero-topshade),
.headerContainer>*:not(.hero-topshade){ position:relative; z-index:1; }

.logo { filter: drop-shadow(0 2px 10px rgba(0,0,0,.55)); }
.tabStyle, .tabStyle * { text-shadow: 0 1px 10px rgba(0,0,0,.55); }

/* ===== Mobile ===== */
.hero-container{
  height:100vh;
  background:url("../../../../assets/heroCards/a-28-1920x1080.webp") no-repeat center/cover;
}
.hero-logo-mobile{
  position:absolute; top:44vh; left:50%; transform:translateX(-50%);
  width:clamp(260px,70vw,560px); height:auto; z-index:10;
}

/* ===== Desktop ===== */
.headerContainer{
  display:flex; flex-flow:column nowrap; justify-content:space-between;
  height:100vh; transition: background-image .5s ease-in-out;
  background-repeat:no-repeat; background-position:center; background-attachment:fixed; background-size:cover;
}
.logo{ width:clamp(150px,12vw,200px); height:auto; }

.titleContent div>h1{
  text-shadow:
    0 2px 12px rgba(0,0,0,.45),
    -1px 0 0 rgba(0,0,0,.70), 1px 0 0 rgba(0,0,0,.70),
     0 -1px 0 rgba(0,0,0,.70), 0 1px 0 rgba(0,0,0,.70),
    -1px -1px 0 rgba(0,0,0,.70), 1px 1px 0 rgba(0,0,0,.70),
    -1px  1px 0 rgba(0,0,0,.70), 1px -1px 0 rgba(0,0,0,.70);
}
.titleContent div>h1>span{ opacity:.8; }

/* ===== Botões mobile ===== */
.burger-btn{
  position:fixed; right:16px; bottom:16px; width:44px; height:44px;
  display:inline-flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,.42);
  backdrop-filter:blur(8px) saturate(120%);
  -webkit-backdrop-filter:blur(8px) saturate(120%);
  border:1px solid rgba(255,255,255,.18);
  border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.28);
  cursor:pointer; z-index:700;
  transition: transform .15s ease, background .2s ease, box-shadow .2s ease;
}
.burger-btn:hover{ transform:translateY(-1px); background:rgba(0,0,0,.5); }
.burger-btn:focus-visible{ outline:2px solid rgba(255,255,255,.75); outline-offset:2px; }
.burger-ico{ width:20px; height:20px; color:#fff; filter: drop-shadow(0 2px 6px rgba(0,0,0,.45)); }

.close-fab-btn{
  position:fixed; right:16px; bottom:16px; width:44px; height:44px;
  display:inline-flex; align-items:center; justify-content:center;
  background:transparent; border:none; cursor:pointer; z-index:1001;
}
.close-fab-ico{ width:22px; height:22px; color:#fff; filter: drop-shadow(0 2px 8px rgba(0,0,0,.6)); }

.hero-open-menu-icon-mobile,
.hero-close-menu-icon-mobile{ all:unset; }

/* ===== Layout geral ===== */
.hero-mobile-menu{ position:fixed; top:0; right:0; background:#341818; opacity:.95; height:100vh; z-index:500; }
.hero-nav-items{ padding:90px 0 0; color:#fff; display:flex; flex-wrap:wrap; align-items:center; justify-content:center; list-style:none; margin-top:3em; }
.hero-nav-items li{ width:60vw; height:70px; padding-left:40px; text-align:left; font-family:Arboria-Medium; font-size:20px; line-height:70px; }
.hero-nav-icon-desktop{ display:none; }

@media (min-width:1200px){
  .burger-btn, .close-fab-btn{ display:none; }
}

.headerContainer nav{ display:flex; justify-content:space-between; margin:0 auto; max-width:1300px; height:20vh; }
.tabStyle{ display:flex; justify-content:flex-end; align-items:center; }
.logo{ display:flex; align-items:center; justify-content:flex-start; }

.titleContainer{
  box-sizing:border-box; display:flex; flex-flow:column nowrap; justify-content:flex-end; align-items:center;
  height:40vh; max-width:90em; margin:0 auto;
}
.titleContent{ display:flex; justify-content:center; flex-flow:row nowrap; width:100%; }
.separator{ border-bottom:2px groove white; margin:0 21px 17px; width:100%; box-sizing:border-box; }
.portfolioTabs{ width:100%; color:white; display:flex; justify-content:space-around; }
.menuButtons{ cursor:pointer; font-family:Arboria-Light; }
.menuButtons:focus{ background-color:rgba(255,255,255,.38); border:1px solid white; transition:.5s; }
.containerIcons{ display:flex; justify-content:space-between; width:170px; margin:3em auto 0; }
.footer-social-icons{ color:#fff; border:1px solid #fff; border-radius:50%; padding:8px; height:18px; width:20px; }
.menuContainer{ display:flex; flex-flow:column nowrap; height:100%; }
.navContainer{ padding:0 4em; }
.hero-items{ margin:2em 0; color:white; list-style:none; }
.hero-items:focus{ background-color:rgba(255,255,255,.15); transition:.7s; }
.listContainer{ margin-top:calc(50vh - 219px); display:flex; justify-content:center; text-align:center; align-items:center; }
.icons:hover{ background-color:rgba(255,255,255,.15); transition:.7s; }
.icons:focus{ padding:0; background-color:rgba(255,255,255,.15); transition:.7s; }
.background-filter{ background-color:black; z-index:999 !important; }

/* ===== Tabs (DESKTOP) — remover quadrado/overlay e clarear texto ===== */
/* 1) zera opacidades internas do Vuetify */
.tabStyle :deep(.v-tab),
.tabStyle :deep(.v-btn){
  --v-hover-opacity: 0 !important;
  --v-activated-opacity: 0 !important;
  --v-pressed-opacity: 0 !important;
}
/* 2) remove overlays/underlays/slider e bgs de containers */
.tabStyle :deep(.v-btn__overlay),
.tabStyle :deep(.v-btn__underlay),
.tabStyle :deep(.v-tab__slider),
.tabStyle :deep(.v-tabs),
.tabStyle :deep(.v-slide-group),
.tabStyle :deep(.v-slide-group__container),
.tabStyle :deep(.v-slide-group__content){
  background: transparent !important;
  box-shadow: none !important;
}
/* 3) wrappers <ul>/<li> que possam pintar bg no hover */
.tabStyle :deep(ul),
.tabStyle :deep(li),
.tabStyle :deep(li:hover),
.tabStyle :deep(li:focus),
.tabStyle :deep(li:active){
  background: transparent !important;
  box-shadow: none !important;
}
/* 4) âncoras/botões crus */
.tabStyle :deep(a),
.tabStyle :deep(button),
.tabStyle :deep(a:hover),
.tabStyle :deep(button:hover){
  background: transparent !important;
  box-shadow: none !important;
}
/* Estado base: texto levemente menos branco */
.tabStyle :deep(.v-tab),
.tabStyle :deep(.v-btn.v-btn--variant-text),
.tabStyle :deep(.v-tab__content),
.tabStyle :deep(.v-btn__content),
.tabStyle :deep(a),
.tabStyle :deep(button){
  color: rgba(255,255,255,.78) !important;
  transition: color .18s ease;
}
/* Hover: só o texto clareia (inclui conteúdo interno) */
.tabStyle :deep(.v-tab:hover),
.tabStyle :deep(.v-btn.v-btn--variant-text:hover),
.tabStyle :deep(.v-tab:hover .v-tab__content),
.tabStyle :deep(.v-btn.v-btn--variant-text:hover .v-btn__content),
.tabStyle :deep(a:hover),
.tabStyle :deep(button:hover){
  color: rgba(255,255,255,.96) !important;
}
/* Ativo/selecionado: branco total e sem fundo */
.tabStyle :deep(.v-tab--selected),
.tabStyle :deep(.v-tab--selected .v-tab__content),
.tabStyle :deep(.v-btn--active),
.tabStyle :deep(.v-btn--active .v-btn__content),
.tabStyle :deep(.router-link-active){
  color: #fff !important;
  background: transparent !important;
  box-shadow: none !important;
}
/* Foco acessível no texto */
.tabStyle :deep(.v-tab:focus-visible),
.tabStyle :deep(.v-btn.v-btn--variant-text:focus-visible),
.tabStyle :deep(a:focus-visible),
.tabStyle :deep(button:focus-visible){
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* ===== reforço final: clarear qualquer filho no hover (catch-all) ===== */
.tabStyle :deep(.v-tab:hover *),
.tabStyle :deep(.v-btn.v-btn--variant-text:hover *),
.tabStyle :deep(a:hover *),
.tabStyle :deep(button:hover *){
  color: rgba(255,255,255,.96) !important;
  -webkit-text-fill-color: rgba(255,255,255,.96) !important; /* Safari */
}
/* caso use rótulos próprios */
.tabStyle :deep(.tab-label),
.tabStyle :deep(.tab-title){ transition: color .18s ease; }
.tabStyle :deep(.v-tab:hover .tab-label),
.tabStyle :deep(.v-tab:hover .tab-title),
.tabStyle :deep(.v-btn:hover .tab-label),
.tabStyle :deep(.v-btn:hover .tab-title){
  color: rgba(255,255,255,.96) !important;
}
</style>
