<script>
    let email = '';
    let password = '';

    function handleLogin() {
        // Handle login logic here
    }

    function handleRegister() {
        // Handle register logic here
    }
</script>

<form on:submit|preventDefault={handleLogin}>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
    </div>
    <button type="submit">Login</button>
    <button type="button" on:click={handleRegister}>Register</button>
</form>
<style>
    form {
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 35px;
    }

    div {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        background-color: #007BFF;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }

    button[type="button"] {
        background-color: #6c757d;
        margin-top: 0.5rem;
    }

    button:hover {
        background-color: #0056b3;
    }

    button[type="button"]:hover {
        background-color: #5a6268;
    }
</style>