<script setup>
import { reactive } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import AssetSlot from '@/components/ui/AssetSlot.vue'
import AsteriskMark from '@/components/ui/AsteriskMark.vue'
import SectionChip from '@/components/ui/SectionChip.vue'
import SplitHeading from '@/components/ui/SplitHeading.vue'
import ArrowButton from '@/components/ui/ArrowButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { email, socials } from '@/content/links'
import { slotSrc } from '@/assets/slots'
import { reveal } from '@/motion'

const { t } = useI18n()

const cards = [
  { key: 'location', label: 'contact.locationLabel', value: 'hero.location' },
  { key: 'status', label: 'contact.statusLabel', value: 'contact.available' },
  // Below sm the long values get the full row so the address never splits mid-word.
  { key: 'email', label: 'contact.emailLabel', wide: true },
  { key: 'elsewhere', label: 'contact.elsewhereLabel', wide: true },
]

const elsewhere = socials.filter((s) => s.label !== 'Facebook')
const [emailUser, emailDomain] = email.split('@')

const fields = [
  { key: 'name', type: 'text', autocomplete: 'name' },
  { key: 'email', type: 'email', autocomplete: 'email' },
  { key: 'message', type: 'textarea' },
]

const fieldClass =
  'block w-full rounded-[3px] border border-transparent bg-paper px-3 text-base text-ink transition-colors duration-200 placeholder:text-graphite hover:border-line focus:border-accent sm:text-sm'

// The band reuses the backdrop photo once it exists; until then a plain ember band reads better than a second placeholder.
const hasBackdrop = !!slotSrc('contact-backdrop')

const form = reactive({ name: '', email: '', message: '' })

