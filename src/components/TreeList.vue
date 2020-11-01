<template>
  <div class="container">
    <div class="my-3">
      <button class="btn btn-success my-3" @click="addNode"><font-awesome-icon class="vtl-icon vtl-menu-icon" :icon="['fas', 'plus']"/> Create Node</button>
      <vue-tree-list
        @click="onClick"
        @change-name="onChangeName"
        @delete-node="onDel"
        @add-node="onAddNode"
        @drop="onDrop"
        @drop-before="onDropBefore"
        :model="data"
        v-bind:default-expanded="false"
      >
        <template v-slot:leafNameDisplay="slotProps">
          <span>
            {{ slotProps.model.title }}
          </span>
        </template>
      </vue-tree-list>
    </div>
  </div>
</template>

<script>
  import VueTreeList from './tree-list/VueTreeList.vue'
  import { Tree, TreeNode } from './tree-list/Tree.js'

  // Font Awesome 5
  import { library } from '@fortawesome/fontawesome-svg-core'
  import {
      faPlus,
  } from '@fortawesome/free-solid-svg-icons'

  library.add(
      faPlus,
  );

  export default {
    components: {
      VueTreeList,
    },
    data() {
      return {
        data: new Tree([{
            title: 'Node 1',
            id: 1,
            pid: 0,
            dragDisabled: true,
            addTreeNodeDisabled: true,
            addLeafNodeDisabled: true,
            editNodeDisabled: true,
            delNodeDisabled: true,
            children: [{
              title: 'Node 1-2',
              id: 2,
              isLeaf: true,
              pid: 1
            }]
          },
          {
            title: 'Node 2',
            id: 3,
            pid: 0,
            disabled: true
          },
          {
            title: 'Node 3',
            id: 4,
            pid: 0
          }
        ])
      }
    },
    methods: {
      onDel(node) {
        console.log(node)
        node.remove()
      },

      defocusApp(){
        console.log('hey')
      },

      onChangeName(params) {
        console.log(params)
      },

      onAddNode(params) {
        console.log(params)
      },

      onClick(params, node) {
        console.log(params, node)
      },

      onDrop(params) {
        console.log(params)
      },

      onDropBefore(params) {
        console.log(params)
      },

      addNode() {
        let node = new TreeNode({ title: 'new node', isLeaf: false })
        if (!this.data.children) this.data.children = []
        this.data.addChildren(node)
      },

    }
  }
</script>