<script setup lang="ts">
defineProps<{
  currentStep: number
}>()

const steps = [
  { number: 1, title: 'Faisons connaissance' },
  { number: 2, title: 'Créez votre espace de travail' },
  { number: 3, title: 'Pour mieux vous connaître' }
]
</script>

<template>
  <div class="stepper">
    <div class="steps-container">
      <div
        v-for="(step, index) in steps"
        :key="step.number"
        class="step-item"
      >
        <div class="step-indicator">
          <div
            class="step-circle"
            :class="{
              'active': currentStep === step.number,
              'completed': currentStep > step.number,
              'inactive': currentStep < step.number
            }"
          >
            {{ step.number }}
          </div>
          <div
            v-if="index < steps.length - 1"
            class="step-line"
            :class="{
              'completed': currentStep > step.number
            }"
          />
        </div>
        <div class="step-title" :class="{ 'active': currentStep === step.number }">
          {{ step.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper {
  padding: 2rem 0;
}

.steps-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s ease;
}

.step-circle.inactive {
  background: #F3F4F6;
  color: #9CA3AF;
  border: 2px solid #E5E7EB;
}

.step-circle.active {
  background: #3B82F6;
  color: white;
  border: 2px solid #3B82F6;
}

.step-circle.completed {
  background: #10B981;
  color: white;
  border: 2px solid #10B981;
}

.step-line {
  width: 60px;
  height: 2px;
  background: #E5E7EB;
  transition: all 0.3s ease;
}

.step-line.completed {
  background: #10B981;
}

.step-title {
  font-size: 0.875rem;
  color: #6B7280;
  text-align: center;
  transition: all 0.3s ease;
}

.step-title.active {
  color: #1F2937;
  font-weight: 600;
}
</style>
