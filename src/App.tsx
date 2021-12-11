import type { Component } from "solid-js";
import { createSignal, createEffect, Show, For, Switch, Match, ErrorBoundary, onMount, onCleanup } from 'solid-js';

const ShouldError: Component = () => {
  throw new Error('Hello')

  return <p>ShouldError</p>
};

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [person, setPerson] = createSignal([{ id: 1, name: 'iu' }, { id: 2, name: 'rose' }]);
  const [photos, setPhotos] = createSignal([]);

  const doubleCount = () => count() * 2;

  // like vue
  // run only on browser
  onMount(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
    const value = await res.json()
    console.log('val ->', value)
    setPhotos(value);
  });

  // const timer = setInterval(() => setCount(count() + 1), 1000);
  // onCleanup(() => clearInterval(timer));

  // run after rendering is complete
  // want to modify DOM use *createRenderEffect*
  createEffect(() => {
    console.log("The count is now", count());
  });

  return (
    <div>
      <div class="text-[tomato]">
        Hello Tailwind3.0 with Solid.js
      </div>
      <hr />
      {`current => ${count()}, 2x => ${doubleCount()}`}
      <br />
      <button onClick={() => setCount(val => val + 1)}>click</button>
      <br />
      <hr />
      <Show when={count() === 4} fallback={'ยังครับ'}>
        <p>ว้าว</p>
      </Show>
      <hr />

      {/* it bad cuz they re-create element, use *For Component* */}
      {/* {person().map(val => <p>{val.name}</p>)} */}

      {
        <For each={person()}>
          {(love, _index) => <p>{love.name}</p>}
        </For>
      }
      <hr />
      <Switch fallback={'not an iu or rose cuz i love both'}>
        <For each={person()}>
          {(love, _index) => <Match<boolean> when={love.name === "iu"}>{love.name}</Match>}
        </For>

      </Switch>

      <ErrorBoundary fallback={() => "eiei error"}>
        <ShouldError />
      </ErrorBoundary>

    </div >
  );
};

export default App;
