// 定义 system prompt
const systemPrompt = "你是一个专业的程序员，用简单的语言帮助我这个初学者解决问题。";

// 监听输入框内容变化
function attachPrompt() {
  console.log("attachPrompt");
  // 找到输入框（假设输入框的类名或 ID 是已知的）
  const inputBox = document.querySelector("textarea"); // 根据实际情况调整选择器
  if (!inputBox) {
    console.log("未找到输入框");
    return;
  }
  if (inputBox) {
    // 附加 system prompt
    console.log("添加prompt");
    inputBox.value = `${systemPrompt}\n\n${inputBox.value}`;
    inputBox.dataset.promptAdded = true; // 标记已附加，避免重复添加
  }
}

function setInputValue(inputBox, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  ).set;
  Reflect.set(inputBox, "value", value);

  const event = new Event("input", { bubbles: true });
  inputBox.dispatchEvent(event);
}


// // 监听输入框的聚焦事件
// document.addEventListener("focus", attachPrompt, true);

// // 监听发送按钮点击事件
// const sendButton = document.querySelector("button.send-button"); // 根据实际情况调整选择器
// if (sendButton) {
//   sendButton.addEventListener("click", attachPrompt);
// }
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const inputBox = document.querySelector("textarea"); // 重新查找输入框
        if (inputBox) {
          // 输入框已加载，开始监听键盘事件
          inputBox.addEventListener("keydown", (event) => {
            if (event.key === 'Enter' && !event.shiftKey) { // 检查是否按下回车键（且没有按下 Shift 键）
              // event.preventDefault(); // 阻止默认行为
  
              // 附加 system prompt
              if (!inputBox.dataset.promptAdded) {
                setInputValue(inputBox, `${systemPrompt}\n\n${inputBox.value}`);
                inputBox.dataset.promptAdded = true; // 标记已附加
              }
              console.log("已附加 prompt", inputBox.value);
              // 手动触发发送逻辑（假设发送按钮的类名是 .send-button）
              const sendButton = document.querySelector("button.send-button");
              if (sendButton) {
                sendButton.click(); // 模拟点击发送按钮
              }
  
              console.log("已附加 prompt 并发送内容");
            }
          });
  
          observer.disconnect(); // 停止监听
        }
      }
    });
  });
  
  // 开始监听 DOM 变化
  observer.observe(document.body, { childList: true, subtree: true });