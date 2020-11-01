<template>
  <div class="vtl">
    <div
      v-if="model.title !== 'root'"
      :id="model.id"
      class="vtl-node"
      :class="{ 'vtl-leaf-node': model.isLeaf, 'vtl-tree-node': !model.isLeaf }"
      v-click-outside="deselectAll"
    >
      <div
        class="vtl-border vtl-up"
        :class="{ 'vtl-active': isDragEnterUp }"
        @drop="dropBefore"
        @dragenter="dragEnterUp"
        @dragover="dragOverUp"
        @dragleave="dragLeaveUp"
      />
      <div
        :class="treeNodeClass"
        :draggable="!model.dragDisabled"
        @dragstart="dragStart"
        @dragover="dragOver"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @drop="drop"
        @dragend="dragEnd"
        @mouseover="mouseOver"
        @mouseout="mouseOut"
        @click.stop="click"
      >
        <span class="vtl-caret vtl-is-small" v-if="model.children && model.children.length > 0">
          <font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="caretClass" @click.prevent.stop="toggle"/>
        </span>

        <span v-if="model.isLeaf">
          <slot name="leafNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
            <font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="['fas', 'file']"/>
          </slot>
        </span>
        <span v-else>
          <slot name="treeNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
            <font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="['fas', 'folder']"/>
          </slot>
        </span>

        <div class="vtl-node-content" v-if="!editable">
          <slot name="leafNameDisplay" :expanded="expanded" :model="model" :root="rootNode">
            {{ model.title }}
          </slot>
        </div>
        <input
          v-else
          class="vtl-input"
          type="text"
          ref="nodeInput"
          :value="model.title"
          @input="updateName"
          @blur="setUnEditable"
        />
        <div class="vtl-operation" v-show="model.isLoading">
          <span title="Loading">
            <slot name="addLoadingIcon" :expanded="expanded" :model="model" :root="rootNode">
              <font-awesome-icon class="vtl-icon vtl-menu-icon fa-spin" :icon="['fas', 'circle-notch']"/>
            </slot>
          </span>
        </div>
        <div class="vtl-operation" v-show="isHover && !model.isLoading">
          <span title="add tree node" @click.stop.prevent="addChild(false)" v-if="!model.isLeaf && !model.addTreeNodeDisabled">
            <slot name="addTreeNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
              <font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="['fas', 'folder-plus']"/>
            </slot>
          </span>
          <span title="add leaf node" @click.stop.prevent="addChild(true)" v-if="!model.isLeaf && !model.addLeafNodeDisabled">
            <slot name="addLeafNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
              <font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="['fas', 'plus']"/>
            </slot>
          </span>
          <span title="edit" @click.stop.prevent="setEditable" v-if="!model.editNodeDisabled">
            <slot name="editNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
              <font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="['fas', 'pencil-alt']"/>
            </slot>
          </span>
          <span title="delete" @click.stop.prevent="delNode" v-if="!model.delNodeDisabled">
            <slot name="delNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
              <font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="['fas', 'trash-alt']"/>
            </slot>
          </span>
        </div>
      </div>

      <div
        v-if="model.children && model.children.length > 0 && expanded"
        class="vtl-border vtl-bottom"
        :class="{ 'vtl-active': isDragEnterBottom }"
        @drop="dropAfter"
        @dragenter="dragEnterBottom"
        @dragover="dragOverBottom"
        @dragleave="dragLeaveBottom"
      />
    </div>

    <div
      :class="{ 'vtl-tree-margin': model.name !== 'root' && model.id !== 0  }"
      v-show="model.title === 'root' || expanded"
      v-if="isFolder"
    >
      <vue-tree-list
        v-for="model in model.children"
        :default-tree-node-name="defaultTreeNodeName"
        :default-leaf-node-name="defaultLeafNodeName"
        :default-expanded="defaultExpanded"
        :model="model"
        :key="model.id"
      >
        <template v-slot:leafNameDisplay="slotProps">
          <slot name="leafNameDisplay" v-bind="slotProps" />
        </template>
        <template v-slot:addTreeNodeIcon="slotProps">
          <slot name="addTreeNodeIcon" v-bind="slotProps" />
        </template>
        <template v-slot:addLeafNodeIcon="slotProps">
          <slot name="addLeafNodeIcon" v-bind="slotProps" />
        </template>
        <template v-slot:editNodeIcon="slotProps">
          <slot name="editNodeIcon" v-bind="slotProps" />
        </template>
        <template v-slot:delNodeIcon="slotProps">
          <slot name="delNodeIcon" v-bind="slotProps" />
        </template>
        <template v-slot:leafNodeIcon="slotProps">
          <slot name="leafNodeIcon" v-bind="slotProps" />
        </template>
        <template v-slot:treeNodeIcon="slotProps">
          <slot name="treeNodeIcon" v-bind="slotProps" />
        </template>
      </vue-tree-list>
    </div>
  </div>
