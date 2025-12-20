import { ScrollLockContext, ScrollLockContextValue } from '@/contexts/ScrollLockContext';
import { PropsWithChildren, useState } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

interface Props {
    ScrollViewStyle?: StyleProp<ViewStyle>;
}

const ScrollLockProvider: React.FC<PropsWithChildren<Props>> = ({ ScrollViewStyle, children }) => {
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const value: ScrollLockContextValue = {
        lock: () => setScrollEnabled(false),
        unlock: () => setScrollEnabled(true),
    };

    return (
        <ScrollLockContext.Provider value={value}>
            <ScrollView
                style={ScrollViewStyle}
                scrollEnabled={scrollEnabled}
            >
                {children}
                  </ScrollView>
        </ScrollLockContext.Provider>
    )
}

export default ScrollLockProvider;
