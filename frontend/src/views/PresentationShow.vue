<template>
    <section v-if="loading || error" class="section" :class="{ 'is-loading': loading }">
        <ErrorMessage v-if="error">
            <p>{{ error }}</p>
            <router-link :to="{ name: 'presentations' }">
                Go back to List
            </router-link>
        </ErrorMessage>
    </section>
</template>

<script>
import 'remark/src/remark';
import PresentationService from '@/services/Presentation';
import ErrorMessage from '@/components/ErrorMessage';

export default {
    name: 'PresentationShow',
    components: { ErrorMessage },
    data() {
        return {
            loading: false,
            error: '',
            presentation: {},
            instance: null,
        };
    },
    async created() {
        this.loading = true;
        this.error = '';
        try {
            this.presentation = await PresentationService.get(this.$route.params.id);
        } catch ({ response }) {
            if(response.status === 404) {
                this.error = 'Presentation could not be found';
            }
        } finally {
            this.loading = false;
        }

        if (this.presentation.key) {
            // init remark after the is loading state was handled by vue in the dom
            // after the remark init the vue dom reactivity is broken
            this.$nextTick(() => this.initRemark());
        }
    },
    methods: {
        initRemark() {
            this.instance = window.remark.create({
                source: this.presentation.content,
                highlightStyle: 'monokai',
                highlightLanguage: 'remark',
                highlightLines: true,
                navigation: {
                    scroll: false,
                },
            });
        }
    }
};
</script>

<!-- global styling (theme) from remark -->
<style lang="scss">
@import "../assets/scss/remark/index.scss";
</style>

<style lang="scss" scoped>
.section {
    margin-top: 6rem;
}
</style>


