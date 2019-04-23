<template>
    <div id="app">
        <nav
            class="navbar"
            role="navigation"
            aria-label="main navigation"
        >
            <div
                v-click-outside="onHideMenu"
                class="navbar-brand"
            >
                <router-link
                    :to="{ name: 'home' }"
                    class="navbar-item"
                >
                    Home
                </router-link>

                <a
                    role="button"
                    class="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    @click="menuOpen = !menuOpen"
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>

            <div
                id="navbarBasicExample"
                class="navbar-menu"
                :class="{ 'is-active': menuOpen }"
            >
                <div class="navbar-start">
                    <router-link
                        :to="{ name: 'presentations' }"
                        class="navbar-item"
                    >
                        Presentations
                    </router-link>
                </div>

                <div class="navbar-end">
                    <a
                        class="navbar-item"
                        @click.prevent="onCreatePresentation"
                    >
                        + Presentation
                    </a>
                </div>
            </div>
        </nav>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
import ClickOutside from 'v-click-outside'
import PresentationService from '@/services/Presentation';

export default {
    name: 'App',
    directives: {
        ClickOutside: ClickOutside.directive,
    },
    data() {
        return {
            menuOpen: false,
        };
    },
    methods: {
        onHideMenu() {
            this.menuOpen = false;
        },
        async onCreatePresentation() {
            const presentation = await PresentationService.create();

            this.$router.push({
                name: 'presentation.edit',
                params: { id: presentation.key },
            });
        }
    },
}
</script>


<style lang="scss">
@import "../assets/scss/bulma/index.scss";

#app {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .navbar {
        position: sticky;
        top: 0;
        z-index: 30;
    }

    .content {
        flex-grow: 1;
    }
}
</style>
