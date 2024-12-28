<script>
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await fetch("/Items/itemcreate", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            window.location.href = "/Items"; // Redirect to the items list
        } else {
            alert("Failed to create item. Please try again.");
            console.error("Error:", await response.text());
        }
    }
</script>

<a href="/Items">Back</a>
<h1>Add an Item</h1>
<form on:submit={handleSubmit}>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" name="name" class="form-control" type="text" required />
    </div>
  
    <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input id="price" name="price" class="form-control" type="number" step="0.01" required />
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" name="description" class="form-control"></textarea>
    </div>
    <div class="mb-3">
        <label for="warnings" class="form-label">Warnings</label>
        <input id="warnings" name="warnings" class="form-control" type="text" />
    </div>
    <div class="mb-3">
        <label for="reviews" class="form-label">Reviews</label>
        <input id="reviews" name="reviews" class="form-control" type="text" />
    </div>
    <div class="mb-3">
        <label for="image_file_path" class="form-label">Image File Path</label>
        <input id="image_file_path" name="image_file_path" class="form-control" type="text" />
    </div>
    <button type="submit" class="btn btn-primary">Add Item</button>
</form>
