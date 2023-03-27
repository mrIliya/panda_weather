<script setup>
const emits = defineEmits(['closeModal', 'confirmDeleting'])

const closeModalHandler = () => {
    emits('closeModal', true)
}

const confirmHandler = () => {
    emits('confirmDeleting', true)
}
</script>
<template>
    <div class="modal">
        <div class="modal__content">
            <button @click="closeModalHandler()" class="modal__close">
                close
            </button>
            <h3 class="modal__text">confirm or cancel <br> removal </h3>
            <div class="modal__buttons">
                <button class="modal__btn" @click="confirmHandler()">
                    confirm
                </button>
                <button class="modal__btn" @click="closeModalHandler()">
                    cancel
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
