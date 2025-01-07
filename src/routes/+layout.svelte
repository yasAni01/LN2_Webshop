<script>
  import "./styles.css";

  let searchQuery = ''; // Variable to bind the search input
  let suggestions = [];
  let showSuggestions = false;

  function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission
    if (searchQuery.trim() !== '') {
      console.log('Search query:', searchQuery);
      // Redirect to a search results page or perform search action
      window.location.href = `/${encodeURIComponent(searchQuery)}`;
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
      { name: 'My Cart', url: '/cart' },
      { name: 'Locations', url: '/Locations' },
      { name: 'Home', url: '/' },
     { name: 'Create Item', url: '/Items/itemcreate' }, 

    ];
    return pages.filter((page) =>
      page.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  function handleSuggestionClick(suggestion) {
    searchQuery = suggestion.name;
    showSuggestions = false;
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
          <a class="nav-link" href="/Cart">My Cart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Locations">Locations</a>
        </li>
      </ul>
      <form class="d-flex position-relative search-form" role="search" onsubmit={handleSearch}>
        <input
          class="form-control me-2 border-0 rounded-pill shadow-sm"
          type="search"
          placeholder="Search"
          aria-label="Search"
          bind:value={searchQuery}
          oninput={handleInput}
        />
        <button class="btn btn-success rounded-pill shadow-sm" type="submit">Search</button>
        {#if showSuggestions}
          <ul class="suggestions-list position-absolute mt-2">
            {#each suggestions as suggestion}
              <li>
                <button
                  type="button"
                  class="suggestion-item"
                  onclick={() => handleSuggestionClick(suggestion)}
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

<div class="container mt-" style="margin-top: calc(70px + 1rem);">
  <slot />
</div>
<footer class="footer mt-4">
  <div class="footer-container">
    <div class="footer-about">
      <h4>About Us</h4>
      <p>We’re here to bring joy to your day. Our locations are crafted with love to ensure a memorable experience for everyone.</p>
    </div>
    <div class="footer-links">

    <div class="footer-social">
      <h4>Follow Us</h4>
      <div class="social-icons">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
        </a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
  </div>
</footer>

<style>

  .search-form {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto; /* Centering in its container */
  }

 
  .footer {
    background: linear-gradient(45deg, #441158, rgb(81, 25, 58));
    color: #ecf0f1;
    padding: 2.5rem 1rem;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
  }

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer h4 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ecf0f1;
    border-bottom: 2px solid #e74c3c;
    display: inline-block;
    padding-bottom: 0.5rem;
  }

  .footer-about p {
    line-height: 1.8;
    color: #bdc3c7;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
  }

  .footer-links li {
    margin-bottom: 0.8rem;
  }

  .footer-links a {
    text-decoration: none;
    color: #e74c3c;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: #f39c12;
  }

  .footer-social .social-icons {
    display: flex;
    gap: 1.5rem;
  }

  .footer-social img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ecf0f1;
    padding: 0.3rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .footer-social img:hover {
    transform: scale(1.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  .footer-bottom {
    margin-top: 2.5rem;
    text-align: center;
    color: #bdc3c7;
    font-size: 0.9rem;
  }

  .footer-bottom p {
    margin: 0;
  }

  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .footer-about,
    .footer-links,
    .footer-social {
      flex: none;
      width: 100%;
      max-width: 400px;
    }
  }

  /* General Navbar Styling */
  .navbar {
    background: linear-gradient(45deg, #8a317e, #ef8dda);
    padding: 1rem 1.5rem;
    margin-bottom: 120pt;
  }

  .navbar-brand {
    font-size: 1.5rem;
    color: #fff;
  }

  .navbar-nav .nav-link {
    color: #fff;
    margin: 0 0.5rem;
    transition: color 0.3s ease;
  }

  .navbar-nav .nav-link:hover,
  .navbar-nav .nav-link.active {
    color: #ffeb3b;
    font-weight: 600;
  }

  /* Search Form Styling */
  .search-form {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    max-width: auto;
  }

  .search-form input {
    flex: auto;
    max-width: 100%; /* Prevents overflow */
    height: 20pt; /* Keeps it slim */
    border: 1px solid #ddd; /* Neutral border */
    border-radius: 0; /* Removes rounded edges */
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .search-form input:focus {
    outline: none;
    border-color: #ffeb3b; /* Highlighted border color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for focus */
  }

  .search-form button {
    margin-left: 0; /* No gap between input and button */
    padding: 0; /* Removes padding */
    height: 20pt; /* Matches input height */
    border: none; /* Clean button appearance */
    background-color: #ffeb3b; /* Attention-grabbing color */
    color: #333; /* Legible text color */
    font-weight: bold;
    border-radius: 0; /* Removes rounded edges */
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .search-form button:hover {
    background-color: #ffc107; /* Brighter hover color */
    transform: scale(1.05); /* Slight growth for feedback */
  }

  .search-form .suggestions-list {
    position: absolute;
    top: calc(100% + 0.5rem); /* Positioned just below the input */
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: 0.5rem;
    max-height: 200px;
    overflow-y: auto; /* Allows scrolling for long lists */
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .search-form .suggestions-list .suggestion-item {
    width: 100%;
    text-align: left;
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.9rem;
    color: #333;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .search-form .suggestions-list .suggestion-item:hover {
    background-color: #007bff;
    color: #fff;
    border-radius: 0.3rem;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .search-form input {
      font-size: 0.9rem; /* Slightly smaller font size */
    }

    .search-form button {
      padding: 0; /* No padding for tighter spaces */
    }
  }

  @media (max-height: 380px) {
    .search-form {
      flex-direction: column;
      align-items: stretch;
      height: min-content;
    }

    .search-form button {
      width: min-width;
      margin-left: 0;
      margin-top: 0.5rem; /* Add space between stacked elements */
    }
  }
</style>
