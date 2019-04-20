<template>
    <section
        class="editor-section"
        :class="{ 'is-loading': loading }"
    >
        <Editor
            v-model="presentation.content"
            class="editor"
            :options="editorOptions"
        />
    </section>
</template>

<script>
import PresentationService from '@/services/Presentation';
import Editor from '@/components/Editor';

export default {
    name: 'PresentationEdit',
    components: { Editor },
    data() {
        return {
            loading: false,
            presentation: { content: 'Loading...' },
            editorOptions: {
                mode: 'text/x-markdown',
                theme: 'monokai',
                styleActiveLine: true,
                lineNumbers: true,
            },
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.loading = true;
            try {
                this.presentation = await PresentationService.get(this.$route.params.id);
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.editor-section,
.editor {
    height: 100%;
}
</style>
