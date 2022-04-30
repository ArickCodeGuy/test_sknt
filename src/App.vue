<template>
    <div id="app">
        <div class="container">
            <template v-for="(step, stepIndex) in wizardData" :key="stepIndex">
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
            <div class="btn summary">Итого: {{summary}}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import WizardTabs from '@/components/WizardTabs.vue'
import data from '@/data.json'

const wizardData = ref<Array>(data)
const activeStep = ref<number>(0)
interface Dictionary<T> {
    [index: string]: T;
}
const stepsSumm = ref<Dictionary<number>>({})
const summary = computed(() => {
    let summ = 0
    for (const stepKey in stepsSumm.value) {
        summ += stepsSumm.value[stepKey]
    }
    return summ
})
function updateActiveTab({step, tab, tab_summary}) {
    const stepToActivate = wizardData.value[step]
    stepToActivate.activeTab = tab
    console.log(stepToActivate)
    stepsSumm.value[step] = tab_summary
    if (activeStep.value === wizardData.value.length - 1) {
        // Для рендера до алерта
        setTimeout(() => alert('Done'), 0)
        return
    }
    activeStep.value++
}
function updateActiveTabSummary({step, tab_summary}) {
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
    &:first-child {margin-top: 0;}
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 1.5em;
    margin-bottom: 1em;
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
    background-color: lightgreen;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}
.summary {
    margin-top: 20px;
}
</style>