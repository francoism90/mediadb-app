<template>
  <div class="player-video-control">
    <q-icon
      :name="resolution?.icon"
      class="cursor-pointer"
      size="24px"
      right
      tabindex="0"
    >
      <q-menu
        anchor="bottom right"
        self="bottom right"
        class="player-video-menu"
        square
        transition-duration="0"
      >
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label>
                Quality
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div>
                <span>{{ resolution?.label }}</span>

                <q-icon
                  name="chevron_right"
                  size="24px"
                />
              </div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>
                Playback Speed
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div>
                <span>Normal</span>

                <q-icon
                  name="chevron_right"
                  size="24px"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-icon>
  </div>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineComponent } from 'vue';

const resolutions = [
  { label: '2160p', icon: '4K', width: 3840, height: 2160 },
  { label: '1440p', icon: '2k', width: 2560, height: 1440 },
  { label: '1080p', icon: 'hd', width: 1920, height: 1080 },
  { label: '720p', icon: 'hd', width: 1280, height: 720 },
  { label: '480p', icon: 'sd', width: 854, height: 480 },
  { label: '360p', icon: 'sd', width: 640, height: 360 },
  { label: '240p', icon: 'sd', width: 426, height: 240 },
];

export default defineComponent({
  name: 'SettingsControl',

  setup() {
    const { state } = usePlayer();

    const getResolution = (height: number, width: number) => {
      const heightMatch = resolutions.find((e) => height >= e.height);
      const widthMatch = resolutions.find((e) => width >= e.width);

      return heightMatch || widthMatch;
    };

    const resolution = computed(() => getResolution(state.bitrate?.height || 0, state.bitrate?.width || 0));

    return {
      resolution,
    };
  },
});
</script>
