<template>
  <!-- MOBILE / TABLET -->
  <v-carousel
    v-if="$vuetify.display.xs || $vuetify.display.sm || $vuetify.display.md"
    dark
    height="90%"
    cycle
    :show-arrows="false"
    hide-delimiters
    hide-delimiter-background
  >
    <template v-for="(item, index) in carouselItems" :key="`m-${index}`">
      <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1">
        <v-row class="flex-nowrap" style="height: 100%; margin: 0 -22px">
          <template v-for="(n, i) in columns" :key="`m-col-${index}-${i}`">
            <template v-if="+index + i < carouselItems.length">
              <v-col>
                <v-sheet
                  class="carouselItem"
                  style="background-color: #EFEFEF"
                  @click="openDialog(carouselItems[+index + i])"
                >
                  <v-img
                    height="60%"
                    :src="carouselItems[+index + i].image"
                    :alt="carouselItems[+index + i].description"
                    cover
                  />
                  <h4 class="ci-title">
                    {{ carouselItems[+index + i].description }}
                  </h4>
                </v-sheet>
              </v-col>
            </template>
          </template>
        </v-row>
      </v-carousel-item>
    </template>

    <ImageModal
      v-if="dialog"
      :value="dialog"
      :src="imgModal"
      @input="closeDialog"
      width="670px"
    />
  </v-carousel>

  <!-- DESKTOP -->
  <v-carousel
    v-else
    height="90%"
    cycle
    hide-delimiters
    hide-delimiter-background
    show-arrows="hover"
  >
    <template v-for="(item, index) in carouselItems" :key="`d-${index}`">
      <v-carousel-item
        style="background-color: #EFEFEF"
        v-if="(index + 1) % columns === 1 || columns === 1"
      >
        <v-row class="flex-nowrap" style="height: 100%; margin: 0 -22px">
          <template v-for="(n, i) in columns" :key="`d-col-${index}-${i}`">
            <template v-if="+index + i < carouselItems.length">
              <v-col>
                <v-sheet
                  class="carouselItem"
                  style="background-color: #EFEFEF"
                  @click="openDialog(carouselItems[+index + i])"
                >
                  <v-img
                    height="60%"
                    :src="carouselItems[+index + i].image"
                    :alt="carouselItems[+index + i].description"
                    cover
                  />
                  <h4 class="ci-title">
                    {{ carouselItems[+index + i].description }}
                  </h4>
                </v-sheet>
              </v-col>
            </template>
          </template>
        </v-row>
      </v-carousel-item>
    </template>

    <ImageModal
      v-if="dialog"
      :value="dialog"
      :src="imgModal"
      @input="closeDialog"
      width="670px"
    />
  </v-carousel>
</template>

<script>
import ImageModal from "@/views/Home/Components/Carousel/ImageModal";

// ✅ importe as imagens com ?url (Vite gera a URL correta no build)
import img1  from "@/assets/carousel/image1.png?url";
import img2  from "@/assets/carousel/image2.png?url";
import img3  from "@/assets/carousel/image3.png?url";
import img4  from "@/assets/carousel/image4.png?url";
import img5  from "@/assets/carousel/image5.png?url";
import img6  from "@/assets/carousel/image6.png?url";
import img7  from "@/assets/carousel/image7.png?url";
import img8  from "@/assets/carousel/image8.png?url";
import img9  from "@/assets/carousel/image9.png?url";
import img10 from "@/assets/carousel/image10.png?url";
import img11 from "@/assets/carousel/image11.png?url";
import img12 from "@/assets/carousel/image12.png?url";

export default {
  name: "Home",
  components: { ImageModal },

  data() {
    return {
      carouselItems: [
        { image: img1,  description: ""  },
        { image: img2,  description: ""  },
        { image: img3,  description: ""  },
        { image: img4,  description: ""  },
        { image: img5,  description: ""  },
        { image: img9,  description: ""  },
        { image: img6,  description: ""  },
        { image: img7,  description: ""  },
        { image: img8,  description: ""  },
        { image: img10, description: "" },
        { image: img11, description: "" },
        { image: img12, description: "" },
      ],
      dialog: false,
      imgModal: "",
      actionsWidth: 100,
    };
  },

  computed: {
    columns() {
      if (this.$vuetify.display.xs) return 1;
      if (this.$vuetify.display.mdAndDown) return 2;
      return 3;
    },
  },

  methods: {
    closeDialog() {
      this.dialog = false;
    },
    openDialog(item) {
      this.dialog = true;
      this.imgModal = item.image;
    },
  },

  mounted() {
    const actionSlots = this.$refs?.actionSlot;
    if (actionSlots && actionSlots.length) {
      const actionSlot = actionSlots[0];
      this.actionsWidth = actionSlot.offsetWidth;
    }
  },
};
</script>

<style scoped>
.carouselItem {
  margin-right: 10px;
  margin-left: 10px;
  height: 60vh;
  cursor: pointer;
}

.ci-title {
  height: 15vh;
  font-size: 15px;
  font-family: Arboria-Light;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.6);
}

@media (min-width: 768px) {
  .ci-title {
    font-size: 24px;
    margin-top: 14px;
  }
}
</style>
