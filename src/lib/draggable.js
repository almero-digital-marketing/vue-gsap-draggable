import { onBeforeUnmount, onMounted, nextTick, watch, unref, isRef, ref } from 'vue'
import { gsap } from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap-plugins/InertiaPlugin'

gsap.registerPlugin(Draggable, InertiaPlugin)

function draggable(options, currentInstance) {
    
    let disposed = false
    let name = 'draggable'
    let draggable
    let tracker
    const dragging = ref(false)
    const velocity = ref(0)
    const progress = ref(0)

    function precissionRound(number) {
        const precision = unref(options.updatePrecision) || 100
        return Math.round((number + Number.EPSILON) * precision) / precision
    }

    function updateScope({ x, y, rotation, minX, maxX, minY, maxY, minRotation, maxRotation }) {
        const scope = unref(options.scope) || unref(options.element)

        if (unref(options.type).indexOf('x') > -1) {
            if (minX >= 0) {
                progress.value = (x - minX) / (maxX - minX)
            } else {
                progress.value = 1 - (x - minX) / (maxX - minX)
            }
        }
        if (unref(options.type).indexOf('y') > -1) {
            if (minY >= 0) {
                progress.value = (y - minY) / (maxY - minY)
            } else {
                progress.value = 1 - (y - minY) / (maxY - minY)
            }
        }
        if (unref(options.type).indexOf('rotation') > -1) {
            progress.value = (rotation - minRotation) / (maxRotation - minRotation)
        }
        
        if (progress.value != unref(options.modelValue)) {
            gsap.to(scope, {
                [`--progress-${ name }`]: progress.value,
                duration: .2,
                ease: unref(options.ease),
            })
        }
    }

    let trackingVelocity
    function trackVelocity({ minX, maxX, minY, maxY, minRotation, maxRotation }) {
        trackingVelocity = true
        window.requestAnimationFrame(() => {
            if (tracker) {
                if (unref(options.type).indexOf('x') > -1) {
                    velocity.value = tracker[0].get('x') / (maxX - minX)
                }
                else if (unref(options.type).indexOf('y') > -1) {
                    velocity.value = tracker[0].get('y') / (maxY - minY)
                }
                else if (unref(options.type).indexOf('rotation') > -1) {
                    velocity.value = tracker[0].get('rotation') / (maxRotation - minRotation)
                }

                const scope = unref(options.scope) || unref(options.element)
                if (scope) {
                    gsap.to(scope, {
                        [`--velocity-${ name }`]: velocity.value,
                        ease: unref(options.velocityEase),
                        // overwrite: true,
                        duration: .2
                    })
                    if (velocity.value != 0) {
                        return trackVelocity({ minX, maxX, minY, maxY, minRotation, maxRotation })
                    }
                }
            }
            trackingVelocity = false
        })
    }

    function registerDraggable() {
        if (disposed) return
        
        name = unref(options.name) || name

        draggable = Draggable.create(unref(options.element), {
            activeCursor: unref(options.activeCursor),
            allowContextMenu: unref(options.allowContextMenu),
            allowEventDefault: unref(options.allowEventDefault),
            allowNativeTouchScrolling: unref(options.allowNativeTouchScrolling),
            autoScroll: unref(options.autoScroll),
            bounds: unref(options.bounds),
            clickableTest: unref(options.clickableTest),
            cursor: unref(options.cursor),
            dragResistance: unref(options.dragResistance),
            edgeResistance: unref(options.edgeResistance),
            force3D: unref(options.force3D),
            liveSnap: unref(options.liveSnap),
            lockAxis: unref(options.lockAxis),
            minimumMovement: unref(options.minimumMovement),
            onClick: function() {
                const onClick = unref(options.onClick)
                if (onClick) onClick(this)
            }, 
            onClickParams: unref(options.onClickParams), 
            onDrag: function () {
                const onDrag = unref(options.onDrag)
                if (onDrag) onDrag()
                updateScope(this)
                
                if (!trackingVelocity) trackVelocity(this)
            }, 
            onDragParams: unref(options.onDragParams), 
            onDragEnd: function() {
                if (!unref(options.inertia)) {
                    updateValue = {}
                    dragging.value = false
                }

                const onDragEnd = unref(options.onDragEnd)
                if(onDragEnd) onDragEnd(this)
            }, 
            onDragEndParams: unref(options.onDragEndParams), 
            onDragStart: function() {
                dragging.value = true
                if (!trackingVelocity) trackVelocity(this)

                const onDragStart = unref(options.onDragStart)
                if(onDragStart) onDragStart(this)
            }, 
            onDragStartParams: unref(options.onDragStartParams), 
            onLockAxis: function() {
                const onLockAxis = unref(options.onLockAxis)
                if(onLockAxis) onLockAxis(this)
            }, 
            onMove: function() {
                const onMove = unref(options.onMove)
                if(onMove) onMove(this)
            }, 
            onPress: function() {
                const onPress = unref(options.onPress)
                if (onPress) onPress(this)
            }, 
            onPressInit: function() {
                const onPressInit = unref(options.onPressInit)
                if(onPressInit) onPressInit(this)
            }, 
            onPressParams: unref(options.onPressParams), 
            onRelease: function() {
                const onRelease = unref(options.onRelease)
                if(onRelease) onRelease(this)
            }, 
            onReleaseParams: unref(options.onReleaseParams), 
            onThrowComplete: function() {
                dragging.value = false
                updateValue = {}

                const onThrowComplete = unref(options.onThrowComplete)
                if(onThrowComplete) onThrowComplete(this)
            }, 
            onThrowUpdate: function() {
                updateScope(this)

                const onThrowUpdate = unref(options.onThrowUpdate)
                if (onThrowUpdate) onThrowUpdate(this)

                if (!trackingVelocity) trackVelocity(this)
            }, 
            inertia: unref(options.inertia),
            trigger: unref(options.trigger),
            type: unref(options.type),
            zIndexBoost: unref(options.zIndexBoost),
        })

        if (unref(options.velocity)) {
            tracker = InertiaPlugin.track(unref(options.element), unref(options.type))
        }
    }
    
    async function initDraggable() {
        dragging.value = false
        velocity.value = 0

        destroyDraggable()
        await nextTick()
        registerDraggable()
    }

    function destroyDraggable() {
        if (draggable && draggable) {
            draggable[0].kill()
            draggable = null
            InertiaPlugin.untrack(unref(options.element))
            tracker = null
        }
    }

    let updateValue = {}
    function updateDraggable() {
        const progress = unref(options.modelValue)
        if (!dragging.value && draggable && draggable[0] && progress != undefined) {
            const { x, y, rotation, minX, maxX, minY, maxY, minRotation, maxRotation } = draggable[0]
            const vars = {
                duration: .2,
                overwrite: 'auto',
                onComplete() {
                    draggable[0].update({
                        // applyBounds: true,
                        // sticky: true
                    })
                    updateScope(draggable[0])
                },
            }
            let changed = 0
            if (unref(options.type).indexOf('x') > -1) {
                if (minX >= 0) {
                    vars.x = minX + (maxX - minX) * progress
                } else {
                    vars.x = minX + (maxX - minX) * (1 - progress)
                }
                if (precissionRound(vars.x) != updateValue.x && vars.x != x) changed = Math.abs(vars.x - x)
            }
            if (unref(options.type).indexOf('y') > -1) {
                if (minX >= 0) {
                    vars.y = minY + (maxY - minY) * progress
                } else {
                    vars.y = minY + (maxY - minY) * (1 - progress)
                }
                if (precissionRound(vars.y) != updateValue.y && vars.y != y) changed = Math.abs(vars.y - y)
            }
            if (unref(options.type).indexOf('rotation') > -1) {
                vars.rotation = minRotation + (maxRotation - minRotation) * progress
                if (precissionRound(vars.rotation) != updateValue.rotation && vars.rotation != rotation) changed = Math.abs(vars.rotation - rotation)
            }
            updateValue = {
                x: precissionRound(vars.x),
                y: precissionRound(vars.y),
                rotation: precissionRound(vars.rotation)
            }
            if (changed) {
                gsap.to(unref(options.element), vars)
                
                if (trackingVelocity === false) {
                    trackVelocity(draggable[0])
                } else {
                    trackingVelocity = trackingVelocity || false
                }
            }
        }
    }
    
    if(typeof window !== 'undefined') {
        onBeforeUnmount(() => {
            destroyDraggable()
            disposed = true
        }, currentInstance)

        if(!currentInstance) {
            onMounted(async () => {
                await initDraggable()
                updateDraggable()
                for(let option in options) {
                    if (isRef(options[option])) {
                        watch(options[option], () => {
                            if (option == 'modelValue') {
                                updateDraggable()
                            } else {
                                initDraggable()
                            }
                        })
                    }
                }
            })
        }
    }

    return {
        dragging,
        velocity,
        progress,
        initDraggable,
        destroyDraggable,
        updateDraggable
    }
}

export default draggable