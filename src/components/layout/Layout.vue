<template>
  <div class="q-pa-md fixed-center column items-center q-gutter-y-md layout">
    <KAction
      v-if="mode === 'page'"
      id ="toggle-header"
      label="Header"
      :icon="header.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
      :handler="toggleHeader"
    />
    <div class="column items-center layout-box">
      <div v-if="mode === 'panes'" class="column">
        <KAction
          id ="toggle-top-pane"
          label="Pane"
          :icon="panes.top.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => togglePane('top')"
        />
        <KAction
          id ="toggle-top-pane"
          label="Opener"
          :icon="panes.top.opener ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => togglePaneOpener('top')"
        />
      </div>
      <KAction
        v-if="mode === 'windows'"
        id ="toggle-top-window"
        label="Top"
        :icon="windows.top.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="() => toggleWindow('top')"
      />
    </div>
    <div class="row items-center q-gutter-x-md no-wrap" v-if="mode === 'fab'">
      <div class="row items-center layout-box">
        <KAction
        id ="toggle-top-left-fab"
        label="Top left"
        :icon="fab.position === 'top-left' ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="() => toggleFabPosition('top-left')"
      />
      </div>
      <div class="row items-center layout-box">
        <KAction
        id ="toggle-top-right-fab"
        label="Top right"
        :icon="fab.position === 'top-right' ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="() => toggleFabPosition('top-right')"
      />
      </div>
    </div>
    <div class="row items-center q-gutter-x-md no-wrap" v-if="mode === 'fab'">
      <div class="row items-center layout-box">
        <KAction
        id ="toggle-bottom-left-fab"
        label="Bottom left"
        :icon="fab.position === 'bottom-left' ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="() => toggleFabPosition('bottom-left')"
      />
      </div>
      <div class="row items-center layout-box">
        <KAction
        id ="toggle-bottom-right-fab"
        label="Bottom right"
        :icon="fab.position === 'bottom-right' ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="() => toggleFabPosition('bottom-right')"
      />
      </div>
    </div>
    <div class="row items-center q-gutter-x-md no-wrap">
      <div class="row items-center layout-box">
        <div v-if="mode === 'panes'" class="row items-center">
          <KAction
            id ="toggle-left-pane"
            label="Left"
            :icon="panes.left.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
            :handler="() => togglePane('left')"
          />
          <KAction
            id ="toggle-right-pane-opener"
            label="Opener"
            :icon="panes.left.opener ? 'las la-toggle-on' : 'las la-toggle-off'"
            icon-right
            :handler="() => togglePaneOpener('left')"
          />
        </div>
        <KAction
          v-if="mode === 'windows'"
          id ="toggle-left-window"
          label="Left"
          :icon="windows.left.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => toggleWindow('left')"
        />
      </div>
      <KAction
        v-if="mode === 'page'"
        id ="toggle-fab"
        label="Fab"
        :icon="fab.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="toggleFab"
      />
      <div class="row items-center layout-box">
        <KAction
          v-if="mode === 'windows'"
          id ="toggle-right-window"
          label="Right"
          :icon="windows.right.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          icon-right
          :handler="() => toggleWindow('right')"
        />
        <div v-if="mode === 'panes'" class="row items-center">
          <KAction
            id ="toggle-right-pane-opener"
            label="Opener"
            :icon="panes.right.opener ? 'las la-toggle-on' : 'las la-toggle-off'"
            icon-right
            :handler="() => togglePaneOpener('right')"
          />
          <KAction
            id ="toggle-right-pane"
            label="Pane"
            :icon="panes.right.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
            icon-right
            :handler="() => togglePane('right')"
          />
        </div>
      </div>
    </div>
    <div class="column items-center layout-box">
      <KAction
        v-if="mode === 'windows'"
        id ="toggle-bottom-window"
        label="Bottom"
        :icon="windows.bottom.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="() => toggleWindow('bottom')"
      />
      <div v-if="mode === 'panes'" class="column">        
        <KAction
          id ="toggle-bottom-opener"
          label="Opener"
          :icon="panes.bottom.opener ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => togglePaneOpener('bottom')"
        />
        <KAction
          id ="toggle-bottom-pane"
          label="Pane"
          :icon="panes.bottom.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => togglePane('bottom')"
        />
      </div>
    </div>
    <KAction
      v-if="mode === 'page'"
      id ="toggle-footer"
      label="Footer"
      :icon="footer.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
      :handler="toggleFooter"
    />
  </div>
</template>

<script setup>
import { Layout } from '@kalisio/kdk/core.client'

// Props
defineProps({
  mode: {
    type: String,
    required: true
  }
})

// Data
const header = Layout.getHeader()
const footer = Layout.getFooter()
const panes = {
  left: Layout.getPane('left'),
  top: Layout.getPane('top'),
  right: Layout.getPane('right'),
  bottom: Layout.getPane('bottom')
}
const windows = {
  left: Layout.getWindow('left'),
  top: Layout.getWindow('top'),
  right: Layout.getWindow('right'),
  bottom: Layout.getWindow('bottom')
}
const fab = Layout.getFab()

// Functions
function toggleHeader () {
  Layout.setHeaderVisible(!header.visible)
}
function toggleFooter () {
  Layout.setFooterVisible(!footer.visible)
}
function togglePane (placement) {
  Layout.setPaneVisible(placement, !panes[placement].visible)
}
function togglePaneOpener (placement) {
  Layout.setPaneOpener(placement, !panes[placement].opener)
}
function toggleWindow (placement) {
  Layout.setWindowVisible(placement, !windows[placement].visible)
}
function toggleFab () {
  Layout.setFabVisible(!fab.visible)
}
function toggleFabPosition (placement) {
  Layout.setFabPosition(placement)
}
</script>

<style lang="scss" scoped>
.layout {
  background-color: gainsboro;
  border-radius: 5px;
}
.layout-box {
  background-color: lightgrey;
  border-radius: 5px;
}
</style>