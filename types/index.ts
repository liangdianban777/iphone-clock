// 铃声
export interface Bell {
  id: string;
  name: string;
  fileUrl: string;
}

// 计时器模板（最近使用）
export interface PresetTimer {
  id: string;
  label: string;
  duration: number; //ms
  bellId: string;
  createdAt: number;
}

// 运行态
export type TimerStatus = 'running' | 'paused';

export interface ActiveTimer {
  id: string;
  presetId: string; 
  total: number;        // ms 总时长
  label: string;
  bellId: string;
  status: TimerStatus;
  startedAt: number;    // ms
  pausedAt?: number;    // ms
  accumulatedPause: number; // ms，已暂停总时长
  remainingAtPaused?: number; // ms，暂停时剩余时长
}

const UNIT_TIME = ['second', 'minute', 'hour'] as const;
export type UNIT_TIME = typeof UNIT_TIME[number];
