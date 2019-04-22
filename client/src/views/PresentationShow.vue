<template>
    <section
        v-if="loading"
        class="section is-loading"
    />
</template>

<script>
import 'remark/src/remark';
import PresentationService from '@/services/Presentation';

export default {
    name: 'PresentationShow',
    data() {
        return {
            loading: false,
            presentation: {},
            instance: null,
        };
    },
    async created() {
        this.loading = true;
        try {
            this.presentation = await PresentationService.get(this.$route.params.id);
        } catch (error) {

        } finally {
            this.loading = false;
        }
        // init remark after the is loading state was handled by vue in the dom
        // after the remark init the vue dom reactivity is broken
        this.$nextTick(() => this.initRemark());
    },
    methods: {
        initRemark() {
            this.instance = window.remark.create({
                source: this.presentation.content,
                highlightStyle: 'monokai',
                highlightLanguage: 'remark',
                highlightLines: true,
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


