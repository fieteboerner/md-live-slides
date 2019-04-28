<template>
    <section
        class="section"
        :class="{ 'is-loading': loading }"
    >
        <div class="container">
            <h1 class="title is-1">
                Presentations
            </h1>

            <table
                v-if="loading || presentations.length"
                class="table is-striped"
            >
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Created At</td>
                        <td>Last Update</td>
                        <td />
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="presentation in presentations"
                        :key="presentation.key"
                    >
                        <td>{{ presentation.title }}</td>
                        <td>{{ presentation.createdAt | dateTime }}</td>
                        <td>
                            <MomentsAgo :date="presentation.updatedAt" />
                        </td>
                        <td>
                            <div class="action-buttons is-pulled-right">
                                <router-link
                                    :to="getEditRoute(presentation)"
                                    class="button is-primary"
                                >
                                    Edit
                                </router-link>
                                <router-link
                                    :to="getShowRoute(presentation)"
                                    class="button is-secondary"
                                >
                                    Show
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="has-text-centered">
                <h3 class="title is-3">
                    There are no Presentations yet
                </h3>
                <button class="button is-primary" @click="onCreatePresentation">
                    Create your first
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import MomentsAgo from '@/components/MomentsAgo';
import PresentationService from '@/services/Presentation';

export default {
    name: 'PresentationList',
    components: { MomentsAgo },
    data() {
        return {
            loading: false,
            presentations: [],
        };
    },
    async created() {
        this.loading = true;
        try {
            this.presentations = await PresentationService.list();
        } catch (error) {

        } finally {
            this.loading = false;
        }
    },
    methods: {
        async onCreatePresentation() {
            const presentation = await PresentationService.create();

            this.$router.push({
                name: 'presentation.edit',
                params: { id: presentation.key },
            });
        },
        getEditRoute(presentation) {
            return {
                name: 'presentation.edit',
                params: { id: presentation.key },
            };
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
.action-buttons .button:nth-child(n+2) {
    margin-left: 0.5em;
}
</style>
