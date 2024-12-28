<script>
  let isAuthenticated = false;
  let searchQuery = ''; // Variable to bind the search input
  let suggestions = [];
  let showSuggestions = false;

  function handleLogout() {
    isAuthenticated = false;
    // Add your logout logic here
  }

  function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission
    if (searchQuery.trim() !== '') {
      console.log('Search query:', searchQuery);
      // Redirect to a search results page or perform search action
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  }

  function handleInput(event) {
    searchQuery = event.target.value;
    if (searchQuery.trim().length > 0) {
      showSuggestions = true;
      suggestions = getSuggestions(searchQuery);
    } else {
      showSuggestions = false;
      suggestions = [];
    }
  }

  function getSuggestions(query) {
    const pages = [
      { name: 'Products', url: '/Items' },
      { name: 'Contact', url: '/Contact' },
      { name: 'Profile', url: '/profile' },
      { name: 'Login', url: '/Login' }
    ];
    return pages.filter((page) =>
      page.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  function handleSuggestionClick(suggestion) {
    // Redirect to the selected suggestion's URL
    window.location.href = suggestion.url;
  }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container-fluid d-flex justify-content-between align-items-center">
    <a class="navbar-brand fw-bold text-uppercase" href="/">Shopping Today</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/Items">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Contact">Contact</a>
        </li>
        {#if isAuthenticated}
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
          <li class="nav-item">
            <button class="nav-link btn btn-link p-0" on:click={handleLogout}>Logout</button>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login</a>
          </li>
        {/if}
      </ul>
      <form class="d-flex position-relative" role="search" on:submit={handleSearch}>
        <input
          class="form-control me-2 border-0 rounded-pill shadow-sm"
          type="search"
          placeholder="Search"
          aria-label="Search"
          bind:value={searchQuery}
          on:input={handleInput}
        />
        <button class="btn btn-success rounded-pill shadow-sm" type="submit">Search</button>
        {#if showSuggestions}
          <ul class="suggestions-list position-absolute mt-2">
            {#each suggestions as suggestion}
              <li>
                <button
                  type="button"
                  class="suggestion-item"
                  on:click={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </form>
    </div>
  </div>
</nav>

<div class="container mt-4">
  <slot />
</div>

<!-- Footer -->
<footer class="footer bg-dark text-white text-center py-4 mt-5">
  <div class="container">
    <p class="mb-2">© 2024 Shopping Today. All Rights Reserved.</p>
    <p class="mb-0">Made with ❤️ by Your Team</p>
  </div>
</footer>

<style>
  :global(body) {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
  }

  .navbar-brand {
    font-size: 1.5rem;
    color: #fff !important;
  }

  .nav-link {
    color: #ccc !important;
    transition: color 0.3s;
  }

  .nav-link:hover {
    color: #fff !important;
  }

  .suggestions-list {
    background: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    list-style: none;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .suggestion-item {
    cursor: pointer;
    padding: 0.5rem;
    text-align: left;
    width: 100%;
    border: none;
    background: none;
    color: #333;
    font-size: 0.9rem;
    transition: background 0.3s;
  }

  .suggestion-item:hover {
    background: #f8f9fa;
  }

  input:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  /* Footer Styles */
  .footer {
    background-color: #343a40;
    color: #fff;
    text-align: center;
    padding: 1.5rem;
  }

  .footer p {
    margin: 0.5rem 0;
  }

  .footer .container {
    max-width: 1140px;
    margin: 0 auto;
  }
</style>
