// api-streamline-demo/js-client/index.js

// CONFIGURATION
// Replace this with your actual API Streamline endpoint
const API_BASE_URL = 'https://apistreamline.com/mock/YOUR_PROJECT_ID';
const RESOURCE = 'users'; // The resource you defined in the dashboard

const ENDPOINT = `${API_BASE_URL}/${RESOURCE}`;

/**
 * 1. GET - Fetch all items
 */
async function fetchAllItems() {
  console.log('🔄 Fetching all items...');
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    console.log('✅ Success! Found', data.length, 'items.');
    console.log('Sample item:', data[0]);
    return data;
  } catch (error) {
    console.error('❌ Error fetching items:', error);
  }
}

/**
 * 2. POST - Create a new item
 */
async function createItem(newItem) {
  console.log('\n➕ Creating new item...');
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    console.log('✅ Created item:', data);
    return data;
  } catch (error) {
    console.error('❌ Error creating item:', error);
  }
}

/**
 * 3. PATCH - Update an item
 */
async function updateItem(id, updates) {
  console.log(`\n✏️ Updating item ${id}...`);
  try {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    console.log('✅ Updated item:', data);
    return data;
  } catch (error) {
    console.error('❌ Error updating item:', error);
  }
}

/**
 * 4. DELETE - Remove an item
 */
async function deleteItem(id) {
  console.log(`\n🗑️ Deleting item ${id}...`);
  try {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log('✅ Item deleted successfully');
    } else {
      console.error('❌ Failed to delete item');
    }
  } catch (error) {
    console.error('❌ Error deleting item:', error);
  }
}

// --- RUN DEMO ---
async function runDemo() {
  // 1. List
  const items = await fetchAllItems();
  
  if (items && items.length > 0) {
    // 2. Create
    const newItem = await createItem({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'developer'
    });

    if (newItem && newItem.id) {
      // 3. Update
      await updateItem(newItem.id, { role: 'senior developer' });

      // 4. Delete
      await deleteItem(newItem.id);
    }
  }
}

// Run the demo if executed directly
runDemo();
