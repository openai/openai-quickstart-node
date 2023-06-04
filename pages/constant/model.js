// 3.5 模型
export const MODEL_3_5 = {
  TURBO_3_5: "gpt-3.5-turbo", // 优化了聊天，成本是 text-davinci-003 的 1 / 10
  TURBO_3_5_03_01: "gpt-3.5-turbo-0301", // 上面的一个快照版本
  TEXT_DAVINCI_003: "text-davinci-003", // 似乎，擅长、长文输出，，
  TEXT_DAVINCI_002: "text-davinci-002", // 相比 003 ：使用监督微调而不是强化学习进行训练
  CODE_DAVINCI_002: "code-davinci-002", // 适合代码相关任务 ， 8000 个 token
};
