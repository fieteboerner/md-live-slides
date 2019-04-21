import Vue from 'vue';
import Router from 'vue-router';
import Page from './views/Page.vue';
import Home from './views/Home.vue';
import PresentationList from './views/PresentationList.vue';
import PresentationEdit from './views/PresentationEdit.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            component: Page,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home,
                },
                {
                    path: '/presentations',
                    name: 'presentations',
                    component: PresentationList,
                },
                {
                    path: '/presentation/:id',
                    name: 'presentation.edit',
                    component: PresentationEdit,
                },
            ],
        },
    ],
});
