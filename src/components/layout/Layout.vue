<template>
  <div class="q-pa-md fixed-center">
    <!--
      Page mode
    -->
    <div v-if="mode === 'page'" class="column items-center layout q-pa-md">
      <KAction
        id ="toggle-header" label="Header" :icon="header.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="toggleHeader"
      />
      <KAction
        id ="toggle-footer" label="Footer" :icon="footer.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
        :handler="toggleFooter"
      />
    </div>
    <!--
      Panes mode
    -->
    <div v-if="mode === 'panes'" class="column items-center layout q-pa-md q-gutter-md">
      <div class="column layout-box">
        <KAction
          id ="toggle-top-pane" label="Top pane" :icon="panes.top.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => togglePane('top')"
        />
        <div class="row items-center">
          <KAction
            id ="toggle-top-opener" label="Opener" :icon="panes.top.opener ? 'las la-toggle-on' : 'las la-toggle-off'"
            :handler="() => togglePaneOpener('top')"
          />
          <KAction
            id ="top-pane-fixed" label="Fixed" :icon="panes.top.state === 'fixed' ? 'las la-toggle-on' : 'las la-toggle-off'"
            :handler="() => setPaneState('top', 'fixed')"
          />
          <KAction
            id ="top-pane-responsive" label="Responsive" :icon="panes.top.state === 'responsive' ? 'las la-toggle-on' : 'las la-toggle-off'"
            :handler="() => setPaneState('top', 'responsive')"
          />
        </div>
      </div>
      <div>
        <div class="row items-center q-gutter-sm no-wrap">
          <div class="row items-center layout-box">
            <KAction
              id ="toggle-left-pane" label="Left pane" :icon="panes.left.visible ? 'las la-toggle-on' : 'las la-toggle-off'" icon-right
              :handler="() => togglePane('left')"
            />
            <div class="column items-center">
              <KAction
                id ="toggle-left-pane-opener" label="Opener" :icon="panes.left.opener ? 'las la-toggle-on' : 'las la-toggle-off'"
                :handler="() => togglePaneOpener('left')"
              />
              <KAction
                id ="left-pane-fixed" label="Fixed" :icon="panes.left.state === 'fixed' ? 'las la-toggle-on' : 'las la-toggle-off'"
                :handler="() => setPaneState('left', 'fixed')"
              />
              <KAction
                id ="left-pane-responsive" label="Responsive" :icon="panes.left.state === 'responsive' ? 'las la-toggle-on' : 'las la-toggle-off'"
                :handler="() => setPaneState('left', 'responsive')"
              />
            </div>
          </div>
          <div class="row layout-box">
            <div class="column items-center">
              <KAction
                id ="toggle-right-pane-opener" label="Opener" :icon="panes.right.opener ? 'las la-toggle-on' : 'las la-toggle-off'" 
                :handler="() => togglePaneOpener('right')"
              />
              <KAction
                id ="right-pane-fixed" label="Fixed" :icon="panes.right.state === 'fixed' ? 'las la-toggle-on' : 'las la-toggle-off'"
                :handler="() => setPaneState('right', 'fixed')"
              />
              <KAction
                id ="right-pane-responsive" label="Responsive" :icon="panes.right.state === 'responsive' ? 'las la-toggle-on' : 'las la-toggle-off'"
                :handler="() => setPaneState('right', 'responsive')"
              />
            </div>
            <KAction
              id ="toggle-right-pane" label="Right pane" :icon="panes.right.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
              :handler="() => togglePane('right')"
            />
          </div>
        </div>
      </div>
      <div class="column layout-box">
        <div class="row items-center">
          <KAction
            id ="toggle-bottom-opener" label="Opener" :icon="panes.bottom.opener ? 'las la-toggle-on' : 'las la-toggle-off'"
            :handler="() => togglePaneOpener('bottom')"
          />
          <KAction
            id ="bottom-pane-fixed" label="Fixed" :icon="panes.bottom.state === 'fixed' ? 'las la-toggle-on' : 'las la-toggle-off'"
            :handler="() => setPaneState('bottom', 'fixed')"
          />
          <KAction
            id ="bottom-pane-responsive" label="Responsive" :icon="panes.bottom.state === 'responsive' ? 'las la-toggle-on' : 'las la-toggle-off'"
            :handler="() => setPaneState('bottom', 'responsive')"
          />
        </div>
        <KAction
          id ="toggle-bottom-pane" label="Bottom pane" :icon="panes.bottom.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => togglePane('bottom')"
        />
      </div>
    </div>
    <!--
      Windows mode
    -->
    <div v-if="mode === 'windows'" class="column items-center layout q-pa-md q-gutter-md">
      <div class="column layout-box">
        <KAction
          id ="toggle-top-window" label="Top window" :icon="windows.top.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => toggleWindow('top')"
        />
        <div class="row items-center">
          <KAction 
            id ="top-window-pinned" label="Pinned" :icon="windows.top.state === 'pinned' ? 'las la-toggle-on' : 'las la-toggle-off'" 
            :handler="() => setWindowState('top', 'pinned')" 
          />
          <KAction 
            id ="top-window-floating" label="Floating" :icon="windows.top.state === 'floating' ? 'las la-toggle-on' : 'las la-toggle-off'" 
            :handler="() => setWindowState('top', 'floating')" 
          />
          <KAction 
            id ="top-window-maximized" label="Maximized" :icon="windows.top.state === 'maximized' ? 'las la-toggle-on' : 'las la-toggle-off'" 
            :handler="() => setWindowState('top', 'maximized')" 
          />
        </div>
      </div>
      <div>
        <div class="row items-center q-gutter-lg no-wrap">
          <div class="row items-center layout-box">
            <KAction
              id ="toggle-left-window" label="Left window" :icon="windows.left.visible ? 'las la-toggle-on' : 'las la-toggle-off'" icon-right
              :handler="() => toggleWindow('left')"
            />
            <div class="column">
              <KAction 
                id ="left-window-pinned" label="Pinned" :icon="windows.left.state === 'pinned' ? 'las la-toggle-on' : 'las la-toggle-off'" 
                :handler="() => setWindowState('left', 'pinned')" 
              />
              <KAction 
                id ="left-window-floating" label="Floating" :icon="windows.left.state === 'floating' ? 'las la-toggle-on' : 'las la-toggle-off'" 
                :handler="() => setWindowState('left', 'floating')" 
              />
              <KAction 
                id ="left-window-maximized" label="Maximized" :icon="windows.left.state === 'maximized' ? 'las la-toggle-on' : 'las la-toggle-off'" 
                :handler="() => setWindowState('left', 'maximized')" 
              />
            </div>
          </div>
          <div>
            <KAction 
                id ="store-widget" label="Store"
                :handler="openStoreWidget" 
              />
          </div>
          <div class="row items-center layout-box">
            <div class="column">
              <KAction 
                id ="right-window-pinned" label="Pinned" :icon="windows.right.state === 'pinned' ? 'las la-toggle-on' : 'las la-toggle-off'" 
                :handler="() => setWindowState('right', 'pinned')" 
              />
              <KAction 
                id ="right-window-floating" label="Floating" :icon="windows.right.state === 'floating' ? 'las la-toggle-on' : 'las la-toggle-off'" 
                :handler="() => setWindowState('right', 'floating')" 
              />
              <KAction 
                id ="right-window-maximized" label="Maximized" :icon="windows.right.state === 'maximized' ? 'las la-toggle-on' : 'las la-toggle-off'" 
                :handler="() => setWindowState('right', 'maximized')" 
              />
            </div>
            <KAction
              id ="toggle-right-window" label="Right window" :icon="windows.right.visible ? 'las la-toggle-on' : 'las la-toggle-off'" icon-right
              :handler="() => toggleWindow('right')"
            />
          </div>
        </div>
      </div>
      <div class="column layout-box">
        <div class="row items-center">
          <KAction 
            id ="bottom-window-pinned" label="Pinned" :icon="windows.bottom.state === 'pinned' ? 'las la-toggle-on' : 'las la-toggle-off'" 
            :handler="() => setWindowState('bottom', 'pinned')" 
          />
          <KAction 
            id ="bottom-window-floating" label="Floating" :icon="windows.bottom.state === 'floating' ? 'las la-toggle-on' : 'las la-toggle-off'" 
            :handler="() => setWindowState('bottom', 'floating')" 
          />
          <KAction 
            id ="bottom-window-maximized" label="Maximized" :icon="windows.bottom.state === 'maximized' ? 'las la-toggle-on' : 'las la-toggle-off'" 
            :handler="() => setWindowState('bottom', 'maximized')" 
          />
        </div>
        <KAction
          id ="toggle-bottom-window"
          label="Bottom window"
          :icon="windows.bottom.visible ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => toggleWindow('bottom')"
        />
      </div>
    </div>
    <!--
      Fab mode
    -->
    <div v-if="mode === 'fab'" class="column items-center layout q-pa-md">
      <div class="row items-center">
        <KAction
          id ="toggle-top-left-fab" label="Top left" :icon="fab.position === 'top-left' ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => setFabPosition('top-left')"
        />
       <KAction
          id ="toggle-top-right-fab" label="Top right" :icon="fab.position === 'top-right' ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => setFabPosition('top-right')"
        />
      </div>
      <div class="row items-center">
        <KAction
          id ="toggle-bottom-left-fab" label="Bottom left" :icon="fab.position === 'bottom-left' ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => setFabPosition('bottom-left')"
        />
        <KAction
          id ="toggle-bottom-right-fab" label="Bottom right" :icon="fab.position === 'bottom-right' ? 'las la-toggle-on' : 'las la-toggle-off'"
          :handler="() => setFabPosition('bottom-right')"
        />
      </div>
    </div>
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
function setPaneState (placement, state) {
  Layout.setPaneState(placement, state)
}
function toggleWindow (placement) {
  Layout.setWindowVisible(placement, !windows[placement].visible)
}
function setWindowState (placement, state) {
  Layout.setWindowState(placement, state)
}
function setFabPosition (placement) {
  Layout.setFabPosition(placement)
}
function openStoreWidget () {
  Layout.openWidget('store-widget')
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