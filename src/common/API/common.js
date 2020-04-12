import Vue from "vue";

export async function getData(model, default_data) {
    try {
        if (Vue.localStorage) {
            if (Vue.localStorage.get('vue_example_' + model )) {
                return JSON.parse(Vue.localStorage.get('vue_example_' + model));
            } else {
                Vue.localStorage.set('vue_example_' + model, JSON.stringify(default_data));
                return default_data;
            }
        } else throw new Error('localStorage не найден!')
    } catch(err) {
        throw new Error(err);
    }
}

export function setData(model, data) {
    try {
        if (Vue.localStorage) {
            Vue.localStorage.set('vue_example_' + model, JSON.stringify(data));
            return data;
        } else throw new Error('localStorage не найден!')
    } catch(err) {
        throw new Error(err);
    }
}


