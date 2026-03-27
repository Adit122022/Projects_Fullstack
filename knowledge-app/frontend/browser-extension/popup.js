// Knowledge Saver — Browser Extension
const API_URL = 'http://localhost:3000';

// Auto-detect type from URL
function detectType(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'video';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'tweet';
  if (url.endsWith('.pdf')) return 'pdf';
  if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url)) return 'image';
  return 'article';
}

// Populate URL and auto-detect type on popup open
document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Show current URL
  document.getElementById('currentUrl').textContent = tab.url;

  // Auto-detect type
  const type = detectType(tab.url);
  document.getElementById('type').value = type;
});

// Save full page
document.getElementById('save').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const type = document.getElementById('type').value;
  const btn = document.getElementById('save');

  btn.disabled = true;
  btn.textContent = '[ PROCESSING... ]';
  showStatus('TRANSMITTING_DATA_TO_CORE...', 'loading');

  try {
    const response = await fetch(`${API_URL}/api/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: tab.url,
        type,
        userId: 'demo-user'
      })
    });

    if (response.ok) {
      const data = await response.json();
      showStatus(`✅ INJECTED: ${data.title || 'Item saved'}`, 'success');
      btn.textContent = '[ INJECT_COMPLETE ]';
      setTimeout(() => {
        btn.textContent = '[ INJECT_TO_CORE ]';
        btn.disabled = false;
      }, 2000);
    } else {
      const err = await response.json().catch(() => ({}));
      showStatus(`❌ FAILED: ${err.error || 'Unknown error'}`, 'error');
      btn.textContent = '[ INJECT_TO_CORE ]';
      btn.disabled = false;
    }
  } catch (error) {
    showStatus(`❌ CONNECTION_REFUSED: ${error.message}`, 'error');
    btn.textContent = '[ INJECT_TO_CORE ]';
    btn.disabled = false;
  }
});

// Save selected text as highlight
document.getElementById('saveSelection').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const btn = document.getElementById('saveSelection');

  btn.disabled = true;
  btn.textContent = '[ CAPTURING... ]';

  chrome.tabs.sendMessage(tab.id, { action: 'getSelection' }, async (response) => {
    if (response && response.text) {
      const type = document.getElementById('type').value;
      showStatus('CAPTURING_SELECTION...', 'loading');

      try {
        const res = await fetch(`${API_URL}/api/item`, {
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
          showStatus('✅ SELECTION_CAPTURED', 'success');
        } else {
          showStatus('❌ CAPTURE_FAILED', 'error');
        }
      } catch (error) {
        showStatus(`❌ ERROR: ${error.message}`, 'error');
      }
    } else {
      showStatus('⚠️ NO_TEXT_SELECTED', 'error');
    }

    btn.disabled = false;
    btn.textContent = '[ CAPTURE_SELECTION ]';
  });
});

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status visible ${type}`;

  if (type !== 'loading') {
    setTimeout(() => {
      status.className = 'status';
    }, 4000);
  }
}