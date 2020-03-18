import Vue from "vue";

export function getData(model, default_data) {
    return new Promise(resolve => {
        if (Vue.localStorage) {
            if (Vue.localStorage.get('vue_example_' + model )) {
                resolve(JSON.parse(Vue.localStorage.get('vue_example_' + model)));
            } else {
                Vue.localStorage.set('vue_example_' + model, JSON.stringify(default_data));
                resolve(default_data);
            }
        } else throw new Error('localStorage не найден!')
    })
}

export function setData(model, data) {
    return new Promise(resolve => {
        if (Vue.localStorage) {
            Vue.localStorage.set('vue_example_' + model, JSON.stringify(data));
            resolve(data);
        } else throw new Error('localStorage не найден!')
    })
}


