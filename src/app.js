import Vue from 'vue'
import app from './app.vue'
import value from './test'


console.log('why');
console.log(value);


const main = new Vue({
    el: '#index-app',
    render: function (h) {
        return h(app);
    }
});