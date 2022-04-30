<template>
    <div class="WizardTab" :class="{'active': props.active}">
        <div class="WizardTab__top">
            <div class="WizardTab__title">{{props.title}}</div>
            <div class="WizardTab__price">{{numToPrice(tab_summary)}}</div>
        </div>
        <div class="WizardTab__content">
            <div class="WizardTab__left">
                <slot name="left"></slot>
            </div>
            <div class="WizardTab__separator"></div>
            <div class="WizardTab__right">
                <div v-for="(select, selectIndex) in props.select" :key="selectIndex" class="select-container">
                    <div>
                        <div class="select__title">{{select.title}}</div>
                        <select class="select" @change="selectChange($event.target.value, selectIndex)">
                            <option :value="i" v-for="(item, i) in select.items" :key="i">{{item.title}}</option>
                        </select>
                    </div>
                </div>
                <div v-if="props.options.length" class="checkboxes-container">
                    <div v-for="(checkbox, checkboxIndex) in props.options" :key="checkbox.title" class="checkbox-container" @click="updateOption(checkboxIndex)">
                        <div class="checkbox" :class="{'active': checkedOptions[checkboxIndex] !== undefined}"></div>
                        {{checkbox.title}}
                    </div>
                </div>
                <div class="btn WizardTab__choose" :class="{'active': props.active}" @click="emit('updateTab', {tab_summary: tab_summary})">{{props.active ? 'Выбрано' : 'Выбрать'}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import { numToPrice } from '@/helpers/index'

interface Option {
    title: string;
    price: number;
}
interface Select {
    title: string;
    items: Option[];
}
interface Props {
    active: boolean;
    title: string;
    price_default: number;
    options: Option[];
    select: Select[];
}
const props = defineProps<Props>()
const emit = defineEmits(['updateTab', 'updateTabSummary'])
const selectValues = ref<Record<string, number>>({})
function selectChange(value: string, index: number) {
    selectValues.value[index] = parseInt(value)
    if (!props.active) return
    emit('updateTabSummary', {tab_summary: tab_summary.value})
}
const checkedOptions = ref<Record<string, number>>({})
function updateOption(i: number) {
    checkedOptions.value[i] !== undefined ? delete checkedOptions.value[i] : checkedOptions.value[i] = i
    if (!props.active) return
    emit('updateTabSummary', {tab_summary: tab_summary.value})
}
const tab_summary = computed(() => {
    let summ = props.price_default

    for (const optionKey in checkedOptions.value) {
        const chosenOption = props.options[optionKey]
        summ += chosenOption.price
    }

    for (const selectKey in selectValues.value) {
        const itemKey = selectValues.value[selectKey]
        const selectedOption = props.select[selectKey].items[itemKey]
        summ += selectedOption.price
    }

    return summ
})
</script>

<style lang="scss" scoped>
.WizardTab {
    position: relative;
    background-color: rgba(0,0,0,.1);
    border-radius: 5px;
    padding: 10px 20px;
    overflow: hidden;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 5px;
        background-color: lightgrey;
    }
    &.active {
        &::before {
            background-color: #2fcb5a;
        }
    }
    &__top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1em;
    }
    &__title {
        font-weight: bold;
    }
    &__content {
        display: flex;
        gap: 10px;
    }
    &__left {
        width: 100%;
    }
    &__separator {
        width: 1px;
        background-color: grey;
    }
    &__right {
        width: 200px;
        flex-shrink: 0;
    }
    &__choose {
        margin-top: 10px;
        text-align: center;
        background-color: rgba(0,0,0,.1);
        color: black;
        &.active {
            background-color: #2fcb5a;
            color: white;
        }
    }
}
.checkboxes-container {
    display: grid;
    grid-gap: 10px;
}
.checkbox-container {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
}
.checkbox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 5px;
    width: 10px;
    height: 10px;
    &::after {
        content: '';
        position: absolute;
        width: 3px;
        height: 7px;
        transform: rotate(45deg) translateY(-3px);
        display: none;
        border: 2px solid black;
        border-left: none;
        border-top: none;
    }
    &.active {
        &::after {
            display: block;
        }
    }
}
.select-container {
    display: grid;
    grid-gap: 10px;
}
.select {
    width: 100%;
    padding: 5px;
    &__title {
        margin-bottom: 1em;
    }
}
</style>