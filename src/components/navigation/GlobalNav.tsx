import {Sidebar, type SidebarMode} from './Sidebar';
import {scaleSize} from '../shared';
import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  type TouchableOpacity,
  View,
} from 'react-native';
import {STYLE} from '../constants';

// @ts-ignore
import channelGuideBlack from '../../assets/channel-guide-black.png';
// @ts-ignore
import channelGuideGrey from '../../assets/channel-guide-grey.png';
// @ts-ignore
import channelGuideWhite from '../../assets/channel-guide-white.png';
// @ts-ignore
import nowWatchingBlack from '../../assets/now-watching-black.png';
// @ts-ignore
import nowWatchingGrey from '../../assets/now-watching-grey.png';
// @ts-ignore
import nowWatchingWhite from '../../assets/now-watching-white.png';
// @ts-ignore
import onDemandBlack from '../../assets/on-demand-black.png';
// @ts-ignore
import onDemandGrey from '../../assets/on-demand-grey.png';
// @ts-ignore
import onDemandWhite from '../../assets/on-demand-white.png';
// @ts-ignore
import searchBlack from '../../assets/search-black.png';
// @ts-ignore
import searchGrey from '../../assets/search-grey.png';
// @ts-ignore
import searchWhite from '../../assets/search-white.png';
// @ts-ignore
import settingsBlack from '../../assets/settings-black.png';
// @ts-ignore
import settingsGrey from '../../assets/settings-grey.png';
// @ts-ignore
import settingsWhite from '../../assets/settings-white.png';
// @ts-ignore
import userBlack from '../../assets/user-black.png';
// @ts-ignore
import userGrey from '../../assets/user-grey.png';
// @ts-ignore
import userWhite from '../../assets/user-white.png';
// @ts-ignore
import homeBlack from '../../assets/home-black.png';
// @ts-ignore
import homeGrey from '../../assets/home-grey.png';
// @ts-ignore
import homeWhite from '../../assets/home-white.png';
import {useCallback, useEffect, useRef, useState} from 'react';
import React from 'react';

const renderGlobalNavIcon =
  ([icDefault, icActive, icFocused]: ImageSourcePropType[]) =>
  ({isActive, isFocused}: {isActive: boolean; isFocused: boolean}) => {
    let src = icDefault;
    if (isActive) {
      src = icActive;
    }
    if (isFocused) {
      src = icFocused;
    }
    return <Image source={src} style={styles.icon} resizeMode={'contain'} />;
  };

const GN_ITEMS = {
  NOW_WATCHING: 'NOW_WATCHING',
  HOME: 'HOME',
  EPG: 'EPG',
  VOD: 'VOD',
  SEARCH: 'SEARCH',
  SETTINGS: 'SETTINGS',
  SIGN_IN: 'SIGN_IN',
} as const;
export type GnItem = (typeof GN_ITEMS)[keyof typeof GN_ITEMS];

const SIDEBAR_COLLAPSED_ROUTES = [
  GN_ITEMS.HOME,
  GN_ITEMS.EPG,
  GN_ITEMS.VOD,
  GN_ITEMS.SEARCH,
  GN_ITEMS.SETTINGS,
  GN_ITEMS.SIGN_IN,
] as const;
const SIDEBAR_HIDDEN_ROUTES = [GN_ITEMS.NOW_WATCHING] as const;
const SIDEBAR_DISABLED_ROUTES = [] as const;

