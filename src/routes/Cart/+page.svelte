<script>
    export let data;
    import Items from '$lib/Components/items.svelte';

    let total = data.items.filter(item => item.cart).reduce((sum, item) => sum + item.price, 0);
</script>

<h1 class="text-center mb-4">Your <em class="text-primary">Shopping Cart</em></h1>

<div class="row">
    <div class="col-lg-8">
        <h2 class="mb-4">Items in your cart</h2>
        <div class="row g-4">
            {#each data.items.filter(item => item.cart) as item}
            <div class="col-sm-6 col-md-4">
                <div class="card shadow-lg rounded-3 overflow-hidden d-flex flex-column">
                    <Items {item} />
                    <div class="card-body p-4 flex-grow-1">
                        <h5 class="card-title">{item.name}</h5>
                        <p class="card-text">{item.description}</p>
                        <p class="card-text"><strong>${item.price.toFixed(2)}</strong></p>
                        <a href="/items/{item.id}" class="btn btn-primary w-100">View Item</a>
                    </div>
                </div>
            </div>
            {/each}
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card shadow-lg rounded-3 p-4">
            <h2 class="mb-4">Order Summary</h2>
            <p class="mb-2">Total Items: {data.items.filter(item => item.cart).length}</p>
            <p class="mb-4">Total Price: <strong>${total.toFixed(2)}</strong></p>
            <a href="/checkout" class="btn btn-success btn-lg w-100 mb-4 shadow-lg hover-shadow-lg">Proceed to Checkout</a>
            <a href="/Items" class="btn btn-primary btn-lg w-100 shadow-lg hover-shadow-lg">Keep Shopping</a>
        </div>
    </div>
</div>

<style>
    .card {
        border: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
    }

    .card-body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #004085;
    }

    .btn-success {
        background-color: #28a745;
        border-color: #28a745;
        transition: all 0.3s ease;
    }

    .btn-success:hover {
        background-color: #218838;
        border-color: #1e7e34;
    }

    .shadow-lg {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .text-primary {
        color: #007bff;
    }

    .mb-4, .mb-5 {
        margin-bottom: 1.5rem;
    }

    .w-100 {
        width: 100%;
    }
</style>
