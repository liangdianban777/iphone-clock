// 色彩基础 Token｜foundation基础
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  
  grey100: '#F7F7F7',
  grey500: '#9999A0',
  grey550: '#3A3A3C',
  grey600: '#272728',
  grey650: "#2C2C2E",
  grey700: '#1C1C1E',

  green500: '#0b2a12d8',
  green600: '#00D351',
  green700: '#42E369',

  orange500: '#321D08',
  orange600: '#FF8A35',
}

// 语义 Token｜semantic语义化
const semantic = {
  text: {
    primary: colors.grey100,
    secondary: colors.grey500,
  },
  success: {
    default: colors.green500,
    strong: colors.green600,
  },
  warning: {
    default: colors.orange500,
    strong: colors.orange600,
  },
  cancel: {
    // default: colors.grey700,
    default: colors.grey650,
    strong: colors.white,
  },
  border: {
    normal: colors.grey600,
  }
}

// 组件主题 Token｜component组件
const component = {
  button: {
    // 绿色主题按钮
    primary: {
      background: semantic.success.default,
      text: semantic.success.strong,
    },
    // 灰色主题按钮
    secondary: {
      background: semantic.cancel.default,
      text: semantic.cancel.strong,
    },
    // 橙色主题按钮
    warning: {
      background: semantic.warning.default,
      text: semantic.warning.strong,
    },
    // 橙色播放主题按钮
    active: {
      background: colors.black,
      text: semantic.warning.strong,
    }
  },
  timePicker: {
    overlay: {
      dark: colors.grey700,
      evaluated: colors.grey650,
    }
  },
  settingCard: {
    backgroundColor: {
      evaluated: colors.grey650,
      dark: colors.grey700,
    },
  }
}


export const theme = {
  colors,
  semantic,
  component,
};