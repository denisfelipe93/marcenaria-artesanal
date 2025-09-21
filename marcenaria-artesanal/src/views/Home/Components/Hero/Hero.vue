<template>
  <!-- MOBILE -->
  <div
    v-if="$vuetify.display.xs || $vuetify.display.sm || $vuetify.display.md"
    class="hero-container"
  >
    <!-- Degradê no topo para dar contraste ao logo/navbar -->
    <div class="hero-topshade" aria-hidden="true"></div>

    <v-card style="z-index: 400">
      <div class="hero-nav-container">
        <!-- BOTÃO HAMBÚRGUER (preto + blur) -->
        <button
          v-if="!drawer"
          class="burger-btn"
          @click="drawer = true"
          aria-label="Abrir menu"
        >
          <font-awesome-icon :icon="['fas','fa-bars']" class="burger-ico" />
        </button>

        <!-- BOTÃO FECHAR (X no MESMO lugar, sem círculo) -->
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
                <a :href="item.ref">
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

        <!-- (mantido) -->
        <img :src="logo" class="hero-nav-icon-desktop" />
      </div>
    </v-card>

    <!-- LOGO MOBILE (maior) -->
    <img :src="logo" class="hero-logo-mobile" />
  </div>

  <!-- DESKTOP / TABLET -->
  <div
    v-else
    class="headerContainer"
    :style="{ backgroundImage: `url(${heroBackground})` }"
  >
    <!-- Degradê no topo para dar contraste ao logo/navbar -->
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
      tabs: [
        { name: "HISTÓRIA", anchor: "#history" },
        { name: "PROJETOS", anchor: "#portifolio" },
        { name: "CONTATO",  anchor: "#contact" },
      ],
      portifolioTabs: [
        {
          name: "cardSala",
          title: "DESIGN",
          text: "Pensamos em todos os detalhes para trazer o melhor design dentro do seu ambiente.",
          anchor: "#contact",
          card: false,
          background: `${new URL(
            "@/assets/heroCards/a-13-1920x1080.webp",
            import.meta.url
          )}`,
          active: false,
          slogan: "white",
        },
        {
          name: "cardQuarto",
          title: "BELEZA",
          text: "Produtos de alta qualidade que conjugam tecnologia de ponta e rigor artesanal.",
          anchor: "#contact",
          card: false,
          background: `${new URL(
            "@/assets/heroCards/a-28-1920x1080.webp",
            import.meta.url
          )}`,
          active: false,
          slogan: "white",
        },
        {
          name: "cardCozinha",
          title: "SENTIDO",
          text: "Trazendo a elegância de sua essência para dentro projeto.",
          anchor: "#contact",
          card: false,
          background: `${new URL(
            "@/assets/heroCards/background2.WebP",
            import.meta.url
          )}`,
          active: false,
          slogan: "white",
        },
      ],
      drawer: null,
      menuMobile: [
        { tab: "HOME",     anchor: "hero" },
        { tab: "HISTÓRIA", anchor: "history" },
        { tab: "CONTATO",  anchor: "contact" },
        { tab: "PROJETOS", anchor: "portifolio" },
      ],
      heroBackground: `${new URL(
        "../../../../assets/heroCards/a-28-1920x1080.webp",
        import.meta.url
      )}`,
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
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() { this.windowWidth = window.innerWidth; },
    scrollToDrawer(section) {
      this.drawer = false;
      const element = document.getElementById(section);
      element.scrollIntoView({ behavior: "smooth" });
    },
    scrollTo(section) {
      this.drawer = false;
      const element = document.getElementById(section);
      element.scrollIntoView({ behavior: "smooth" });
    },
    changeBackground(background) { this.heroBackground = background; },
    changeSlogan(color) { this.sloganColor = color; },
  },
};
</script>

<style lang="css" scoped>
/* ===========================
   CONTRASTE do topo do hero
   =========================== */
.hero-container,
.headerContainer { --topshade-a: 0.38; }  /* 0.30–0.50 */

.hero-topshade{
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 24vh;              /* faixa de contraste do topo */
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,var(--topshade-a)) 0%,
    rgba(0,0,0,calc(var(--topshade-a) - 0.12)) 55%,
    rgba(0,0,0,0) 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* conteúdo acima do degradê */
.hero-container, .headerContainer { position: relative; }
.hero-container > *:not(.hero-topshade),
.headerContainer > *:not(.hero-topshade) { position: relative; z-index: 1; }

/* reforço sutil de leitura (não muda layout) */
.logo { filter: drop-shadow(0 2px 10px rgba(0,0,0,.55)); }
.tabStyle, .tabStyle * { text-shadow: 0 1px 10px rgba(0,0,0,.55); }

/* ====== MOBILE ====== */
.hero-container {
  height: 100vh;
  background: url("../../../../assets/heroCards/a-28-1920x1080.webp") no-repeat center;
  background-size: cover;
}

/* LOGO MOBILE — MAIOR (responsivo) */
.hero-logo-mobile {
  position: absolute;
  top: 44vh;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(220px, 60vw, 420px);
  height: auto;
  z-index: 10;
}

