<template>
  <div class="kontaktskjema">
    <h1>Contact Us</h1>
    <form>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  // Component logic goes here
}
</script>

<style scoped>
/* Add your custom styles here */
.kontaktskjema {
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

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
