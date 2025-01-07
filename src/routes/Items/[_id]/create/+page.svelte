<script>
    import { page } from '$app/stores';

    let _id = '';
    let item = {};
    let username = 'Anonymous';
    let rating = 1;
    let text = '';
    let form = {};

    $: _id = $page.params._id;

    
    async function handleSubmit() {
        const formData = new FormData();
        formData.append('_id', _id); 
        formData.append('username', username);
        formData.append('rating', rating);
        formData.append('text', text);

        const response = await fetch(`/Items/${_id}/create`, {
            method: 'POST',
            body: formData,
        });

        //server response "saved as json
        form = await response.json();

        if (form.success) {
            username = 'Anonymous';
            rating = 1;
            text = '';
        }
    }

</script>

<h1>Write a Review</h1>

<form on:submit|preventDefault={handleSubmit} class="review-form">
    <input type="hidden" id="id" bind:value={_id} />

    <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} class="form-control" />
    </div>

    <div class="form-group">
        <label for="rating">Rating:</label>
        <select id="rating" bind:value={rating} class="form-control">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>

    <div class="form-group">
        <label for="text">Review:</label>
        <textarea id="text" bind:value={text} required class="form-control"></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Submit Review</button>
</form>

{#if form?.success}
    <div class="alert alert-success mt-3" role="alert">
        <strong>YIPPY!</strong> Review has been successfully submitted!
    </div>
{:else if form?.error}
    <div class="alert alert-danger mt-2" role="alert">
        <strong>OH NO an Error:</strong> {form.error}
    </div>
{/if}




<style>
    .review-form {
        max-width: 600px;
        margin: auto;
    }
    .form-group {
        margin-bottom: 1rem;
    }
    .form-control {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
    }
    .btn {
        display: block;
        width: 100%;
        padding: 0.75rem;
    }
    .alert {
        text-align: center;
    }
</style>

  

