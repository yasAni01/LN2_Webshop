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

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid d-flex justify-content-between align-items-center">
    <a class="navbar-brand" href="/">Shopping Today</a>
    <div class="d-flex align-items-center">
      <button
        class="navbar-toggler ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
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
            <button class="nav-link btn" on:click={handleLogout}>Logout</button>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login</a>
          </li>
        {/if}
      </ul>
      <form class="d-flex position-relative" role="search" on:submit={handleSearch}>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          bind:value={searchQuery}
          on:input={handleInput}
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
        {#if showSuggestions}
          <ul class="suggestions-list position-absolute">
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

<div class="container">
  <slot />
</div>

<style>
  .container {
    padding-top: 1rem;
  }

  .suggestions-list {
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1000;
  }

  .suggestion-item {
    cursor: pointer;
    padding: 0.5rem;
    text-align: left;
    width: 100%;
    border: none;
    background: none;
    color: black;
  }

  .suggestion-item:hover {
    background: #f1f1f1;
  }
</style>