</template>

<script>
/**
 * Based on 
 * https://github.com/ParadeTo/vue-tree-list
 */

import { TreeNode } from './Tree.js'
import { addHandler, removeHandler } from './tools.js'

// Font Awesome 5
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faFolder,
    faFile,
    faCaretDown,
    faCaretRight,
    faCircleNotch,
    faFolderPlus,
    faPlus,
    faPencilAlt,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faFolder,
    faFile,
    faCaretDown,
    faCaretRight,
    faCircleNotch,
    faFolderPlus,
    faPlus,
    faPencilAlt,
    faTrashAlt,
);

let compInOperation = null

export default {
  name: 'vue-tree-list',
  data: function() {
    return {
      isHover: false,
      isActive: false,
      bold: false,
      isLoading: false,
      editable: false,
      isDragEnterUp: false,
      isDragEnterBottom: false,
      isDragEnterNode: false,
      expanded: this.defaultExpanded,
    }
  },
  props: {
    model: {
      type: Object
    },
    defaultLeafNodeName: {
      type: String,
      default: 'New leaf node'
    },
    defaultTreeNodeName: {
      type: String,
      default: 'New tree node'
    },
    defaultExpanded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rootNode() {
      var node = this.$parent
      while (node._props.model.title !== 'root') {
        node = node.$parent
      }
      return node
    },

    caretClass() {
      return this.expanded ? ['fas', 'caret-down'] : ['fas', 'caret-right']
    },

    isFolder() {
      return this.model.children && this.model.children.length
    },

    treeNodeClass() {
      const {
        model: { dragDisabled, disabled },
        isDragEnterNode,
        isActive,
        bold
      } = this

      return {
        'vtl-node-main': true,
        'vtl-active': isDragEnterNode,
        'vtl-drag-disabled': dragDisabled,
        'vtl-disabled': disabled,
        'active': isActive,
        'font-weight-bold': bold,
      }
    }
  },
  mounted() {
    const vm = this
    addHandler(window, 'keyup', function(e) {
      // click enter
      if (e.keyCode === 13 && vm.editable) {
        vm.editable = false
      }
    })
  },
  beforeDestroy() {
    removeHandler(window, 'keyup')
  },
  methods: {
    updateName(e) {
      var oldTitle = this.model.title
      this.model.changeName(e.target.value)
      this.rootNode.$emit('changing-name', {
        id: this.model.id,
        oldTitle: oldTitle,
        newTitle: e.target.value,
        node: this.model
      })
    },

    delNode() {
      this.rootNode.$emit('delete-node', this.model)
    },

    setEditable() {
      this.editable = true
      this.$nextTick(() => {
        const $input = this.$refs.nodeInput
        $input.focus()
        $input.setSelectionRange(0, $input.value.length)
      })
    },

    setUnEditable(e) {
      this.editable = false
      var oldTitle = this.model.title
      this.model.changeName(e.target.value)
      this.rootNode.$emit('change-name', {
        id: this.model.id,
        oldTitle: oldTitle,
        newTitle: e.target.value,
        model: this.model,
        eventType: 'blur'
      })
    },

    toggle() {
      if (this.isFolder) {
        this.expanded = !this.expanded
      }
    },

    mouseOver() {
      if (this.model.disabled) return
      this.isHover = true
    },

    mouseOut() {
      this.isHover = false
    },

    deselectingAll(node, children) {
      children.forEach(child => {
        if (child.$children && child.$children.length > 0) {
          this.deselectingAll(child,child.$children);
        }
        child.isActive = false;
        child.bold = false;
      });
    },

    setBold(node){
      if(node.rootNode !== node.$parent){
        this.setBold(node.$parent);
      }
      node.bold = true;
    },

    setActive(node){
      this.setBold(node);
      node.isActive = true;
    },

    click() {
      this.deselectAll();
      this.setActive(this);
      this.rootNode.$emit('click', this.model, this)
    },

    deselectAll() {
      this.deselectingAll(this.rootNode, this.rootNode.$children);
    },

    addChild(isLeaf) {
      const title = isLeaf ? this.defaultLeafNodeName : this.defaultTreeNodeName
      this.expanded = true
      var node = new TreeNode({ title, isLeaf })
      this.model.addChildren(node, true)
      this.rootNode.$emit('add-node', node)
    },

    dragStart(e) {
      if (!(this.model.dragDisabled || this.model.disabled)) {
        compInOperation = this
        // for firefox
        e.dataTransfer.setData('data', 'data')
        e.dataTransfer.effectAllowed = 'move'
        return true
      }
      return false
    },
    dragEnd() {
      compInOperation = null
    },
    dragOver(e) {
      e.preventDefault()
      return true
    },
    dragEnter() {
      if (!compInOperation) return
      if (compInOperation.model.id === this.model.id || !compInOperation || this.model.isLeaf)
        return
      this.isDragEnterNode = true
    },
    dragLeave() {
      this.isDragEnterNode = false
    },
    drop() {
      if (!compInOperation) return
      const oldParent = compInOperation.model.parent
      compInOperation.model.moveInto(this.model)
      this.isDragEnterNode = false
      this.rootNode.$emit('drop', {
        target: this.model,
        node: compInOperation.model,
        src: oldParent
      })
    },

    dragEnterUp() {
      if (!compInOperation) return
      this.isDragEnterUp = true
    },
    dragOverUp(e) {
      e.preventDefault()
      return true
    },
    dragLeaveUp() {
      if (!compInOperation) return
      this.isDragEnterUp = false
    },
    dropBefore() {
      if (!compInOperation) return
      const oldParent = compInOperation.model.parent
      compInOperation.model.insertBefore(this.model)
      this.isDragEnterUp = false
      this.rootNode.$emit('drop-before', {
        target: this.model,
        node: compInOperation.model,
        src: oldParent
      })
    },

    dragEnterBottom() {
      if (!compInOperation) return
      this.isDragEnterBottom = true
    },
    dragOverBottom(e) {
      e.preventDefault()
      return true
    },
    dragLeaveBottom() {
      if (!compInOperation) return
      this.isDragEnterBottom = false
    },
    dropAfter() {
      if (!compInOperation) return
      const oldParent = compInOperation.model.parent
      compInOperation.model.insertAfter(this.model)
      this.isDragEnterBottom = false
      this.rootNode.$emit('drop-after', {
        target: this.model,
        node: compInOperation.model,
        src: oldParent
      })
    }
  }
}
</script>

