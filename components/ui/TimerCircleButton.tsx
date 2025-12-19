import { theme } from '@/constants';
import { ScrollLockContext } from '@/contexts/ScrollLockContext';
import React, { PropsWithChildren, useContext } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const SIZE = 70;

const buttonTheme = theme.component.button;

const buttonVariantStyles = {
    success: buttonTheme.primary,
    neutral: buttonTheme.secondary,
    warning: buttonTheme.warning,
    active: buttonTheme.active,
}

interface ButtonBasicProps {
    variant: keyof (typeof buttonVariantStyles);
    size?: number;
    disabled?: boolean;
    onPress?: () => void;
}

type TimerCircleButtonProps = PropsWithChildren<ButtonBasicProps>

const TimerCircleButton: React.FC<TimerCircleButtonProps> = ({ 
    variant,
    size = SIZE,
    disabled = false,
    onPress,
    children,
 }) => {
    const token = buttonVariantStyles[variant || 'neutral'];
    const scrollLockContext = useContext(ScrollLockContext);
    const containerStyle = StyleSheet.create({
        container: {
            width: size,
            aspectRatio: 1,
            borderRadius: size / 2,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }).container;
    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => scrollLockContext?.lock()}
            onPressOut={() => scrollLockContext?.unlock()}
            disabled={disabled}
            style={({ pressed }) => ([
                containerStyle,
                { backgroundColor: token.background },
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
            ])}
        >
            <View style={styles.content}>{children}</View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    disabled: {
        opacity: 0.7,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TimerCircleButton;
