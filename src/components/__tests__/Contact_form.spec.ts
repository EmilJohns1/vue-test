import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import ContactForm from '@/components/Contact_form.vue';
import { createPinia } from 'pinia';
import { describe, it, expect, vi } from 'vitest';

const pinia = createPinia();

const app = createApp(pinia);
app.use(pinia);

describe('ContactForm', () => {
  it('renders correctly', async () => {
    const wrapper = mount(ContactForm, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('Contact Us');

    wrapper.unmount();
  });

  it('submits form when valid', async () => {
    const wrapper = mount(ContactForm, {
      global: {
        plugins: [pinia],
      },
      props: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
      },
    });

    const submitFormSpy = vi.spyOn(wrapper.vm, 'submitForm');

    await wrapper.find('form').trigger('submit.prevent');

    expect(submitFormSpy).toHaveBeenCalled();

    wrapper.unmount();

  });

  it('does not submit form when invalid', async () => {
    const wrapper = mount(ContactForm, {
      global: {
        plugins: [pinia],
      },
      props: {
        name: '',
        email: '',
        message: '',
      },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted().submitForm).toBeFalsy();

    wrapper.unmount();
  });
});
