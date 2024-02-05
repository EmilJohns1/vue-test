// tests/ContactForm.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ContactForm from '../Contact_form.vue';

describe('ContactForm', () => {
  it('renders correctly', async () => {
    const wrapper = mount(ContactForm);

    // Wait for the next tick to allow the component to be rendered
    await wrapper.vm.$nextTick();

    // Assert that the component renders "Contact Us" in the HTML
    expect(wrapper.html()).toContain('Contact Us');

    // Clean up after the test
    wrapper.unmount();
  });

  it('submits form when valid', async () => {
    const wrapper = mount(ContactForm);

    // Set valid input values
    await wrapper.setData({ name: 'John Doe', email: 'john@example.com', message: 'Hello' });

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Check if form was submitted successfully
    expect(wrapper.emitted().submitForm).toBeTruthy();

    // Clean up after the test
    wrapper.unmount();
  });

  it('does not submit form when invalid', async () => {
    const wrapper = mount(ContactForm);

    // Set invalid input values (empty fields)
    await wrapper.setData({ name: '', email: '', message: '' });

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Check if form was not submitted
    expect(wrapper.emitted().submitForm).toBeFalsy();

    // Clean up after the test
    wrapper.unmount();
  });

  // Add more test cases based on your component's behavior
});
