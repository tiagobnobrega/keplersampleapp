import {
  Image,
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewProps,
} from 'react-native';
import {
  attachSubComponents,
  scaleSize,
} from '@website-monorepo/libs-util-core';

import {
  createContext,
  memo,
  type ReactNode,
  type RefObject,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { chevronRightWhite } from '@website-monorepo/libs-ui-core';
import { TVFocusGuideView } from '@amzn/react-native-kepler';
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from '@amzn/react-native-reanimated';
import { STYLE } from '../constants';

const CONTENT_ANIM = {
  DELAY: 100,
  DURATION: 400,
} as const;

export type SidebarItemProps = TouchableOpacityProps & {
  elRef?: RefObject<TouchableOpacity>;
  isActive: boolean;
  label: string;
  renderIcon: ({
    isActive,
    isFocused,
  }: {
    isActive: boolean;
    isFocused: boolean;
  }) => ReactNode;
};
const Item = ({
  elRef,
  isActive,
  label,
  children,
  renderIcon,
  ...touchableProps
}: SidebarItemProps) => {
  const [isFocused, setFocused] = useState(false);
  const sidebarContext = useSidebarContext();
  const mode = sidebarContext.mode;
  const IconComponent = useMemo(
    () => renderIcon({ isActive, isFocused }),
    [isFocused, isActive, renderIcon],
  );

  const labelWidth = useSharedValue(500);
  useEffect(() => {
    const modeWidth = mode === 'expanded' ? 500 : 0;
    labelWidth.value = withDelay(
      CONTENT_ANIM.DELAY,
      withTiming(modeWidth, {
        duration: CONTENT_ANIM.DURATION,
        easing: Easing.out(Easing.exp),
        reduceMotion: ReduceMotion.System,
      }),
    );
  }, [mode]);

  return (
    <TouchableOpacity
      ref={elRef}
      activeOpacity={1}
      {...touchableProps}
      style={[
        styles.item,
        isActive && styles.itemActive,
        mode !== 'collapsed' && isFocused && styles.itemFocused,
      ]}
      onFocus={(...args) => {
        setFocused(true);
        if (touchableProps.onFocus) touchableProps.onFocus(...args);
      }}
      onBlur={(...args) => {
        setFocused(false);
        if (touchableProps.onBlur) touchableProps.onBlur(...args);
      }}
    >
      <View
        style={[
          styles.itemIndicator,
          isActive && styles.itemIndicatorActive,
          isActive && isFocused && styles.itemIndicatorActiveFocused,
        ]}
      ></View>
      <View
        style={[
          styles.itemIconContainer,
          isActive && styles.itemIconContainerActive,
          isFocused && styles.itemIconContainerFocused,
        ]}
      >
        {IconComponent}
      </View>
      <View style={[styles.itemLabelContainer]}>
        <Animated.Text
          style={[
            styles.itemLabel,
            isActive && styles.itemLabelActive,
            isFocused && styles.itemLabelFocused,
            { maxWidth: labelWidth },
          ]}
          numberOfLines={1}
        >
          {label}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const Gap = () => {
  return <View style={styles.gap} />;
};

const Space = () => {
  return <View style={styles.space} />;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export type SidebarHandleProps = TouchableOpacityProps;
const Handle = ({ ...touchableProps }: SidebarHandleProps) => {
  const { mode } = useSidebarContext();
  const width = useSharedValue(0);
  const paddingRight = useSharedValue(0);

  useEffect(() => {
    const modeWidth = mode === 'hidden' ? scaleSize(60) : 0;
    const modePR = mode === 'hidden' ? scaleSize(12) : 0;
    width.value = withTiming(modeWidth, {
      duration: 200,
      easing: Easing.out(Easing.exp),
      reduceMotion: ReduceMotion.System,
    });
    paddingRight.value = withTiming(modePR, {
      duration: 200,
      easing: Easing.out(Easing.exp),
      reduceMotion: ReduceMotion.System,
    });
  }, [mode]);

  return (
    <AnimatedTouchable
      activeOpacity={1}
      {...touchableProps}
      style={[
        touchableProps.style,
        styles.handle,
        { width, paddingRight, zIndex: mode === 'hidden' ? 0 : -1 },
      ]}
    >
      <Image source={chevronRightWhite} style={styles.handleIcon} />
    </AnimatedTouchable>
  );
};

export type SidebarContentProps = ViewProps & { children: ReactNode };
const Content = ({ children, ...viewProps }: SidebarContentProps) => {
  const { mode } = useSidebarContext();
  const width = useSharedValue(STYLE.GLOBAL_NAV_WIDTH);
  const borderWidth = useSharedValue(3);
  const paddingRight = useSharedValue(0);
  useEffect(() => {
    const modeWidthMap = {
      none: 0,
      disabled: STYLE.GLOBAL_NAV_WIDTH,
      hidden: 0,
      collapsed: STYLE.GLOBAL_NAV_WIDTH,
      expanded: scaleSize(400),
    } as const;
    const modeWidth = modeWidthMap[mode];
    // width.value = withSpring(modeWidth);
    width.value = withDelay(
      CONTENT_ANIM.DELAY,
      withTiming(modeWidth, {
        duration: CONTENT_ANIM.DURATION,
        easing: Easing.out(Easing.exp),
        reduceMotion: ReduceMotion.System,
      }),
    );
    borderWidth.value = withDelay(
      modeWidth > 0 ? 0 : CONTENT_ANIM.DELAY + CONTENT_ANIM.DURATION,
      withTiming(modeWidth > 0 ? 3 : 0, { duration: 1 }),
    );
    const pr = mode === 'expanded' ? scaleSize(48) : 0;
    paddingRight.value = withTiming(pr, { duration: CONTENT_ANIM.DURATION });
  }, [mode]);

  return (
    <Animated.View
      {...viewProps}
      style={[
        styles.sidebar,
        mode === 'expanded' && styles.sidebarExpanded,
        viewProps.style,
        { width, borderWidth, paddingRight: paddingRight },
      ]}
    >
      {mode === 'disabled' ? null : children}
    </Animated.View>
  );
};

type SidebarTvFocusGuideProps = {
  children: ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
};
const SidebarTvFocusGuide = memo(
  ({ children, onFocus, onBlur }: SidebarTvFocusGuideProps) => {
    const { mode } = useSidebarContext();

    if (mode === 'none') return null;
    return (
      /*@ts-expect-error TVFocusGuideView types are broken*/
      <TVFocusGuideView
        style={{
          height: '100%',
        }}
        autoFocus={true} //TODO: This is not working properly. Why??
        onFocus={onFocus}
        onBlur={onBlur}
        trapFocusUp={true}
        trapFocusDown={true}
      >
        {children}
      </TVFocusGuideView>
    );
  },
);

export type SidebarMode =
  | 'collapsed'
  | 'expanded'
  | 'hidden'
  | 'disabled'
  | 'none';
type SidebarContextState = {
  mode: SidebarMode;
};
const SidebarContext = createContext<SidebarContextState | null>(null);

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'Could not find SidebarContext. Sidebar components must be nested within a Sidebar',
    );
  }
  return context;
}

type SidebarProps = ViewProps & {
  mode?: SidebarMode;
  onFocus?: () => void;
  onBlur?: () => void;
};
export const RootComponent = ({
  mode = 'collapsed',
  onFocus,
  onBlur,
  children,
}: SidebarProps) => {
  // const state = useMemo(() => ({ mode }), [mode]);
  const deferredMode = useDeferredValue(mode);

  return (
    <SidebarContext.Provider value={{ mode: deferredMode }}>
      <SidebarTvFocusGuide onFocus={onFocus} onBlur={onBlur}>
        {children}
      </SidebarTvFocusGuide>
    </SidebarContext.Provider>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    // borderWidth: 3, defined through animation
    borderRightColor: '#6A6A6A',
    borderTopColor: '#000',
    borderBottomColor: '#000',
    borderLeftWidth: 0,
    backgroundColor: '#151515',
    height: '100%',
    paddingTop: scaleSize(20),
    flexDirection: 'column',
    overflow: 'hidden',
  },
  sidebarExpanded: {
    borderTopEndRadius: scaleSize(20),
    borderBottomEndRadius: scaleSize(20),
    borderTopColor: '#6A6A6A',
    borderBottomColor: '#6A6A6A',
    // paddingRight: scaleSize(48),
  },
  sidebarHidden: {
    borderWidth: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#fff',
    // backgroundColor: 'rgba(255,0,0,0.2)',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    height: scaleSize(64),
    paddingLeft: scaleSize(48),
    paddingRight: scaleSize(20),
    marginBottom: scaleSize(12),
    borderTopEndRadius: 9999,
    borderBottomEndRadius: 9999,
  },
  itemActive: {
    // borderLeftColor: '#fff',
  },
  itemFocused: {
    // borderLeftColor: '#fde047',
    backgroundColor: '#FFDE2B',
  },
  itemIconContainer: {
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIconContainerActive: {},
  itemIconContainerFocused: {
    //Change icon color?
  },
  itemLabelContainer: {
    justifyContent: 'center',
    height: scaleSize(40),
  },
  itemLabel: {
    color: '#A8A8A8',
    fontSize: scaleSize(28),
    fontWeight: 'bold',
  },
  itemLabelActive: {
    color: '#fff',
  },
  itemLabelFocused: {
    color: '#000',
  },
  itemIndicator: {
    width: scaleSize(6),
    borderRadius: scaleSize(6),
    height: scaleSize(40),
    marginRight: scaleSize(14),
    backgroundColor: 'transparent',
  },
  itemIndicatorActive: {
    backgroundColor: '#fff',
  },
  itemIndicatorActiveFocused: {
    backgroundColor: '#000',
  },
  gap: {
    flex: 1,
    width: '100%',
  },
  space: {
    height: scaleSize(64),
    width: '100%',
  },
  handle: {
    position: 'absolute',
    height: scaleSize(64),
    bottom: scaleSize(160),
    backgroundColor: '#6A6A6A',
    borderBottomEndRadius: 999,
    borderTopEndRadius: 999,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // paddingRight: scaleSize(12), defined in animation
  },
  handleIcon: {
    width: scaleSize(40),
    height: scaleSize(40),
  },
});

type RootComponentType = typeof RootComponent;

const subComponents = { Item, Gap, Space, Handle, Content };
type SubComponentsTypes = typeof subComponents;

export const Sidebar = attachSubComponents<
  RootComponentType,
  SubComponentsTypes
>('Sidebar', RootComponent, subComponents);
