import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
} from 'react';

type SlotProps = HTMLAttributes<HTMLElement>;

export const Slot = ({ children, ...props }: SlotProps) => {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    console.error(
      'Slot component expects a single valid React element as a child',
    );
    return;
  }

  const element = child as ReactElement<any>;

  return cloneElement(child, {
    ...element.props,
    ...props,
  });
};
