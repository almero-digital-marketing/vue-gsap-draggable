<template>
    <div class="scrubber" ref="scrubber" :class="{ 
        dragging, 
        rotation: type.indexOf('rotation') > -1, 
        horizontal: type.indexOf('x') > -1,
        vertical: type.indexOf('y') > -1,
    }">
        <div class="handle" ref="handle">
            <slot :progress="progress" :dragging="dragging" :velocity="velocity"></slot>
        </div>
    </div>
</template>
<script setup>

import { ref, computed, toRefs, onMounted, onBeforeUnmount, watch } from 'vue'
import draggable from '../lib/draggable'
import debounce from 'debounce'

const emit = defineEmits(['update:modelValue', 'click', 'drag', 'dragEnd', 'dragStart', 'lockAxis', 'move', 'press', 'pressInit', 'release', 'throw', 'throwComplete', 'throwUpdate'])
const props = defineProps({
    name: {
        type: String
    },
    activeCursor: {
        type: String
    },
    allowContextMenu: {
        type: Boolean,
        default: false
    },
    allowEventDefault: {
        type: Boolean,
        default: false
    },
    allowNativeTouchScrolling: {
        type: Boolean,
    },
    autoScroll: {
        type: Number,
    },
    bounds: {
        type: Object,
        default: {}
    },
    clickableTest: {
        type: Function,
    },
    cursor: {
        type: String,
    },
    dragClickables: {
        type: Boolean,
        default: true
    },
    dragResistance: {
        type: Number,
    },
    edgeResistance: {
        type: Number,
        default: 0.5
    },
    liveSnap: {
        type: [Function, Boolean, Array, Object],
    },
    lockAxis: {
        type: Boolean,
    },
    minimumMovement: {
        type: Number,
    },
    inertia: {
        type: [Boolean, Object],
        default: true
    },
    trigger: {
        type: [String, Object],
    },
    type: {
        type: String,
        default: 'x'
    },
    velocity: {
        type: [Boolean],
        default: false
    },
    modelValue: {
        type: Number,
        default: 0
    },
    zIndexBoost: {
        type: Boolean,
        default: true
    },
})

const scrubber = ref(null)
const handle = ref(null)
const options = toRefs(props)
const scrubWidth = ref(0)
const scrubHeight = ref(0)
const handleWidth = ref(0)
const handleHeight = ref(0)

function refresh() {
    scrubWidth.value = scrubber.value.getBoundingClientRect().width
    scrubHeight.value = scrubber.value.getBoundingClientRect().height
    handleWidth.value = handle.value.getBoundingClientRect().width
    handleHeight.value = handle.value.getBoundingClientRect().height
}

let resizeObserver = new ResizeObserver(debounce(refresh, 100))
onMounted(() => {
    refresh()
    resizeObserver.observe(scrubber.value)
    resizeObserver.observe(handle.value)
})
onBeforeUnmount(() => {
    resizeObserver.unobserve(scrubber.value)
    resizeObserver.unobserve(handle.value)
}) 

const bounds = computed(() => {
    let bounds
    if (props.type.indexOf('x') > -1) { 
        bounds = Object.assign({}, bounds, {
            minX: props.bounds.minX || Math.min(0, scrubWidth.value - handleWidth.value),
            maxX: props.bounds.maxX || Math.max(0, scrubWidth.value - handleWidth.value)
        })
    } 
    if (props.type.indexOf('y') > -1) { 
        bounds = Object.assign({}, bounds, {
            minY: props.bounds.minY || Math.min(0, scrubHeight.value - handleHeight.value), 
            maxY: props.bounds.maxY || Math.max(0, scrubHeight.value - handleHeight.value) 
        })
    }
    if (props.type.indexOf('rotation') > -1) {
        bounds = Object.assign({}, bounds, {
            minRotation: props.bounds.minRotation || 0,
            maxRotation: props.bounds.maxRotation || 360
        })
    }
    return bounds
})

Object.assign(options, {
    element: handle,
    bounds,
    onClick: e => {
        emit('click', e)
    }, 
    onDrag: e => {
        emit('drag', e)
    }, 
    onDragEnd: e => {
        emit('dragEnd', e)
    }, 
    onDragStart: e => {
        emit('dragStart', e)
    }, 
    onLockAxis: e => {
        emit('lockAxis', e)
    }, 
    onMove: e => {
        emit('move', e)
    }, 
    onPress: e => {
        emit('press', e)
    }, 
    onPressInit: e => {
        emit('pressInit', e)
    }, 
    onRelease: e => {
        emit('release', e)
    }, 
    onThrowComplete: e => {
        emit('throwComplete', e)
    }, 
    onThrowUpdate: e => {
        emit('throwUpdate', e)
    }, 
})
const { dragging, velocity, progress } = draggable(options)
watch(progress, (value) => {
    if (value != props.modelValue) {
        emit('update:modelValue', value)
    }
})

</script>
<style scoped>
.scrubber {
    width: 100%;
}
.handle {
    position: relative;
}
.horizontal .handle{
    height: 100%;
}
.vertical .handle{
    width: 100%;
}
.rotation .handle{
    width: 100%;
    height: 100%;
}
</style>