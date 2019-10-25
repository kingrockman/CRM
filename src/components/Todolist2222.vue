<template>
  <div>
    <Title :title="title" :subtitle="subtitle"></Title>
    <input @keyup.enter="handleClick" type="text" v-model="mytodo" />
    <button @click="handleClick">添加</button>
    <button @click="deldone">清空</button>
    <ul>
      <li
        :class="{'done':todo.done}"
        @click="toggle(index)"
        :key="index"
        v-for="(todo,index) in todos"
      >{{index+1}}:{{todo.text}}</li>
    </ul>
    <p>{{reamins}}/{{todos.length}}</p>
  </div>
</template>

<script>
import Title from './components/Title'
export default {
  components: {
    Title
  },
  data () {
    return {
      title: 'hello vuejs',
      subtitle: 'vuejs is good',
      mytodo: '',
      todos: [
        { text: '吃饭', done: false },
        { text: '睡觉', done: false },
        { text: '写代码', done: false }
      ]
    }
  },
  computed: {
    reamins () {
      return this.todos.filter(v => !v.done).length
    }
  },
  methods: {
    handleClick () {
      if (this.mytodo !== '') {
        this.todos.push({
          text: this.mytodo,
          done: false
        })
        this.mytodo = ''
      }
    },
    toggle (i) {
      this.todos[i].done = !this.todos[i].done
    },
    deldone () {
      this.todos = this.todos.filter(v => !v.done)
    }
  }
}
</script>

<style>
li.done {
  text-decoration: line-through;
  color: red;
}
</style>
