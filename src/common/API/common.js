import Vue from "vue";

function immitateDelay(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    })
}

export async function getData(model, default_data) {
    await immitateDelay(100);
    if (Vue.localStorage) {
        if (Vue.localStorage.get('vue_example_' + model )) {
            return JSON.parse(Vue.localStorage.get('vue_example_' + model));
        } else {
            Vue.localStorage.set('vue_example_' + model, JSON.stringify(default_data));
            return default_data;
        }
    } else throw new Error('localStorage не найден!')
}

export async function setData(model, data) {
    await immitateDelay(250);
    if (Vue.localStorage) {
        Vue.localStorage.set('vue_example_' + model, JSON.stringify(data));
        return data;
    } else throw new Error('localStorage не найден!')
}


