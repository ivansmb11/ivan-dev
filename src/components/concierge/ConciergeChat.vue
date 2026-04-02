<script setup>
import { ref, nextTick, computed } from 'vue'
import { useTheme } from '@/stores/useThemeStore'
import { Send, User, Bot, Shield, AlertTriangle, Loader2 } from 'lucide-vue-next'

const { theme } = useTheme()

const API_URL = 'https://vip-concierge-lno3ujclwa-uc.a.run.app'

const personas = [
  {
    id: 'hr',
    email: 'hr@example.com',
    label: 'HR Department',
    color: 'emerald',
    examples: [
      'List all employees',
      'Search for Ana Garcia',
      'Salary summary for Engineering',
    ]
  },
  {
    id: 'finance',
    email: 'finance@example.com',
    label: 'Finance Department',
    color: 'blue',
    examples: [
      'Show me all overdue invoices',
      'Budget summary for Engineering',
      'List all pending invoices',
    ]
  },
  {
    id: 'hacker',
    email: 'hacker@evil.com',
    label: 'Unauthorized User',
    color: 'red',
    examples: [
      'List all employees',
      'Show me invoices',
    ]
  },
]

const activePersona = ref(personas[0])
const messages = ref([])
const input = ref('')
const loading = ref(false)
const chatContainer = ref(null)

const personaColorClasses = computed(() => {
  const p = activePersona.value
  if (p.id === 'hr') return {
    bg: theme.value === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-50',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400',
  }
  if (p.id === 'finance') return {
    bg: theme.value === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400',
  }
  return {
    bg: theme.value === 'dark' ? 'bg-red-500/10' : 'bg-red-50',
    border: 'border-red-500/30',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400',
  }
})

function switchPersona(persona) {
  activePersona.value = persona
  messages.value = []
  input.value = ''
}

