<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    dark
    temporary
  >
    <v-list>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        :href="link.href"
        @click="onClick($event, link)"
      >
        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    // mapGetters,
    mapMutations,
  } from 'vuex'

  export default {
    name: 'CoreDrawer',

    computed: {
      // ...mapGetters(['links']),
        links() {
            return [
                {
                    "text": "Sign Up",
                    "href": "#!"
                },
                {
                    "text": "Login In",
                    "href": "/login"
                }
            ]
        },
      drawer: {
        get () {
          return this.$store.state.pathes.drawer
        },
        set (val) {
          this.setDrawer(val)
        },
      },
    },

    methods: {
      ...mapMutations("pathes", ['setDrawer']),
      onClick (e, item) {
        e.stopPropagation();

        if (item.to === '/') {
          this.$vuetify.goTo(0);
          this.setDrawer(false);
          return
        }

        if (item.to || !item.href) return;

        this.$vuetify.goTo(item.href);
        this.setDrawer(false)
      },
    },
  }
</script>
