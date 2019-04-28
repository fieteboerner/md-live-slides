<template>
    <section
        class="editor-section"
        :class="{ 'is-loading': loading }"
    >
        <ErrorMessage v-if="error" class="section error-message">
            <p>{{ error }}</p>
            <router-link :to="{ name: 'presentations' }">
                Go back to List
            </router-link>
        </ErrorMessage>
        <Editor
            v-else
            class="editor"
            :options="editorOptions"
            :socket-options="socketOptions"
        />
        <div class="bottom-information has-background-primary has-text-white">
            <template v-if="!error">
                <span>Created: </span>
                <MomentsAgo :date="presentation.createdAt" />

                <span class="preview-link">
                    <router-link :to="getShowRoute(presentation)" target="_blank">
                        Show Presentation
                    </router-link>
                </span>
            </template>
        </div>
    </section>
</template>

<script>
import PresentationService from '@/services/Presentation';
import Editor from '@/components/Editor';
import MomentsAgo from '@/components/MomentsAgo';
import ErrorMessage from '@/components/ErrorMessage';

export default {
    name: 'PresentationEdit',
    components: { Editor, ErrorMessage, MomentsAgo },
    data() {
        return {
            loading: false,
            error: '',
            presentation: { content: 'Loading...', createdAt: '' },
            originalContent: '',
            editorOptions: {
                mode: 'text/x-markdown',
                // theme: 'monokai',
                theme: 'hopscotch',
                styleActiveLine: true,
                lineNumbers: true,
            },
            socketOptions: {
                path: '/api/socket/document',
                query: { docId: this.$route.params.id },
            },
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.loading = true;
            this.error = '';
            try {
                this.presentation = await PresentationService.get(this.$route.params.id);
                this.originalContent = this.presentation.content;
            } catch ({ response }) {
                if(response.status === 404) {
                    this.error = 'Presentation could not be found';
                }
            } finally {
                this.loading = false;
            }
        },
        getShowRoute(presentation) {
            return {
                name: 'presentation.show',
                params: { id: presentation.key },
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.error-message {
    height: 100%;
}

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

        .preview-link {
            margin-left: 1em;
        }
    }
}
</style>
