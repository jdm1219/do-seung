<template>
    <div>
        +{{ gap + 1 }}일 째 열애중♥
    </div>
</template>


<script>
export default {
    name: 'CountDown',
    data() {
        return {
            gap: null
        }
    },
    created() {
        var now = new Date();
        var then = new Date("June 12,2018");
        var gap = now.getTime() - then.getTime() ;
        gap = Math.floor(gap / (1000 * 60 * 60 * 24));
        this.gap = gap;
    }
}
</script>
