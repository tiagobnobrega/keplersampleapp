import {Dimensions} from 'react-native';
import {ComponentType} from 'react';

export const scaleSize = (size: number) => {
  const scale = Dimensions.get('window').width / 1920;
  return size * scale;
};

/**
 * Attaches subcomponents to a parent component for use in
 * composed components. Example:
 *
 * <Parent>
 *    <Parent.Title>abc</Parent.Title>
 *    <Parent.Body prop1="foobar"/>
 * </Parent>
 *
 *
 * This function also sets displayname on the parent component
 * and all children component, and has the correct return type
 * for typescript.
 *
 * Usage:
 * export const Modal = attachSubComponents(
 *     "Modal",
 *     (props: ModalProps) => { ... },
 *     { Header, Content, Footer, Title, Subtitle, HeroImage, ... }
 * );
 * @param displayName topLevelComponent's displayName
 * @param topLevelComponent the parent element of the composed component
 * @param otherComponents an object of child components (keys are the names of the child components)
 * @returns the top level component with otherComponents as static properties
 */
export function attachSubComponents<
  C extends ComponentType<any>,
  O extends Record<string, ComponentType<any>>,
>(displayName: string, topLevelComponent: C, otherComponents: O): C & O {
  topLevelComponent.displayName = displayName;
  Object.values(otherComponents).forEach(
    (component) =>
      (component.displayName = `${displayName}.${component.displayName}`),
  );

  return Object.assign(topLevelComponent, otherComponents);
}
