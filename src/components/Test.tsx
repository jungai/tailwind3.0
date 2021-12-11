import { mergeProps, splitProps, children } from 'solid-js';
import type { Component } from 'solid-js';

interface Test {
  msg?: string;
  name?: string;
  lol?: boolean;

};

// reactivity not like destrutuing (vue 😂)
const Test: Component<Test> = (props) => {
  // const merged = mergeProps({ msg: 'iu ❤️' }, props);
  const [localProps, otherProps] = splitProps(props, ["msg", "children"]);

  // optimize children
  const ch = children(() => localProps.children);

  return <h1>Test Component {localProps.msg} | Children = {ch}</h1>
};

export default Test;
