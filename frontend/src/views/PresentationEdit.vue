<template>
    <section
        class="editor-section"
        :class="{ 'is-loading': loading }"
    >
        <Editor
            v-model="presentation.content"
            class="editor"
            :options="editorOptions"
            @update="onAutoSave"
        />
        <div class="bottom-information has-background-primary has-text-white">
            <div>
                <span>Last auto save: </span>
                <MomentsAgo :date="presentation.updatedAt" />
                <span
                    v-if="saving"
                    class="has-text-grey"
                >
                    – saving ...
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import PresentationService from '@/services/Presentation';
import Editor from '@/components/Editor';
import MomentsAgo from '@/components/MomentsAgo';
import Socket from '@/services/Socket';

export default {
    name: 'PresentationEdit',
    components: { Editor, MomentsAgo },
    data() {
        return {
            loading: false,
            saving: false,
            presentation: { content: 'Loading...', updatedAt: '' },
            originalContent: '',
            editorOptions: {
                mode: 'text/x-markdown',
                // theme: 'monokai',
                theme: 'hopscotch',
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
                this.originalContent = this.presentation.content;
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },
        async onAutoSave(content) {
            if (this.saving || this.originalContent === content) {
                return;
            }
            this.saving = true;
            try {
                const presentation = await PresentationService.update(this.presentation.key, { content });
                this.presentation = {
                    ...presentation,
                    content: this.presentation.content,
                };
                this.originalContent = content;
            } catch (error) {

            } finally {
                this.saving = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.editor-section {
    height: 100%;
    display: flex;
    flex-direction: column;

    .editor {
        flex-grow: 1;
    }

    .bottom-information {
        display: flex;
        position: sticky;
        bottom: 0;
        padding: 0.5rem 0.75rem;
        align-items: center;
        height: 4rem;
        z-index: 30;
    }
}
</style>
