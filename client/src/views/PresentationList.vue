<template>
    <section
        class="section"
        :class="{ 'is-loading': loading }"
    >
        <div class="container">
            <h1 class="title">
                Presentations
            </h1>

            <table class="table is-striped">
                <thead>
                    <tr>
                        <td>Presentation Id</td>
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
                        <td>{{ presentation.key }}</td>
                        <td>{{ presentation.createdAt | dateTime }}</td>
                        <td>{{ presentation.updatedAt | fromNow }}</td>
                        <td>
                            <div class="action-buttons is-pulled-right">
                                <router-link
                                    :to="getEditRoute(presentation)"
                                    class="button is-primary"
                                >
                                    Edit
                                </router-link>
                                <button class="button is-secondary">
                                    Show
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import PresentationService from '@/services/Presentation';

export default {
    name: 'PresentationList',
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
        getEditRoute(presentation) {
            return {
                name: 'presentation.edit',
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

