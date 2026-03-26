const API_URL = 'http://localhost:3001';

document.getElementById('save').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const type = document.getElementById('type').value;

  try {
    const response = await fetch(`${API_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: tab.url,
        type,
        userId: 'demo-user'
      })
    });

    if (response.ok) {
      showStatus('✅ Saved successfully!', 'success');
    } else {
      showStatus('❌ Failed to save', 'error');
    }
  } catch (error) {
    showStatus('❌ Error: ' + error.message, 'error');
  }
});

document.getElementById('saveSelection').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: 'getSelection' }, async (response) => {
    if (response && response.text) {
      const type = document.getElementById('type').value;
      
      try {
        const res = await fetch(`${API_URL}/api/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: tab.url,
            type,
            userId: 'demo-user',
            highlights: [{ text: response.text }]
          })
        });

        if (res.ok) {
          showStatus('✅ Selection saved!', 'success');
        }
      } catch (error) {
        showStatus('❌ Error: ' + error.message, 'error');
      }
    }
  });
});

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  setTimeout(() => {
    status.textContent = '';
    status.className = 'status';
  }, 3000);
}