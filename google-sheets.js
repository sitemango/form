async function submitToSheet(data) {
  const url = CONFIG.googleScriptUrl;
  if (url.includes('REPLACE_WITH_YOUR_DEPLOYMENT_ID')) {
    console.warn('Google Sheets URL not configured. Simulating success.');
    return true; // Simulate success for demo
  }
  try {
    await fetch(url, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    });
    return true;
  } catch (e) {
    console.error(e); return false;
  }
}
