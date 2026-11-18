<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

// 环境变量：dev 和 prod 会自动读不同的 .env 文件
const appTitle = import.meta.env.VITE_APP_TITLE || 'TaskHub'
const apiBase = import.meta.env.VITE_API_BASE_URL || '未配置'

const handleLogin = () => {
  isLoading.value = true
  // 模拟异步请求
  setTimeout(() => {
    localStorage.setItem('isLoggedIn', 'true')
    router.push('/') // 登录成功跳转首页
    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="p-8 bg-white rounded-3xl shadow-xl w-full max-w-sm border border-slate-100">
      <h2 class="text-2xl font-black mb-1 text-slate-800">欢迎回来</h2>
      <p class="text-xs text-slate-400 mb-6">{{ appTitle }}</p>

      <button
        @click="handleLogin"
        :disabled="isLoading"
        class="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
      >
        {{ isLoading ? '登录中...' : '一键进入系统' }}
      </button>

      <p class="mt-4 text-center text-xs text-slate-400">测试环境：点击即可登录</p>
      <p class="mt-2 text-center text-[10px] text-slate-300 break-all">API: {{ apiBase }}</p>
    </div>
  </div>
</template>