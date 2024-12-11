<script>
    import Login from '$lib/components/Auth/Login.svelte';
    import { authStore, user } from '$lib/stores/authStore';

    let isLoggedIn = false;
    authStore.subscribe(state => {
        isLoggedIn = state.isAuthenticated;
    });

    const logout = () => {
        isLoggedIn = false;
    };
    
</script>
  
<h1>Login</h1>
{#if isLoggedIn}
    <p>You are already logged in</p>
    <input type="button" value="Logout" on:click={logout}>
{:else}
    <Login />
{/if}