/* ====== DESKTOP ====== */
.headerContainer {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background-image 0.5s ease-in-out;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}

/* tamanho do LOGO no DESKTOP */
.logo {
  width: clamp(150px, 12vw, 200px);
  height: auto;
}

/* ====== Destaque do título ====== */
.titleContent div > h1 {
  text-shadow:
    0 2px 12px rgba(0,0,0,.45),
    -1px 0 0 rgba(0,0,0,.70),
     1px 0 0 rgba(0,0,0,.70),
     0 -1px 0 rgba(0,0,0,.70),
     0  1px 0 rgba(0,0,0,.70),
    -1px -1px 0 rgba(0,0,0,.70),
     1px  1px 0 rgba(0,0,0,.70),
    -1px  1px 0 rgba(0,0,0,.70),
     1px -1px 0 rgba(0,0,0,.70);
}
.titleContent div > h1 > span { opacity: 0.8; }

/* ====== BOTÕES (MOBILE) ====== */
/* Hambúrguer — fundo PRETO + blur (discreto, não circularzão) */
.burger-btn{
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: rgba(0,0,0,0.42);      /* preto translúcido */
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 12px;                /* levemente quadrado */
  box-shadow: 0 6px 18px rgba(0,0,0,0.28);

  cursor: pointer;
  z-index: 700; /* abaixo do X (que fica 1001), acima do hero */
  transition: transform .15s ease, background .2s ease, box-shadow .2s ease;
}
.burger-btn:hover{ transform: translateY(-1px); background: rgba(0,0,0,0.5); }
.burger-btn:active{ transform: translateY(0); }
.burger-btn:focus-visible{
  outline: 2px solid rgba(255,255,255,0.75);
  outline-offset: 2px;
}
.burger-ico{
  width: 20px;
  height: 20px;
  color: #fff;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.45));
}

/* X — MESMA POSIÇÃO do hambúrguer, SEM círculo/fundo */
.close-fab-btn{
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: transparent;  /* sem círculo */
  border: none;
  cursor: pointer;
  z-index: 1001;            /* acima do drawer */
}
.close-fab-ico{
  width: 22px;
  height: 22px;
  color: #fff;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,.6)); /* dá legibilidade sem fundo */
}

/* Limpamos estilos antigos que poderiam conflitar */
.hero-open-menu-icon-mobile,
.hero-close-menu-icon-mobile{ all: unset; }

/* ====== resto do seu CSS ====== */
.hero-mobile-menu { position: fixed; top: 0; right: 0; background-color: #341818; opacity: 0.95; height: 100vh; z-index: 500; }
.hero-nav-items { padding: 90px 0 0; color: white; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; list-style: none; margin-top: 3em; }
.hero-nav-items li { width: 60vw; height: 70px; padding-left: 40px; text-align: left; font-family: Arboria-Medium; font-size: 20px; line-height: 70px; }
.hero-nav-icon-desktop { display: none; }

@media (min-width: 1200px) {
  .burger-btn, .close-fab-btn{ display: none; } /* botões só no mobile */
}

.headerContainer nav { display: flex; justify-content: space-between; margin: 0 auto; max-width: 1300px; height: 20vh; }
.tabStyle { display: flex; justify-content: flex-end; align-items: center; }
.logo     { display: flex; align-items: center; justify-content: flex-start; }

.titleContainer {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 40vh;
  max-width: 90em;
  margin: 0 auto;
}
.titleContent { display: flex; justify-content: center; flex-flow: row nowrap; width: 100%; }
.separator {
  border-bottom: 2px groove white;
  box-sizing: border-box;
  margin-bottom: 17px;
  margin-right: 21px;
  margin-left: 21px;
  width: 100%;
}
.contactContainer { margin: 0; padding: 0; width: 100%; }
.portfolioTabs {
  padding: 0; margin: 0; box-sizing: border-box; width: 100%; color: white; height: 100%;
  display: flex; flex-wrap: nowrap; justify-content: space-around;
}
.menuButtons { cursor: pointer; font-family: Arboria-Light; }
.menuButtons:focus {
  transition: 0.5s;
  background-color: rgba(255, 255, 255, 0.38);
  border: 1px solid white;
}
.containerIcons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 170px;
  margin: 0 auto;
  margin-top: 3em;
}
.footer-social-icons { color: #fff; border: 1px solid #fff; border-radius: 50%; padding: 8px 8px; height: 18px; width: 20px; margin-right: 0; }
.menuContainer { display: flex; flex-flow: column nowrap; height: 100%; }
.navContainer { padding-left: 4em; padding-right: 4em; }
.hero-items { margin: 2em 0; color: white; list-style: none; }
.hero-items:focus { transition: 0.7s; background-color: rgba(255,255,255,0.15); }
.listContainer { margin-top: calc(50vh - 219px); display: flex; justify-content: center; text-align: center; align-items: center; }
.icons:hover { transition: 0.7s; background-color: rgba(255, 255, 255, 0.15); }
.icons:focus { transition: 0.7s; padding: 0; background-color: rgba(255, 255, 255, 0.15); }
.background-filter { background-color: black; z-index: 999 !important; }
</style>
