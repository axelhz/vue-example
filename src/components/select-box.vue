<template>
    <div class="select" v-click-outside="closeBox">
        <div :class="[input_class, 'select-input']" @click="show_box = !show_box">
            <span :class=" !current_value ? 'placeholder' : ''">{{current_value ? current_value : placeholder}}</span>
            <div :class="['select-expander', show_box ? 'expanded' : '']"></div>
        </div>
        <div class="select-box" :class="input_class" v-if="show_box">
            <div :class="[value === current_value ? 'active' : '', 'select-option']" v-for="(value, i) in values"
                 :key="i" @click="changeValue(value)">{{value}}</div>
        </div>
    </div>
</template>

<script>
    import ClickOutside from '@/common/click-outside';

    export default {
        name: "select-box",
        directives: {ClickOutside},
        props: ['input_class', 'values', 'default_value', 'placeholder'],
        data() {
            return {
                current_value: null,
                show_box: false
            }
        },
        mounted() {
            if (this.default_value) {
                if (this.values.find(el => el === this.default_value)) this.current_value = this.default_value;
            }
        },
        methods: {
            changeValue(value) {
                if (value === this.current_value) {
                    this.$emit('selectValue', null);
                    this.current_value = null;
                    this.show_box = false;
                } else {
                    this.$emit('selectValue', value);
                    this.current_value = value;
                    this.show_box = false;
                }
            },
            closeBox() {
                this.show_box = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .select {
        position: relative;
        width: 100%;
        height: 100%;
        &-input {
            width: 100%;
            height: 100%;
            position: relative;
            padding: 2px 20px 2px 5px;

            .placeholder {
                font-weight: bold;
                font-size: 0.9rem;
                opacity: 0.3;
            }
        }
        &-expander {
            position: absolute;
            right: 4%;
            top: calc(50% - 3.5px);
            width: 0px;
            height: 0px;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 7px solid black;
            border-bottom: none;

            &.expanded {
                border-bottom: 7px solid black;
                border-top: none;
            }
        }
        &-box {
            width: 100%;
            position: absolute;
            background: white;
            z-index: 2;
        }
        &-option {
            padding: 2px 0px 2px 5px;
            font-weight: normal;
            &:not(:last-child) {
                border-bottom: 1px solid black;
            }

            &.active {
                background: rgba(0, 0, 0, 0.3);
            }
        }
    }
</style>