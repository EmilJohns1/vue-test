<template>
  <div>
    <router-link id="router-link" to="/">
      <button id="home-button">Home</button>
    </router-link>

    <div class="contactform">
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" v-model="name" required>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" v-model="email" required>
        </div>

        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" name="message" rows="4" v-model="message" required></textarea>
        </div>

        <div class="button-group">
          <button type="reset" @click="resetForm">Reset</button>
          <button type="submit" :disabled="!isFormValid" :class="{ 'disabled-button': !isFormValid }">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useContactStore } from '../stores/contact.ts';
import { computed } from 'vue';

export default {
  setup() {
    const store = useContactStore();

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const name = ref('');
    const email = ref('');
    const message = ref('');

    if (store.name) {
      name.value = store.name;
    }

    if (store.email) {
      email.value = store.email;
    }

    const isFormValid = computed(() => {
      return name.value.trim() !== '' && isValidEmail(email.value) && message.value.trim() !== '';
    });

    const submitForm = async () => {
      if (isFormValid.value) {
        try {
          const response = await fetch('http://localhost:3001/responses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name.value,
              email: email.value,
              message: message.value,
            }),
          });

          const responseData = await response.json();

          store.setName(responseData.name);
          store.setEmail(responseData.email);

          alert('Form submitted successfully!');

          resetMessage();
        } catch (error) {
          console.error('Error submitting form:', error.message);
        }
      } else {
        console.log('Form is not valid. Please check your inputs.');
      }
    };

    const resetMessage = () => {
      message.value = '';
    };

    const resetForm = () => {
      store.setName('');
      store.setEmail('');
      name.value = '';
      email.value = '';
      message.value = '';
    };

    return {
      store,
      name,
      email,
      message,
      isFormValid,
      submitForm,
      resetForm,
    };
  },
};
</script>

<style scoped>

#router-link {
  display: flex;
  justify-content: center;
  max-width: fit-content;
}

#home-button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contactform {
  max-width: 400px;
  max-height: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  width: 100%;
  max-width: 100%; /* Set maximum width to 100% of its container */
  max-height: 200px; /* Set maximum height */
  padding: 8px;
  box-sizing: border-box; /* Include padding and border in the element's total width */
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow-y: auto; /* Add a vertical scrollbar if content exceeds max-height */
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns */
  gap: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.disabled-button {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
