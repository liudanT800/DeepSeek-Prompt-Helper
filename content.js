function setInputValue(input, value) {
  let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
  nativeInputValueSetter.call(input, value);

  let event = new Event("input", { bubbles: true });
  input.dispatchEvent(event);
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const inputBox = document.querySelector("textarea"); // 重新查找输入框
        if (inputBox) {
          // 输入框已加载，开始监听键盘事件
          inputBox.addEventListener("keydown", (event) => {
            if (event.key === 'Enter' && !event.shiftKey) { // 检查是否按下回车键（且没有按下 Shift 键）
              event.preventDefault(); // 阻止默认行为
              // 附加 system prompt
              if (!inputBox.dataset.promptAdded) {
                chrome.storage.sync.get('customPrompt', (data) => {
                  if (data.customPrompt) {
                    console.log("读取存储的 prompt", data.customPrompt);
                    setInputValue(inputBox, `${data.customPrompt}\n\n${inputBox.value}`);
                    console.log("已附加 prompt", inputBox.value);
                    // 手动触发发送逻辑（假设发送按钮的类名是 .send-button）
                    const sendButton = document.querySelector(".f6d670.bcc55ca1");
                    if (sendButton) {
                      console.log("准备发送内容:", inputBox.value);
                      sendButton.click(); // 模拟点击发送按钮
                    }
                  }
                });
                inputBox.dataset.promptAdded = true; // 标记已附加
              }
            }
          });
          observer.disconnect(); // 停止监听
        }
      }
    });
  });
  
  // 开始监听 DOM 变化
  observer.observe(document.body, { childList: true, subtree: true });