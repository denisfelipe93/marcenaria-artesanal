<template>
  <!-- MOBILE -->
  <div
    v-if="$vuetify.display.xs || $vuetify.display.sm || $vuetify.display.md"
    class="hero-container"
  >
    <!-- camada glass cobrindo todo o hero -->
    <div class="hero-glass" aria-hidden="true"></div>

    <v-card style="z-index: 400">
      <div class="hero-nav-container">
        <font-awesome-icon
          :icon="['fas', 'fa-bars']"
          class="hero-open-menu-icon-mobile"
          @click="drawer = !drawer"
        />
        <v-navigation-drawer
          location="right"
          v-model="drawer"
          width="250"
          style="z-index: 100; background-color: rgba(17, 16, 16, 0.95)"
          class="hero-mobile-menu"
        >
          <font-awesome-icon
            :icon="['fas', 'fa-x']"
            class="hero-close-menu-icon-mobile"
            @click="drawer = !drawer"
          />
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
    <!-- camada glass cobrindo todo o hero -->
    <div class="hero-glass" aria-hidden="true"></div>

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
      logo: `${new URL("@/assets/images/logo.WebP", import.meta.url)}`,
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
            "@/assets/heroCards/a-13-1920x1080.webp", // DESIGN
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
            "@/assets/heroCards/a-28-1920x1080.webp", // BELEZA
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
            "@/assets/heroCards/background2.WebP", // SENTIDO
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
        "../../../../assets/heroCards/a-28-1920x1080.webp", // padrão do Hero (desktop)
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
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    scrollToDrawer(section) {
      this.drawer = !this.drawer;
      const element = document.getElementById(section);
      element.scrollIntoView({ behavior: "smooth" });
    },
    scrollTo(section) {
      this.drawer = !this.drawer;
      const element = document.getElementById(section);
      element.scrollIntoView({ behavior: "smooth" });
    },
    changeBackground(background) {
      this.heroBackground = background;
    },
    changeSlogan(color) {
      this.sloganColor = color;
    },
  },
};
</script>

<style lang="css" scoped>
/* ===========================
   Ajuste fino do efeito glass
   =========================== */
:root{
  --glass-alpha: 0.18; /* opacidade do escurecimento (0.12–0.28)  */
  --glass-blur:  6px;  /* intensidade do blur (4–10px)           */
}

.hero-glass{
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,var(--glass-alpha)); /* leve escurecido para garantir contraste */
  backdrop-filter: blur(var(--glass-blur)) saturate(120%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(120%);
  pointer-events: none; /* não bloqueia clique/hover */
  z-index: 0;
}

/* garantir que conteúdo fique acima do glass */
.headerContainer, .hero-container { position: relative; }
.headerContainer > *:not(.hero-glass),
.hero-container > *:not(.hero-glass){ position: relative; z-index: 1; }

/* ====== MOBILE ====== */
.hero-container {
  height: 100vh;
  background: url("../../../../assets/heroCards/a-28-1920x1080.webp") no-repeat center;
  background-size: cover;
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

/* ====== Destaque APENAS nas letras do H1 (mantido do seu código) ====== */
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

/* ====== Restante do seu CSS original ====== */
.hero-open-menu-icon-mobile {
  cursor: pointer;
  height: 25px;
  color: rgba(255, 255, 255, 0.66);
  background-color: rgba(128, 128, 128, 0.29);
  border-radius: 3px;
  padding: 0.1em;
  position: fixed;
  right: 25px;
  bottom: 25px;
}
.hero-open-menu-icon-mobile:hover { transition: 0.7s; background-color: rgba(0, 0, 0, 0.57); }
.hero-open-menu-icon-mobile:focus { transition: 0.7s; background-color: rgba(0, 0, 0, 0.57); }

.hero-close-menu-icon-mobile {
  cursor: pointer;
  height: 23px;
  color: rgba(255, 255, 255, 0.66);
  position: fixed;
  right: 28px;
  bottom: 25px;
  z-index: 21;
}
.hero-close-menu-icon-mobile:hover { transition: 0.7s; background-color: rgba(255, 255, 255, 0.15); }
.hero-close-menu-icon-mobile:focus { transition: 0.7s; background-color: rgba(255, 255, 255, 0.15); }

.hero-mobile-menu { position: fixed; top: 0; right: 0; background-color: #341818; opacity: 0.95; height: 100vh; z-index: 20; }
.hero-nav-items { padding: 90px 0 0; color: white; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; list-style: none; margin-top: 3em; }
.hero-nav-items li { width: 60vw; height: 70px; padding-left: 40px; text-align: left; font-family: Arboria-Medium; font-size: 20px; line-height: 70px; }
.hero-nav-icon-desktop { display: none; }
.hero-logo-mobile { position: absolute; top: 40vh; left: calc(50vw - 158px); z-index: 10; }

@media (min-width: 1200px) { .hero-open-menu-icon-mobile { display: none; } }
.headerContainer nav { display: flex; justify-content: space-between; margin: 0 auto; max-width: 1300px; height: 20vh; }
.tabStyle { display: flex; justify-content: flex-end; align-items: center; }
.logo     { display: flex; align-items: center; justify-content: flex-start; }
.titleContainer { box-sizing: border-box; display: flex; flex-flow: column nowrap; justify-content: flex-end; align-items: center; height: 40vh; max-width: 90em; margin: 0 auto; }
.titleContent { display: flex; justify-content: center; flex-flow: row nowrap; width: 100%; }
.separator { border-bottom: 2px groove white; box-sizing: border-box; margin-bottom: 17px; margin-right: 21px; margin-left: 21px; width: 100%; }
.contactContainer { margin: 0; padding: 0; width: 100%; }
.portfolioTabs { padding: 0; margin: 0; box-sizing: border-box; width: 100%; color: white; height: 100%; display: flex; flex-wrap: nowrap; justify-content: space-around; }
.menuButtons { cursor: pointer; font-family: Arboria-Light; }
.menuButtons:focus {
  transition: 0.5s;
  background-color: rgba(255, 255, 255, 0.38);
  border: 1px solid white;
}
.containerIcons { display: flex; flex-flow: row nowrap; justify-content: space-between; width: 170px; margin: 0 auto; margin-top: 3em; }
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
