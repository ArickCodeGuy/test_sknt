<template>
    <div id="app">
        <div class="container">
            <template v-for="(step, stepIndex) in wizardDataArray" :key="stepIndex">
                <div class="heading">{{step.title}}</div>
                <WizardTabs
                    v-show="stepIndex === activeStep"
                    :tabs="step.variants"
                    :activeTab="step.activeTab"
                    @updateActiveTab="updateActiveTab({step: stepIndex, ...$event})"
                    @updateActiveTabSummary="updateActiveTabSummary({step: stepIndex, ...$event})"
                />
            </template>
            <div class="btns">
                <button v-if="activeStep !== 0" class="btn" @click="activeStep--">Назад</button>
            </div>
            <div class="btn summary"><span>Итого к оплате:</span> <span>{{numToPrice(summary)}}</span></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import WizardTabs from '@/components/WizardTabs.vue'
import { numToPrice } from '@/helpers/index'
import data from '@/data.json'

interface Option {
    title: string;
    price: number;
}
interface Select {
    title: string;
    items: Option[];
}
interface WizardVariant {
    title: string;
    description: string;
    color: string;
    price_default: number;
    options: Option[];
    select: Select[];
}
interface WizardData {
    title: string;
    activeTab: number;
    variants: WizardVariant[];
}
const wizardDataArray = ref<WizardData[]>(data)
const activeStep = ref<number>(0)
const stepsSumm = ref<Record<string, number>>({})
const summary = computed(() => {
    let summ = 0
    for (const stepKey in stepsSumm.value) {
        summ += stepsSumm.value[stepKey]
    }
    return summ
})
function updateActiveTab({ step, tab, tab_summary }: {step: number, tab: number, tab_summary: number}) {
    const stepToActivate = wizardDataArray.value[step]
    stepToActivate.activeTab = tab
    stepsSumm.value[step] = tab_summary
    if (activeStep.value === wizardDataArray.value.length - 1) {
        // Для рендера до алерта
        setTimeout(() => alert('Done'), 0)
        return
    }
    activeStep.value++
}
function updateActiveTabSummary({ step, tab_summary }: {step: number, tab_summary: number}) {
    console.log(arguments)
    stepsSumm.value[step] = tab_summary
}
</script>

<style lang="scss">
body {
    margin: 0;
    font-family: 'Arial';
}
.container {
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
}
.heading {
    &:first-child {
        margin-top: 0;
        &::after {
            display: none;
        }
    }
    position: relative;
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 1.5em;
    margin-bottom: 1em;
    &::after {
        content: '';
        position: absolute;
        display: block;
        top: -0.5em;
        width: 100%;
        height: 1px;
        background-color: lightgrey;
    }
}
.btns {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}
.btn {
    padding: 10px;
    min-width: 150px;
    border: none;
    background-color: #2fcb5a;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}
.summary {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    margin-top: 20px;
}
</style>