import { PresetTimer } from "@/types";

const SECOND = 1000;

// mock 数据
export const recentPresets: PresetTimer[] = [
  {
    id: "1",
    label: "10秒小憩",
    duration: 10 * SECOND,
    bellId: "1",
    createdAt: Date.now(),
  },
  {
    id: "2",
    label: "20秒甜甜圈",
    duration: 20 * SECOND,
    bellId: "2",
    createdAt: Date.now(),
  },
  {
    id: "3",
    label: "30秒速充",
    duration: 30 * SECOND,
    bellId: "3",
    createdAt: Date.now(),
  },
  {
    id: "4",
    label: "40秒灵感闪",
      duration: 40 * SECOND,
    bellId: "4",
    createdAt: Date.now(),
  },
  {
    id: "5",
    label: "50秒打个气",
    duration: 50,
    bellId: "5",
    createdAt: Date.now(),
  },
  {
    id: "6",
    label: "1分钟能量包",
    duration: 60 * SECOND,
    bellId: "6",
    createdAt: Date.now(),
  },
  {
    id: "7",
    label: "1分15秒奶茶时间",
    duration: 75 * SECOND,
    bellId: "7",
    createdAt: Date.now(),
  },
  {
    id: "8",
    label: "1分30秒小确幸",
    duration: 90 * SECOND,
    bellId: "8",
    createdAt: Date.now(),
  },
  {
    id: "9",
    label: "2分钟番茄片",
    duration: 120 * SECOND,
    bellId: "9",
    createdAt: Date.now(),
  },
  {
    id: "10",
    label: "2分半轻松一下",
    duration: 150 * SECOND,
    bellId: "10",
    createdAt: Date.now(),
  },
];