function submit() {
  const name = form.name.trim()
  const subject = encodeURIComponent(t('contact.form.subject', { name }))
  const body = encodeURIComponent(`${form.message.trim()}\n\n${name} (${form.email.trim()})`)
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section id="contact" tabindex="-1" class="py-24 outline-none md:py-32">
    <div class="container-site">
      <!-- Sized so the one-word Spanish title (6.5em wide) never breaks mid-word, also once the year sits beside it at lg. -->
      <PageHeader
        as="h2"
        :title="t('contact.bigTitle')"
        class="[&_h2]:text-[length:clamp(2.5rem,12.5vw,10rem)] lg:[&_h2]:text-[length:clamp(2.5rem,calc(13.8vw_-_2.5rem),9.75rem)]"
      />

      <div class="mt-16 grid gap-12 md:mt-24 lg:grid-cols-2 lg:gap-10">
        <div v-motion="reveal()" class="flex flex-col items-start">
          <SectionChip>{{ t('contact.readyChip') }}</SectionChip>
          <h3 class="mt-5 max-w-[9ch] font-display text-display-lg uppercase">{{ t('contact.heading') }}</h3>
          <p class="mt-6 max-w-md leading-relaxed text-graphite">{{ t('contact.text') }}</p>
          <ArrowButton class="mt-8" :href="'mailto:' + email">{{ t('contact.cta') }}</ArrowButton>
        </div>

        <dl v-motion="reveal(120)" class="grid grid-cols-2 gap-2.5 sm:gap-3">
          <div
            v-for="card in cards"
            :key="card.key"
            class="relative isolate flex min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-[3px] bg-mist p-3.5 sm:aspect-[16/11] sm:p-5 lg:aspect-[16/15]"
            :class="card.wide ? 'col-span-2 min-h-32 sm:col-span-1' : 'aspect-[16/15]'"
          >
            <AssetSlot
              v-if="card.key === 'location'"
              id="contact-map-cdmx"
              class="absolute inset-0 -z-10 opacity-35"
              position="70% 45%"
            />
            <dt class="flex items-center justify-between gap-2 text-[13px] text-graphite sm:text-sm">
              {{ t(card.label) }}
              <span v-if="card.key === 'status'" aria-hidden="true" class="relative flex size-2">
                <span class="absolute inset-0 animate-ping rounded-full bg-accent/60" />
                <span class="relative size-2 rounded-full bg-accent" />
              </span>
            </dt>
            <dd class="min-w-0 text-[15px] leading-snug font-bold tracking-tight sm:text-lg">
              <a
                v-if="card.key === 'email'"
                :href="'mailto:' + email"
                class="link-underline [overflow-wrap:anywhere]"
              >{{ emailUser }}<wbr />@{{ emailDomain }}</a>
              <ul v-else-if="card.key === 'elsewhere'" class="flex flex-wrap gap-x-5 gap-y-1 sm:flex-col">
                <li v-for="social in elsewhere" :key="social.label">
                  <a
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <span class="link-underline">{{ social.label }}</span>
                    <ArrowUpRight
                      :size="14"
                      :stroke-width="2.2"
                      aria-hidden="true"
                      class="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              </ul>
              <span v-else class="uppercase">{{ t(card.value) }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="container-site mt-24 md:mt-32">
      <div v-motion="reveal()" class="relative isolate overflow-hidden rounded-md bg-night text-white">
        <AssetSlot id="contact-backdrop" tone="dark" position="50% 40%" class="absolute inset-0 -z-20" />
        <div aria-hidden="true" class="backdrop-scrim absolute inset-0 -z-10" />

        <div class="grid gap-10 p-3 pt-8 sm:p-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16 lg:p-14 xl:gap-24 xl:p-20">
          <div class="flex flex-col gap-10 px-1 sm:px-0 lg:col-start-2 lg:row-start-1 lg:justify-between lg:py-2">
            <div class="flex flex-col items-start gap-5">
              <SectionChip tone="white">{{ t('contact.form.chip') }}</SectionChip>
              <SplitHeading
                as="h3"
                size="md"
                tone="light"
                class="max-[400px]:text-[1.85rem]"
                :lead="t('contact.form.headingLead')"
                :rest="t('contact.form.headingRest')"
              />
            </div>
            <div class="max-w-xs">
              <AsteriskMark class="size-5 text-accent" :weight="2.6" />
              <p class="mt-4 text-sm font-semibold uppercase tracking-[0.01em] sm:text-[15px]">{{ t('contact.form.asideTitle') }}</p>
              <p class="mt-2 text-sm leading-relaxed text-white/75">{{ t('footer.available') }}</p>
            </div>
          </div>

          <!-- In dark the card is about 1.07:1 against the night backdrop; the faint white ring keeps its edge and disappears beside the white light-mode card. -->
          <form
            aria-labelledby="contact-form-title"
            class="w-full max-w-sm rounded-[4px] bg-card p-1.5 text-ink shadow-[0_30px_60px_-30px_var(--color-night)] ring-1 ring-white/15 lg:col-start-1 lg:row-start-1"
            @submit.prevent="submit"
          >
            <div class="relative isolate flex h-20 items-center justify-center overflow-hidden rounded-[2px] bg-ember-deep text-white">
              <template v-if="hasBackdrop">
                <AssetSlot id="contact-backdrop" compact position="15% 25%" class="absolute inset-0 -z-20" />
                <div aria-hidden="true" class="absolute inset-0 -z-10 bg-night/40" />
              </template>
              <div v-else aria-hidden="true" class="band-ember absolute inset-0 -z-10" />
              <span class="flex items-start text-lg font-bold tracking-tight">
                Ivan Mendoza<AsteriskMark class="ml-0.5 size-2.5" :weight="2.4" />
              </span>
            </div>

            <div class="px-4 pt-6 pb-5 sm:px-5">
              <h4 id="contact-form-title" class="text-center text-lg font-semibold tracking-tight">{{ t('contact.form.title') }}</h4>

              <div class="mt-5 flex flex-col gap-4">
                <div v-for="field in fields" :key="field.key">
                  <label :for="'contact-' + field.key" class="mb-1.5 block text-[13px] font-semibold">
                    {{ t('contact.form.' + field.key) }}<span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    v-if="field.type === 'textarea'"
                    :id="'contact-' + field.key"
                    v-model="form[field.key]"
                    :name="field.key"
                    rows="3"
                    required
                    :placeholder="t('contact.form.' + field.key + 'Placeholder')"
                    :class="fieldClass"
                    class="min-h-24 resize-y py-3"
                  />
                  <input
                    v-else
                    :id="'contact-' + field.key"
                    v-model="form[field.key]"
                    :type="field.type"
                    :name="field.key"
                    :autocomplete="field.autocomplete"
                    required
                    :placeholder="t('contact.form.' + field.key + 'Placeholder')"
                    :class="fieldClass"
                    class="h-11"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="mt-5 flex min-h-11 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-[2px] bg-ink px-4 text-sm font-medium uppercase tracking-[0.02em] text-paper transition-colors duration-300 hover:bg-accent-deep hover:text-white active:translate-y-px"
              >{{ t('contact.form.submit') }}</button>
              <p class="mt-3 text-center text-xs text-graphite">{{ t('contact.form.note') }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.backdrop-scrim {
  background:
    linear-gradient(to top, color-mix(in oklch, var(--color-night) 78%, transparent), transparent 65%),
    linear-gradient(to right, color-mix(in oklch, var(--color-night) 30%, transparent), color-mix(in oklch, var(--color-night) 55%, transparent));
}

/* Kept to the deep end of the orange family: white small text on ember or ember-bright falls under 4.5:1. */
.band-ember {
  background: linear-gradient(115deg, var(--color-ember-deep) 15%, var(--color-accent-deep));
}
</style>
