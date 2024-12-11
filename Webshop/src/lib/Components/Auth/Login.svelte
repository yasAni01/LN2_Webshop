<script>
    import { authStore } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
  
    let username = '';
    let password = '';
    let currenerror = null;
    let loading = false;
  
    async function login() {
      currenerror = null;
      loading = true;
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (!response.ok) {
          throw new Error('Invalid username or password.');
        }
  
        const data = await response.json();
        authStore.update(() => ({
          user: data.user,
          isAuthenticated: true,
        }));
  
        // Successful login, redirect to home
        goto('/');
       
      } catch (err) {
        currenerror = err.message || 'An error occurred. Please try again.';
      } finally {
        loading = false;
      }
    }
</script>

<form on:submit|preventDefault={login}>
    <div>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} required>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required>
    </div>
    {#if currenerror}
        <p style="color: red;">{currenerror}</p>
    {/if}
    <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 300px;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: blue;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover:enabled {
        background-color: darkblue;
    }

    button:disabled {
        background-color: grey;
        cursor: not-allowed;
    }
</style>