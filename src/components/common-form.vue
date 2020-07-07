<template>
    <form @submit.prevent="syncData">
        <slot :form_data="form_data"></slot>
    </form>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "CommonForm.vue",
        props: {
            url_for_load: String, //урл, по которому мы делаем запросы на получение данных на форму
            url_for_sync: String, //урл, по которому мы делаем запросы на изменения данных формы
            auto_load: { //если auto_load = true, при инициализации формы автоматически запрашиваем данные
                type: Boolean,
                default: false
            },
            auto_reload: {  //при auto_reload = true с изменением параметов запроса автоматически перезапрашиваем данные
                type: Boolean,
                default: false
            },
            external_filters: { //фильтры, приходящие извне
                type: Array,
                default: () => []
            },
            external_sorters: { //объекты сортировки, приходящие извне
                type: Array,
                default: () => []
            },
            external_pagination: {
                type: Object,
                default: () => { return {} }
            },
        },
        data() {
            return {
                //Данные формы, которые мы получаем по get-запросу, грузим на форму и используем/изменяем их в форме
                form_data: null,
                //Фильтры и сортировки, полученные изнутри при работе с формой
                internal_filters: [],
                internal_sorters: [],
                //Параметры пагинации
                internal_pagination: {},
                //Ошибки, полученные при валидации формы
                validation_errors: []
            }
        },
        computed: {
            //Вычисляемые свойства, определяющие все внешние и внутренние фильтры, сортировки, параметры, пагинацию
            all_filters() {
                return [...this.external_filters, ...this.internal_filters]
            },
            all_sorters() {
                return [...this.external_sorters, ...this.internal_sorters]
            },
            final_pagination() {
                return {...this.external_pagination, ...this.internal_pagination}
            },
            //Строка-url, в которую мы собираем все фильтры, сортировки, параметры в объект для load запроса
            final_url_for_load() {
                if (!this.url_for_load) return '';
                let final_url_for_load = [];

                if (this.all_filters.length) {
                    final_url_for_load.push(this.all_filters.reduce((sum, filter, index) => {
                        console.log(index);
                        return sum + filter.field + filter.operator + filter.value +
                            ((index !== this.all_filters.length - 1) ? '&' : '');
                    }, ''));
                }
                if (this.all_sorters.length) {
                    final_url_for_load.push(this.all_sorters.length ?
                        'sort=' + this.all_sorters.reduce((sum, sorter, index) => {
                            return sum + sorter.order + sorter.field +
                                ((index !== this.all_sorters.length - 1) ? ',' : '');
                        }, '') : '');
                }

                const final_pagination_keys = Object.keys(this.final_pagination);

                if (final_pagination_keys.length) {
                    final_url_for_load.push(final_pagination_keys.reduce((sum, page_param, index) => {
                        return sum + page_param + '=' + this.final_pagination[page_param] +
                            ((index !== final_pagination_keys.length - 1) ? '&' : '');
                    }, ''));
                }

                return final_url_for_load.length ? this.url_for_load + '?' + final_url_for_load.join('&')
                    : this.url_for_load;
            },
            //Все события, которые мы ловим у дочерних компонентов
            slot_handlers() {
                return {
                    'addFilters': this.addFilters,
                    'removeFilters': this.removeFilters,
                    'addSorters': this.addSorters,
                    'removeSorters': this.removeSorters,
                    'changePagination': this.changePagination
                }
            }
        },
        watch: {
            async final_url_for_load(data) {
                if (this.auto_reload) await this.getData(data)
            },
        },
        async mounted() {
            this.$on('addFilters', this.addFilters);
            if (this.auto_load) await this.getData(this.final_url_for_load)
        },
        methods: {
            syncData(data, type) {
                if (this.validateData) {
                    const result = this.validateData(data);
                    if (result.type === 'error') {
                        this.validation_errors = result.errors;
                        return;
                    }
                }
                switch (type) {
                    case 'create':
                        this.putData(data)
                        break;
                    case 'update':
                        this.postData(data)
                        break;
                }
            },
            async putData(data) {
                return await this.sendRequest('put', this.url_for_sync, {...data})
            },
            async postData(data) {
                return await this.sendRequest('post', this.url_for_sync, {...data})
            },
            async getData(data) {
                return await this.sendRequest('get', this.final_url_for_load, {...data})
            },
            async sendRequest(method, url, params, callback) {
                return await axios({
                    method, url, params }
                ).then(response => {
                    if (response.status === 200) {
                        try {
                           if (callback) callback(response);
                        } catch (ex) {
                            let message = ex.message;
                            if (ex.stack) {
                                message += '\n' + ex.stack;
                            }
                            alert(message);
                        }
                    }
                }).catch(function (ex) {
                    let message = ex.message;
                    if (ex.stack) {
                        message += '\n' + ex.stack;
                    }
                    alert(message);
                })
            },
            addFilters(filters) {
                console.log(filters);
                this.internal_filters = [...this.internal_filters, ...filters]
            },
            removeFilters(filters) {
                this.internal_filters = this.internal_filters.filter(filter => !filters.includes(filter));
            },
            addSorters(sorters) {
                this.internal_sorters = [...this.internal_sorters, ...sorters]
            },
            removeSorters(sorters) {
                this.internal_sorters = this.internal_sorters.filter(sorter => !sorters.includes(sorter));
            },
            changePagination(pagination) {
                this.internal_pagination = {...this.internal_pagination, ...pagination}
            },

        }
    }
</script>

<style scoped>

</style>