const getUnfocusedMode = (selectedItem?: GnItem) => {
  // @ts-expect-error Array.includes types are broken
  if (SIDEBAR_COLLAPSED_ROUTES.includes(selectedItem)) {
    return 'collapsed';
    // @ts-expect-error Array.includes types are broken
  } else if (SIDEBAR_HIDDEN_ROUTES.includes(selectedItem)) {
    return 'hidden';
    // @ts-expect-error Array.includes types are broken
  } else if (SIDEBAR_DISABLED_ROUTES.includes(selectedItem)) {
    return 'disabled';
  } else {
    return 'none';
  }
};
export const GlobalNav = () => {
  const [selectedItem, setSelectedItem] = useState<GnItem>(
    GN_ITEMS.NOW_WATCHING,
  );
  const [mode, setMode] = useState<SidebarMode>('hidden');
  const focusOnExpandRef = useRef<TouchableOpacity>(null);

  const handleSidebarFocus = useCallback(() => {
    setMode('expanded');
    focusOnExpandRef?.current?.focus();
  }, []);

  const handleSidebarBlur = useCallback(() => {
    setMode(getUnfocusedMode(selectedItem));
  }, [selectedItem]);

  useEffect(handleSidebarBlur, [handleSidebarBlur]);

  return (
    <View style={styles.wrapper}>
      <Sidebar
        mode={mode}
        onFocus={handleSidebarFocus}
        onBlur={handleSidebarBlur}>
        <Sidebar.Content>
          <Sidebar.Gap />
          <Sidebar.Item
            elRef={focusOnExpandRef}
            isActive={selectedItem === GN_ITEMS.NOW_WATCHING}
            label={'Now Watching'}
            onPress={() => {
              setSelectedItem(GN_ITEMS.NOW_WATCHING);
            }}
            renderIcon={renderGlobalNavIcon([
              nowWatchingGrey,
              nowWatchingWhite,
              nowWatchingBlack,
            ])}
          />
          <Sidebar.Item
            isActive={selectedItem === GN_ITEMS.HOME}
            label={'Home'}
            onPress={() => {
              setSelectedItem(GN_ITEMS.HOME);
            }}
            renderIcon={renderGlobalNavIcon([homeGrey, homeWhite, homeBlack])}
          />
          <Sidebar.Item
            isActive={selectedItem === GN_ITEMS.EPG}
            label={'Channel Guide'}
            onPress={() => {
              setSelectedItem(GN_ITEMS.EPG);
            }}
            renderIcon={renderGlobalNavIcon([
              channelGuideGrey,
              channelGuideWhite,
              channelGuideBlack,
            ])}
          />
          <Sidebar.Item
            isActive={selectedItem === GN_ITEMS.VOD}
            label={'On Demand'}
            onPress={() => {
              setSelectedItem(GN_ITEMS.VOD);
            }}
            renderIcon={renderGlobalNavIcon([
              onDemandGrey,
              onDemandWhite,
              onDemandBlack,
            ])}
          />
          <Sidebar.Item
            isActive={selectedItem === GN_ITEMS.SEARCH}
            label={'Search'}
            onPress={() => {
              setSelectedItem(GN_ITEMS.SEARCH);
            }}
            renderIcon={renderGlobalNavIcon([
              searchGrey,
              searchWhite,
              searchBlack,
            ])}
          />
          <Sidebar.Space />
          <Sidebar.Item
            isActive={selectedItem === GN_ITEMS.SETTINGS}
            label={'Settings'}
            onPress={() => {
              setSelectedItem(GN_ITEMS.SETTINGS);
            }}
            renderIcon={renderGlobalNavIcon([
              settingsGrey,
              settingsWhite,
              settingsBlack,
            ])}
          />
          <Sidebar.Item
            isActive={false}
            label={'Sign In'}
            onPress={() => {
              setSelectedItem(GN_ITEMS.SIGN_IN);
            }}
            renderIcon={renderGlobalNavIcon([userGrey, userWhite, userBlack])}
          />
        </Sidebar.Content>
        <Sidebar.Handle
          onFocus={() => {
            setMode('expanded');
          }}
        />
      </Sidebar>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 99,
    paddingTop: scaleSize(STYLE.GUIDE_PT),
    height: '100%',
  },
  icon: {
    width: scaleSize(40),
    height: scaleSize(40),
  },
});
