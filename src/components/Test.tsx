import { mergeProps } from 'solid-js';
import type { Component } from 'solid-js';

interface Test {
  msg?: string;
}

// reactivity not like destrutuing (vue 😂)
const Test: Component<Test> = (props) => {
  const merged = mergeProps({ msg: 'iu ❤️' }, props)

  return <h1>Test Component {merged.msg}</h1>
};

export default Test;
