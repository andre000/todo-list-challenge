<template>
  <div class="frame__container">
    <t-frame
      v-for="frame in frames"
      :key="frame.id"
      :frame="frame"
      :edit-mode="frame.id === editFrameID"
      :disabled="frame.id === disabledFrameID"
      @remove="removeFrame(frame)"
      @edit="editFrameID = frame.id"
      @done="editingFrame($event, frame)"
    />
    <div
      v-if="!newFrame"
      class="link frame__container__new"
      @click="newFrame = {}"
    >
      + add new frame
    </div>
    <t-frame
      v-else
      :disabled="isLoadingNewFrame"
      :frame="newFrame"
      :edit-mode="true"
      @done="createNewFrame"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapActions } from 'vuex'
import { Frame, FrameInput } from '@/services/ootz'
import { FullFrame } from '../../store'

export default Vue.extend({
  props: {
    frames: {
      type: Array,
      default: () => []
    } as PropOptions<Array<Frame>>
  },

  data: () => ({
    newFrame: null as any,
    editFrameID: '',
    disabledFrameID: '',
    isLoadingNewFrame: false
  }),

  methods: {
    async createNewFrame (event: any) {
      if (event === false) {
        this.newFrame = null
        return false
      }

      this.isLoadingNewFrame = true
      const fullFrames = [...this.frames] as Array<FullFrame>
      const getOrder = fullFrames.length
        ? (fullFrames.sort((a, b) => a.order > b.order ? 1 : -1).pop() as FullFrame).order
        : 0

      const newFrame: FrameInput = {
        title: event,
        order: (getOrder + 1)
      }

      this.newFrame = newFrame

      try {
        await this.addFrame(newFrame)
      } catch (error) {
        this.$toast.error('Sorry. Server is currently unavaiable')
      } finally {
        this.isLoadingNewFrame = false
        this.newFrame = null
      }
    },

    async removeFrame (frame: Frame) {
      try {
        await this.deleteFrame(frame)
      } catch (err) {
        this.$toast.error('Sorry. Server is currently unavaiable')
      }
    },

    async editingFrame (title: String, frame: Frame) {
      if (!title) {
        this.editFrameID = ''
        return false
      }

      this.disabledFrameID = frame.id

      try {
        await this.editFrame({ ...frame, title })
      } catch (err) {
        this.$toast.error('Sorry. Server is currently unavaiable')
      } finally {
        this.disabledFrameID = ''
        this.editFrameID = ''
      }
    },

    ...mapActions(['addFrame', 'deleteFrame', 'editFrame'])
  }
})
</script>

<style lang="scss" scoped>
.frame__container {
  display: flex;
}
</style>
