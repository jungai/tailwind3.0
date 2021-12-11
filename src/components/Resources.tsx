import type { Component } from 'solid-js';
import { createResource, createSignal, For, Switch } from 'solid-js';

// like react query, rtk, swr
const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();

const Resources: Component = () => {

  const [users, { mutate, refetch }] = createResource<any[]>(getUsers);

  if (users.loading) <p>loading ....</p>

  {/* return <For each={users()} fallback={'no users'}> */ }
  {/*   {(user) => <p>{user.name}</p>} */ }
  {/* </For> */ }

  return (
    <div>
      <For each={users()} fallback={'no users'}>
        {(user) => <p>{user.name}</p>}
      </For>
      <button class="border-2 border-red-400" onClick={refetch}>refetch</button>
      <button class="border-2 border-red-400" onClick={() => {
        mutate([{ name: 'iu' }])
      }}>mutate</button>
    </div>
  );
};

export default Resources;
