document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('promptInput');
    const saveBtn = document.getElementById('saveBtn');
  
    // 读取存储的 prompt
    chrome.storage.sync.get('customPrompt', (data) => {
      if (data.customPrompt) {
        promptInput.value = data.customPrompt;
      }
    });
  
    // 保存用户输入的 prompt
    saveBtn.addEventListener('click', () => {
      const userPrompt = promptInput.value.trim();
      if (userPrompt) {
        chrome.storage.sync.set({ customPrompt: userPrompt }, () => {
          console.log('Prompt saved:', userPrompt);
          alert('Custom prompt saved!');
        });
      } else {
        alert('Please enter a valid prompt.');
      }
    });
  });
  