<script>
    import styles from './styles.css';

  let isAuthenticated = false;

  function handleLogout() {
    isAuthenticated = false;
    // Add your logout logic here
  }
</script>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/Items">Products</a></li>
    {#if isAuthenticated}
      <li><a href="/profile">Profile</a></li>
      <li><button on:click={handleLogout}>Logout</button></li>
    {:else}
      <li><a href="/Login">Login</a></li>
      <li><a href="/register">Register</a></li>
    {/if}
  </ul>
</nav>

<div class="main">
<slot />
</div>

<style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    nav ul {
      display: flex;
      gap: 1rem;
    }
  
    button {
      background: none;
      border: none;
      color: blue;
      cursor: pointer;
    }
  </style>