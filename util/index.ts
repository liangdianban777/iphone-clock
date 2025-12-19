import { ActiveTimer } from '@/types'

function parseDuration(ms: number) {
  const sec = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  return { h, m, s };
}

export function formatDurationClock(ms: number): string {
  const { h, m, s } = parseDuration(ms);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  if (m > 0) {
    return `${m}:${String(s).padStart(2, '0')}`;
  }
  return String(s);
}

export function formatDurationDigital(ms: number): string {
  const { h, m, s } = parseDuration(ms);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  if (m > 0) {
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `00:${String(s).padStart(2, '0')}`;
}


export function formatDurationText(ms: number): string {
  const { h, m, s } = parseDuration(ms);
  if (h > 0) {
    return `${h}小时${String(m).padStart(2, '0')}分钟${String(s).padStart(2, '0')}秒`;
  }
  if (m > 0) {
    return `${m}分钟${String(s).padStart(2, '0')}秒`;
  }
  return `${s}秒`;
}

export function formatTimeHM(ms: number): string {
  const date = new Date(ms);
  const h = date.getHours();
  const m = date.getMinutes();

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function getRemainingMs(timer: ActiveTimer, now = Date.now()) {
  if (timer.status === 'paused' && timer.pausedAt == null) {
    return timer.total;
  }

  const elapsed =
    timer.status === 'running'
      ? now - timer.startedAt - timer.accumulatedPause
      : timer.pausedAt! - timer.startedAt - timer.accumulatedPause;

  return Math.max(0, timer.total - elapsed);
}

export function getFinishTime(timer: ActiveTimer, now = Date.now()) {
  if (timer.status !== 'running') {
    return timer.startedAt + timer.total + timer.accumulatedPause + now - timer.pausedAt!;
  }
    return timer.startedAt + timer.total + timer.accumulatedPause;
}

export const getNextTickDelayMs = (timer: ActiveTimer, now = Date.now()) => {
  let delay = null;
  
  if (timer.status === 'running') {
    const remainingMs = getRemainingMs(timer, now);
    if (remainingMs <= 0) return null;

    // 你用的是 ceil(remainingMs/1000)，
    // 那么当 remainingMs 从 (k*1000 + ε) 变成 (k*1000) 时，显示就会减 1
    // 距离下一次变化的时间就是 remainingMs % 1000
    const mod = remainingMs % 1000;

    // 如果刚好整除，说明马上就要跳变（或刚跳变），给一个很小的延迟避免 0ms 死循环
    delay = mod === 0 ? 1000 : mod;
  }

  if (timer.status === 'paused') {
    // 对齐到“下一分钟整点”
    // const msToNextMinute = 60000 - (now % 60000);
    // delay = msToNextMinute === 0 ? 60000 : msToNextMinute;
    delay = 5000;
  }

  return delay;
}