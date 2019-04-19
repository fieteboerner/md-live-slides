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
                    <router-link
                        :to="{ name: 'presentations' }"
                        class="navbar-item"
                    >
                        + Presentation
                    </router-link>
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
    },
}
</script>


<style lang="scss">
@import "assets/scss/bulma/index.scss";

html, body {
    height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100%;

    .content {
        flex-grow: 1;
    }
}
</style>
