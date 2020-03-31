<template>
    <div v-if="isShow">
        <p>y-test</p>
    </div>
</template>

<script>
export default {
    props: {
        isShow: Boolean
    }
};
</script>
