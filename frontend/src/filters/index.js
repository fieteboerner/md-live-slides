import Vue from 'vue';

import DateFilters from './date';

Vue.filter('date', DateFilters.date);
Vue.filter('dateTime', DateFilters.dateTime);
Vue.filter('time', DateFilters.time);
Vue.filter('fromNow', DateFilters.fromNow);