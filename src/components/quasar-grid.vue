<template>
    <div class="grid-wrapper">
       <div class="grid-header">
           Ребята и их профессии
       </div>
        <div class="grid-body">
            <div class="q-pa-md">
                <div class="filters-wrapper">
                    <div class="filters-column">
                        <div class="q-gutter-sm">
                            <q-radio v-model="mode" val="simple" label="Обычный" dense></q-radio>
                            <q-radio v-model="mode" val="best" label="Лучший" dense></q-radio>
                        </div>
                        <div class="q-select-wrapper">
                            <label class="q-select-label">Имя:</label>
                            <q-select outlined :options="selects.names" dense :value="filters.name"
                                @input="changeNameFilter">
                                <template v-slot:prepend>

                                </template>
                            </q-select>
                        </div>
                    </div>
                    <div class="filters-column">
                        <div class="q-select-wrapper">
                            <label class="q-select-label">Страна:</label>
                            <q-select outlined v-model="filters.country" :options="selects.countries" dense
                                @click="changeCountryFilter">
                                <template v-slot:prepend>

                                </template>
                            </q-select>
                        </div>
                        <div class="q-select-wrapper">
                            <label class="q-select-label">Спец-ть:</label>
                            <q-select outlined v-model="filters.speciality" :options="selects.specialities" dense
                                @click="changeSpecialityFilter">
                                <template v-slot:prepend>

                                </template>
                            </q-select>
                        </div>
                    </div>
                    <div class="filters-column">
                        <div class="q-select-wrapper">
                            <label class="q-select-label">Хобби:</label>
                            <q-select outlined v-model="filters.hobby" :options="selects.hobbies" dense
                                @click="changeHobbyFilter">
                                <template v-slot:prepend>

                                </template>
                            </q-select>
                        </div>
                    </div>
                </div>
                <q-table
                        :data="filtered_data"
                        :columns="columns"
                        row-key="id"
                        dark
                        v-if="data"
                        :pagination.sync="pagination"
                        no-data-label="Таких ребят нет">
                    <template v-slot:body-cell-date="props">
                        <q-td :props="props">
                            <div class="cell-tick">{{props.row.date}}</div>
                        </q-td>
                    </template>
                </q-table>
            </div>
        </div>
        <div class="grid-footer">
            <button @click="$emit('closeQuasarGrid')">OK</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "quasar-grid",
        components: {},
        props: ['form_data'],
        data() {
            return {
                mode: 'simple',
                pagination: {
                    page: 1,
                },
                columns: [
                    {name: 'id', label: 'ID', field: 'id', sortable: true, required: true},
                    {name: 'name', label: 'Имя', field: 'name', sortable: true},
                    {name: 'age', label: 'Возраст', field: 'age', sortable: true},
                    {name: 'country', label: 'Страна', field: 'country', sortable: true},
                    {name: 'speciality', label: 'Специальность',  align: 'center', field: 'speciality', sortable: true},
                    {name: 'hobby', label: 'Хобби', field: 'hobby', sortable: true},
                    {name: 'date', label: 'Дата', field: 'date', align: 'center', sortable: true},
                ],
                filters: {
                    name: 'Все',
                    country: 'Все',
                    speciality: 'Все',
                    hobby: 'Все'
                },
                selects: {
                    names: ['Все'],
                    countries: ['Все'],
                    specialities: ['Все'],
                    hobbies: ['Все']
                }
            }
        },
        watch: {
            filtered_data() {
                this.pagination.page = 1;
            }
        },
        computed: {
            data() {
                if (!this.form_data) return null;
                return Array.isArray(this.form_data) ? [...this.form_data] : {...this.form_data}
            },
            filtered_data() {
                if (!this.data) return null;
                return this.data.filter((elem) =>
                    (this.filters.name === 'Все' || elem.name === this.filters.name) &&
                    (this.filters.speciality === 'Все' || elem.speciality === this.filters.speciality) &&
                    (this.filters.country === 'Все' || elem.country === this.filters.country) &&
                    (this.filters.hobby === 'Все' || elem.hobby === this.filters.hobby))
            },
        },
        mounted() {
            // axios
            //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            //     .then(response => (this.info = response));
            //axios.get('/back/send/', {...tosend});

            const countries = ['США', 'Канада', 'Россия'],
                names = ['Петя', 'Саша', 'Дима', 'Андрей', 'Никита', 'Стас'],
                specialities = ['Программист', 'Ювелир', 'Пупер', 'Спортсмен'],
                hobbies = ['Рыбалка', 'Фитнес', 'Охота', 'Ютуб', 'Бары'],
                formatter = new Intl.DateTimeFormat('ru');

            setTimeout(() => {
                let data = [];
                for (let i = 0; i < 100; i++) {
                    const obj = {
                        id: i+1,
                        country: countries[Math.floor(Math.random() * 3)],
                        name: names[Math.floor(Math.random() * 6)],
                        speciality: specialities[Math.floor(Math.random() * 4)],
                        hobby: hobbies[Math.floor(Math.random() * 5)],
                        age: Math.floor(Math.random() * 50),
                        date: formatter.format(new Date(Math.floor(Math.random() * 1590801700000)))
                    };
                    data.push(obj);
                    if (!this.selects.names.includes(obj.name)) this.selects.names.push(obj.name);
                    if (!this.selects.countries.includes(obj.country)) this.selects.countries.push(obj.country);
                    if (!this.selects.specialities.includes(obj.speciality)) this.selects.specialities.push(obj.speciality);
                    if (!this.selects.hobbies.includes(obj.hobby)) this.selects.hobbies.push(obj.hobby);
                }
                this.data = data;
            }, 500)
        },
        methods: {
            changeNameFilter(value) {
                this.filters.name = value;
               // this.$parent.internal_filters.push({field: 'name', operator: '=', value})
                this.$parent.$emit('addFilters', [{field: 'name', operator: '=', value}])
            },
            changeCountryFilter(value) {
                this.filters.country = value;
            },
            changeSpecialityFilter(value) {
                this.filters.speciality = value;
            },
            changeHobbyFilter(value) {
                this.filters.hobby = value;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .grid-wrapper {
        width: calc(100vw - 60px);
        position: absolute;
        top: 3%;
        z-index: 999999;
        background: grey;
    }

    .q-pa-md {
       max-height: calc(100vh - 3%);
    }

    .q-select-wrapper {
        display: flex;
        align-items: center;

        .q-field {
            flex: 1;
            margin-bottom: 10px;

            &__marginal {
                min-height: auto;
                max-height: 30px;
            }

        }

        .q-select-label {
            margin-right: 5px;
            width: 60px;
        }
    }

    .filters-column {
        margin-right: 20px;
        width: 15%;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }

    .filters-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }

    .cell-tick {
        background: url('../images/icons/success.png') no-repeat center;
        background-size: contain;
        height: 100%;
    }

</style>