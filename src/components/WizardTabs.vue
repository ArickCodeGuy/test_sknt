<template>
    <div class="WizardTabs">
        <WizardTab
            v-for="(variant, variantIndex) in props.tabs"
            :key="variantIndex"
            :title="variant.title"
            :price_default="variant.price_default"
            :options="variant.options"
            :select="variant.select"
            :active="activeTab === variantIndex"
            @updateTab="emit('updateActiveTab', {tab: variantIndex, ...$event})"
            @updateTabSummary="emit('updateActiveTabSummary', {tab: variantIndex, ...$event})"
        >
            <template #left>{{variant.description}}</template>
        </WizardTab>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import WizardTab from '@/components/WizardTab.vue'
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
interface Props {
    activeTab: boolean;
    tabs: WizardVariant[];
}
const props = defineProps<Props>()
const emit = defineEmits(['updateActiveTab', 'updateActiveTabSummary'])
</script>

<style lang="scss" scoped>
.WizardTabs {
    overflow: hidden;
    display: grid;
    grid-gap: 10px;
    max-height: 1000px;
}
</style>