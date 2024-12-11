
<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let name = '';
    let email = '';
    let message = '';
    const dispatch = createEventDispatcher();

    function handleSubmit() {
        const mailtoLink = `mailto:anikyas1@students.zhaw.ch?subject=Contact%20Form%20Submission&body=Name:%20${name}%0AEmail:%20${email}%0AMessage:%20${message}`;
        window.location.href = mailtoLink;
        dispatch('submit', { name, email, message });
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: auto;
    }

    label {
        margin-top: 10px;
    }

    input, textarea {
        margin-top: 5px;
        padding: 8px;
        font-size: 1em;
    }

    button {
        margin-top: 20px;
        padding: 10px;
        font-size: 1em;
        cursor: pointer;
    }
</style>

<form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required />

    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />

    <label for="message">Message:</label>
    <textarea id="message" bind:value={message} required></textarea>

    <button type="submit">Send</button>
</form>