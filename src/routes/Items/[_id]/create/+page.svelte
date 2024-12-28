<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let _id = '';
    let item = {};
    let username = 'Anonymous';
    let rating = 1;
    let text = '';

    // Get the item ID from the URL
    $: _id = $page.params._id;

    onMount(async () => {
        const response = await fetch(`/Items/${_id}`);
        item = await response.json();
    });

    async function handleSubmit() {
        const formData = new FormData();
        formData.append('_id', _id);  // Send the dynamic _id
        formData.append('username', username);
        formData.append('rating', rating.toString());
        formData.append('text', text);

        // Append other item properties as hidden fields
        for (const key in item) {
            if (key !== 'reviews') {
                formData.append(key, item[key]);
            }
        }

        try {
            // Use the dynamic route `/items/[id]/create/` for submission
            const response = await fetch(`/Items/${_id}/create`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert('Review submitted successfully!');
                // Reset the form after successful submission
                username = 'Anonymous';
                rating = 1;
                text = '';
            } else {
                alert(`Failed to submit review: ${result.error}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting your review.');
        }
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: auto;
    }
    label {
        margin-top: 10px;
    }
    input, textarea, select {
        margin-top: 5px;
    }
    button {
        margin-top: 20px;
    }
</style>

<form on:submit|preventDefault={handleSubmit}>
    <label for="id">Product ID:</label>
    <input type="text" id="id" bind:value={_id} readonly />

    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} />

    <label for="rating">Rating:</label>
    <select id="rating" bind:value={rating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>

    <label for="text">Review:</label>
    <textarea id="text" bind:value={text} required></textarea>

    <button type="submit">Submit Review</button>
</form>