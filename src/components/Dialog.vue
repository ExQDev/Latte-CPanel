<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <strong>{{ title }}</strong>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{ body }}
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <v-button v-if="accept && oktitle" class="modal-default-button" :onclick="accept">
                {{ oktitle }}
              </v-button>
              <v-button class="modal-default-button" :onclick="reject">
                {{ nottitle || 'Close' }}
              </v-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VButton from './Button'

export default {
  props: [
    'title',
    'body',
    'accept',
    'reject',
    'oktitle',
    'nottitle'
  ],
  components: {
    VButton
  }
}
</script>