<style>
.vtl-icon {
  font-style: normal;
  font-weight: 900;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
}

.vtl-icon.vtl-menu-icon {
  margin-right: 4px
}

.vtl-icon.vtl-menu-icon:hover {
  color: inherit
}

.vtl-icon:hover {
  color: #00f
}

.vtl-border {
  height: 5px
}

.vtl-border.vtl-up {
  margin-top: -5px
}

.vtl-border.vtl-bottom,
.vtl-border.vtl-up {
  background-color: transparent
}

.vtl-border.vtl-active {
  border-bottom: 3px dashed #00f
}

.vtl-node-main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 5px 0 5px 1rem
}

.vtl-node-main .vtl-input {
  border: none;
  max-width: 150px;
  border-bottom: 1px solid #00f
}

.vtl-node-main:hover,
.vtl-node-main.active:hover {
  background-color: #dcdbdb
}

.vtl-node-main.active {
  background-color: #f0f0f0
}

.vtl-node-main.vtl-active {
  outline: 2px dashed pink
}

.vtl-node-main .vtl-caret {
  margin-left: -1rem;
  padding-right: 5px;
}

.vtl-node-main .vtl-operation {
  margin-left: 1rem;
  letter-spacing: 1px
}

.vtl-item {
  cursor: pointer
}

.vtl-tree-margin {
  margin-left: 2em
}
</style>