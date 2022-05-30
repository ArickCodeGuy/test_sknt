<template>
    <div id="app">
        <section class="section">
            <div class="container">
                <template v-for="(item, item_index) in cart.data" :key="item_index">
                    <div class="heading">{{item.title}}</div>
                    <transition name="WizardTabs">
                        <div
                            v-show="item_index === activeStep"
                            class="WizardTabs"
                        >
                            <WizardTab
                                v-for="(variant, variant_index) in item.variants"
                                :class="{'active': item.active_variant === variant_index}"
                                :key="variant_index"
                                :title="variant.title"
                                :price_default="variant.price_default"
                                :options="variant.options"
                                :select="variant.select"
                                :active="item.active_variant === variant_index"
                                @option_change="cart.changeOption({item_index, variant_index, option_index: $event})"
                                @select_change="cart.changeSelect({item_index, variant_index, ...$event})"
                                @choose_variant="choose_variant({item_index, variant_index})"
                            >
                                <template #left>{{variant.description}}</template>
                            </WizardTab>
                        </div>
                    </transition>
                </template>
                <div class="btns">
                    <button :disabled="activeStep === 0" class="btn" @click="activeStep--">Назад</button>
                </div>
                <div class="btn summary"><span>Итого к оплате:</span> <span>{{numToPrice(cart.summary)}}</span></div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WizardTab from '@/components/WizardTab.vue'
// import WizardTabs from '@/components/WizardTabs.vue'
import { numToPrice } from '@/helpers/index'

import { useCart } from '@/store/index'
const cart = useCart()

const activeStep = ref<number>(0)

function choose_variant(args: { item_index: number, variant_index: number}) {
    cart.changeTab(args)
    activeStep.value++
}
</script>

<style lang="scss">
body {
    margin: 0;
    font-family: 'Arial';
    font-size: 11px;
    @media (min-width: 768px) {
        font-size: 14px;
    }
}
.section {
    margin-top: 40px;
    margin-bottom: 40px;
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
    transition: .3s;
    &:disabled {
        filter: grayscale(1);
        cursor: auto;
    }
    &:hover, &.active {
        background-color: #2fcb5a;
        color: #ffffff;
    }
}
.summary {
    cursor: auto;
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    text-transform: uppercase;
    margin-top: 20px;
}
.WizardTabs-enter-active,
.WizardTabs-leave-active {
    transition: .5s;
}
.WizardTabs-enter-active {
    transition-delay: .5s;
}
.WizardTabs-enter-from,
.WizardTabs-leave-to {
    max-height: 0 !important;
}
.WizardTabs {
    overflow: hidden;
    display: grid;
    grid-gap: 10px;
    max-height: 1000px;
}
</style>