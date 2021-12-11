import type { Component } from "solid-js";
import { createSignal, createEffect, Show, For, Switch, Match, ErrorBoundary, onMount, onCleanup, batch, untrack, on, lazy, Suspense } from 'solid-js';
import TestComponent from './components/Test';
import ResourceComponent from './components/Resources';

// see in network tab
const LazyComponent = lazy(async () => {

  await new Promise(reslove => setTimeout(reslove, 5000));

  return import('./components/Lazy');
});

const ShouldError: Component = () => {
  throw new Error('Hello')

  return <p>ShouldError</p>
};

const App: Component = () => {
  const [count, setCount] = createSignal(1);
  const [count2, setCount2] = createSignal(2);
  const [person, setPerson] = createSignal([{ id: 1, name: 'iu' }, { id: 2, name: 'rose' }]);
  const [photos, setPhotos] = createSignal([]);

  const doubleCount = () => count() * 2;

  // createEffect(() => {
  //   // should not log count1
  //   console.log('count 1', untrack(count));
  //   // console.log('count 2', count2());
  //   console.log('count 2', count2());
  // });
  createEffect(on(count, (count) => {
    console.log('count 1', count);
    console.log('count 2', count2());
  }, { defer: true }));

  // batching section
  const [count3, setCount3] = createSignal(3);
  const [count4, setCount4] = createSignal(4);


  createEffect(() => {
    console.log('count 3', count3());
    console.log('count 4', count4());
  })
  //end batching


  // like vue
  // run only on browser
  onMount(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
    const value = await res.json()
    // console.log('val ->', value)
    setPhotos(value);
  });

  // const timer = setInterval(() => setCount(count() + 1), 1000);
  // onCleanup(() => clearInterval(timer));

  // run after rendering is complete
  // want to modify DOM use *createRenderEffect*
  // createEffect(() => {
  //   console.log("The count is now", count());
  // });

  return (
    <div>
      <div class="text-[tomato]">
        Hello Tailwind3.0 with Solid.js
      </div>
      <hr />
      <Suspense fallback={'loading chunk ....'}>
        <LazyComponent />
      </Suspense>
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

      <hr />
      <TestComponent>
        Hello
      </TestComponent>
      <hr />
      <p onClick={() => setCount3(p => p + 1)}>{`count 3 -> ${count3()}`}</p>
      <p onClick={() => setCount4(p => p + 1)}>{`count 4 -> ${count4()}`}</p>
      <button onClick={() => {
        batch(() => {
          // should log only once
          setCount3(p => p + 1)
          setCount4(p => p + 1)
        })
      }}>both</button>
      <hr />
      <ResourceComponent />
    </div >
  );
};

export default App;
