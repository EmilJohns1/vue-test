// tests/ContactForm.spec.ts
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it } from 'node:test';
import { expect } from 'chai';
import ContactForm from '../Contact_form.vue';

describe('ContactForm', () => {
  it('renders correctly', () => {
    const app = createApp(ContactForm);
    const wrapper = mount(app);

    // Your test assertions go here
    expect(wrapper.html()).contains('Contact Us');
    // Add more assertions based on your component's behavior

    // Clean up after the test
    wrapper.unmount();
  });
});
