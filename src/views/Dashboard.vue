<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import { useNotification } from '@/composables/useNotification'
import TaskHeader from '@/components/TaskHeader.vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskItem from '@/components/TaskItem.vue'

const taskStore = useTaskStore()
const router = useRouter()

const { filter, filteredTasks } = storeToRefs(taskStore)
const { addTask, removeTask, toggleTask } = taskStore

// --- 逻辑复用之：公共通知逻辑 ---
const { message, isVisible, notify } = useNotification()

// 在调用仓库动作的同时给出 UI 反馈
const handleAdd = (title) => {
  addTask(title)
  notify('任务已添加')
}

const handleRemove = (id) => {
  removeTask(id)
  notify('任务已删除')
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
</script>

<template>
  <div class="py-12 px-4">
    <div class="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <TaskHeader />

      <main class="p-6">
        <!-- 通知提示条：由 useNotification 控制 -->
        <div
          v-if="isVisible"
          class="mb-4 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold text-center"
        >
          {{ message }}
        </div>

        <TaskInput @add-task="handleAdd" />
        <TaskFilter v-model="filter" />

        <ul class="space-y-3">
          <TransitionGroup name="list">
            <TaskItem
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
              @toggle="toggleTask"
              @remove="handleRemove"
            />
          </TransitionGroup>
        </ul>

        <div v-if="filteredTasks.length === 0" class="text-center py-12 text-slate-400 text-sm">
          暂无相关任务...
        </div>

        <button
          @click="handleLogout"
          class="mt-8 w-full py-2 text-xs text-slate-400 hover:text-red-500 transition-colors"
        >
          退出当前账号
        </button>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 列表过渡动画 */
.list-enter-active, .list-leave-active { transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }
</style>