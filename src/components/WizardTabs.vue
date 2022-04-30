<template>
    <div class="WizardTabs">
        <WizardTab
            v-for="(variant, j) in props.tabs"
            :key="j"
            :title="variant.title"
            :price_default="variant.price_default"
            :options="variant.options"
            :select="variant.select"
            :active="activeTab === j"
            @updateTab="emit('updateActiveTab', {tab: j, ...$event})"
            @updateTabSummary="emit('updateActiveTabSummary', {tab: j, ...$event})"
        >
            <template #left>{{variant.description}}</template>
        </WizardTab>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import WizardTab from '@/components/WizardTab.vue'
interface Props {
    activeTab: boolean;
    tabs: Array;
}
const props = defineProps<Props>()
const emit = defineEmits(['updateActiveTab', 'updateActiveTabSummary'])
</script>

<style lang="scss" scoped>
.WizardTabs {
    display: grid;
    grid-gap: 10px;
}
</style>