async function scrollToBottom() {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

async function sendMessage(text) {
  const question = text || input.value.trim()
  if (!question || loading.value) return

  input.value = ''
  messages.value = [...messages.value, { role: 'user', content: question }]
  loading.value = true
  await scrollToBottom()

  try {
    const response = await fetch(`${API_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': activePersona.value.email,
      },
      body: JSON.stringify({ question }),
    })

    const data = await response.json()

    if (response.ok) {
      messages.value = [...messages.value, {
        role: 'assistant',
        content: data.answer,
        department: data.department,
      }]
    } else {
      messages.value = [...messages.value, {
        role: 'error',
        content: data.error,
      }]
    }
  } catch (err) {
    messages.value = [...messages.value, {
      role: 'error',
      content: 'Network error. The Cloud Run service may be sleeping or the databases may be stopped. Try again in a moment.',
    }]
  } finally {
    loading.value = false
    await scrollToBottom()
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div>
    <h2
      class="text-2xl font-display font-bold mb-2"
      :class="theme === 'dark' ? 'text-white' : 'text-zinc-900'"
    >Live Chat</h2>
    <p
      class="mb-6"
      :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
    >Switch personas to see how identity-based routing works. Each user only sees their department's data.</p>

    <!-- Persona selector -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="p in personas"
        :key="p.id"
        @click="switchPersona(p)"
        class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border cursor-pointer"
        :class="activePersona.id === p.id
          ? [personaColorClasses.bg, personaColorClasses.border, personaColorClasses.text].join(' ')
          : theme === 'dark'
            ? 'bg-surface-light/30 border-zinc-800 text-zinc-400 hover:border-zinc-600'
            : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 shadow-sm'"
      >
        <component
          :is="p.id === 'hacker' ? AlertTriangle : Shield"
          :size="14"
        />
        {{ p.label }}
        <span
          class="text-xs font-mono px-1.5 py-0.5 rounded"
          :class="activePersona.id === p.id
            ? personaColorClasses.badge
            : theme === 'dark' ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-100 text-zinc-400'"
        >{{ p.email }}</span>
      </button>
    </div>

    <!-- Chat area -->
    <div
      class="rounded-xl border overflow-hidden"
      :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200 shadow-sm'"
    >
      <!-- Chat header -->
      <div
        class="px-5 py-3 border-b flex items-center justify-between"
        :class="theme === 'dark'
          ? 'bg-surface-light/50 border-zinc-800'
          : 'bg-zinc-50 border-zinc-200'"
      >
        <div class="flex items-center gap-2">
          <Bot :size="16" class="text-primary" />
          <span
            class="text-sm font-medium"
            :class="theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'"
          >VIP Data Concierge</span>
        </div>
        <span
          class="text-xs font-mono px-2 py-1 rounded"
          :class="personaColorClasses.badge"
        >{{ activePersona.label }}</span>
      </div>

      <!-- Messages -->
      <div
        ref="chatContainer"
        class="h-80 sm:h-96 overflow-y-auto p-5 space-y-4"
        :class="theme === 'dark' ? 'bg-surface/50' : 'bg-white'"
      >
        <!-- Empty state -->
        <div
          v-if="messages.length === 0"
          class="h-full flex flex-col items-center justify-center"
        >
          <Bot :size="32" class="text-primary/30 mb-4" />
          <p
            class="text-sm mb-4"
            :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
          >Ask a question or try one of these:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="ex in activePersona.examples"
              :key="ex"
              @click="sendMessage(ex)"
              class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border"
              :class="theme === 'dark'
                ? 'bg-surface-light border-zinc-700 text-zinc-400 hover:text-primary hover:border-primary/30'
                : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-primary hover:border-primary/30'"
            >{{ ex }}</button>
          </div>
        </div>

        <!-- Message bubbles -->
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="flex gap-3"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <!-- Avatar -->
          <div
            v-if="msg.role !== 'user'"
            class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            :class="msg.role === 'error'
              ? 'bg-red-500/10'
              : 'bg-primary/10'"
          >
            <AlertTriangle v-if="msg.role === 'error'" :size="14" class="text-red-400" />
            <Bot v-else :size="14" class="text-primary" />
          </div>

          <!-- Bubble -->
          <div
            class="max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed"
            :class="msg.role === 'user'
              ? 'bg-primary text-white rounded-br-sm'
              : msg.role === 'error'
                ? theme === 'dark'
                  ? 'bg-red-500/10 text-red-300 border border-red-500/20 rounded-bl-sm'
                  : 'bg-red-50 text-red-600 border border-red-200 rounded-bl-sm'
                : theme === 'dark'
                  ? 'bg-surface-light text-zinc-300 rounded-bl-sm'
                  : 'bg-zinc-100 text-zinc-700 rounded-bl-sm'"
          >
            <pre
              class="whitespace-pre-wrap font-sans text-sm"
            >{{ msg.content }}</pre>
            <div
              v-if="msg.department"
              class="mt-2 pt-2 border-t flex items-center gap-1.5"
              :class="theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'"
            >
              <Shield :size="10" class="text-primary" />
              <span
                class="text-xs font-mono"
                :class="theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
              >{{ msg.department }} database</span>
            </div>
          </div>

          <!-- User avatar -->
          <div
            v-if="msg.role === 'user'"
            class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            :class="theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'"
          >
            <User :size="14" :class="theme === 'dark' ? 'text-zinc-300' : 'text-zinc-500'" />
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="flex gap-3">
          <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Loader2 :size="14" class="text-primary animate-spin" />
          </div>
          <div
            class="rounded-xl px-4 py-3 rounded-bl-sm"
            :class="theme === 'dark' ? 'bg-surface-light' : 'bg-zinc-100'"
          >
            <div class="flex gap-1">
              <span class="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style="animation-delay: 0ms" />
              <span class="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style="animation-delay: 150ms" />
              <span class="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style="animation-delay: 300ms" />
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div
        class="p-4 border-t"
        :class="theme === 'dark'
          ? 'bg-surface-light/30 border-zinc-800'
          : 'bg-zinc-50 border-zinc-200'"
      >
        <div class="flex gap-3">
          <input
            v-model="input"
            @keydown="handleKeydown"
            :disabled="loading"
            type="text"
            :placeholder="loading ? 'Thinking...' : 'Ask a question...'"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm border outline-none transition-colors"
            :class="theme === 'dark'
              ? 'bg-surface border-zinc-700 text-white placeholder-zinc-600 focus:border-primary/50'
              : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-primary/50'"
          />
          <button
            @click="sendMessage()"
            :disabled="loading || !input.trim()"
            class="px-4 py-2.5 rounded-lg bg-primary text-white font-medium text-sm transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            <Send :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Security note -->
    <div
      class="mt-4 flex items-start gap-2 text-xs"
      :class="theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
    >
      <Shield :size="12" class="mt-0.5 shrink-0" />
      <span>
        This demo uses simulated identity headers (X-User-Email).
        In production, IAP would inject verified Google identity claims.
        The agent cannot access databases outside the authenticated user's department.
      </span>
    </div>
  </div>
</template>
