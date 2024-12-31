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
        <textarea id="description" name="description" class="form-control" rows="3"></textarea>
    </div>

    <div class="mb-3">
        <label for="warnings" class="form-label">Warnings</label>
        <select id="warnings" name="warnings" class="form-select" multiple>
            <option value="flammable">Flammable</option>
            <option value="fragile">Fragile</option>
            <option value="heavy">Heavy</option>
            <option value="perishable">Perishable</option>
            <option value="toxic">Toxic</option>
        </select>
        <small class="form-text text-muted">Hold down the Ctrl key to select multiple warnings.</small>
    </div>

    <div class="mb-3">
        <label for="image_file_path" class="form-label">Image File Path</label>
        <input id="image_file_path" name="image_file_path" class="form-control" type="text" placeholder="e.g., /images/item.jpg" />
    </div>

    <button type="submit" class="btn btn-primary">Add Item</button>
</form>

