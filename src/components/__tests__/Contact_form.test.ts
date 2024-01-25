import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router';
import { describe, it, expect, beforeEach, vi, afterEach, } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ContactForm from '@/components/Contact_form.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ContactForm,
    },
  ],
});

describe('ContactForm', () => {
  let wrapper : any;

  it('renders correctly with initial values', async () => {
    beforeEach(() => {
      // render the component
      wrapper = shallowMount(ContactForm, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn
            })
          ]
        }
      })
    })
  
    // TEARDOWN - run after each unit test
    afterEach(() => {
      wrapper.unmount()
    })
  
    // Check if the Home button is rendered
    expect(wrapper.find('#home-button').exists()).toBe(true);

    // Check if the form elements are rendered
    expect(wrapper.findAll('input').length).toBe(2); // Name and Email inputs
    expect(wrapper.find('textarea').exists()).toBe(true); // Message textarea

    // Check if the Reset and Submit buttons are rendered
    expect(wrapper.findAll('button[type="reset"]').length).toBe(1);
    expect(wrapper.findAll('button[type="submit"]').length).toBe(1);

    // Check if the form is initially valid
    expect(wrapper.vm.isFormValid).toBe(false);
  });
});