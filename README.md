# 1. Overview
- Created using `create-react-app` v3
- Use stock library for UI which is based on `styled-components`, allowing customisation with `styled`.
- Use library abstracting `redux`, allowing quick implementation of effects, mostly network requests.
- Mocks with `faker` and tests with `jest` and

# 2. Getting started
`yarn`

`yarn start`

On a separate terminal

`yarn test --watchAll`

# 3. Ecosystem
## a. Base components
React
- `react` 16 and `react-dom`. All components are (and should be added) using hooks and functional components.
- `react-router` to handle url/ page component matching. Use `Suspend` to render page components when opening matching route instead of eager.
- `react-scripts` for development tools (linter, jest, cli, etc.).

Types
- `typescript` 3.5 at the time of boilerplate creation. Don't hesitate to bump up typescript version and accomodate decprecated changes if the updated version provide useful features/ fixes.
- Select libraries with strong types in mind:
  - shipped with `index.d.ts`
  - DefinitelyTyped package exists, e.g. `@types/library-name`
  - Simple enough to ignore types with a `declare module`

## b. UI & Extending UI
Grommet
- `grommet` v2 allows quick prototyping with little tinkering with styles, due to abundance of built-in components.
- Types support
- Use `styled-components` which allow customisation to a certain degree.
- Allow customisation that `grommet` developers build in, using a simple object and nested `<Grommet>` components.

`src/components`
- Custom components for specific purposes: `ErrorBoundary`, `PaginatedTable`, `Modal`, `Loading`, etc.
- Some extended component from `grommet` cores, some from other libraries, some custom.
- Use `styled-components`
- Should be as generic as possible, and re-usable in many places. Should not contain logic tied to specific data format.
- For example, a component that renders user profile menu should go under `src/pages/user`. Instead build a generic menu that renders given array of title/ contents, and let `src/pages/user` imports it.

`src/pages`
- Create page component that match an entire route.
- Subpages go here.
- Reuse many of `src/components` components, refactor into `src/components` if found use case of multiple usages.

## c. Effects
`ctrlplusb/easy-peasy`
- Redux action-reducers under the hood.
- Abstract a lot of action creators and state reducers, allow quick implementation of new effects, e.g. new backend endpoints get/post, while maintaining flux pattern.
- Each store under `src/store` will be an index under the app general `store` tree. For example `user.ts` will handle action-reducers for `store.user`.
- Each store requires a type declaration as an interface. This interface includes declaration of init state and all actions/thunks to transform it.
- `initState` is preferably declared separately, and spreaded `{ ...initState, }` into the final exported store.
- `thunk` and `action` are written in a imperative way, modifying the `store` argument. Under the hood, `easy-peasy` models create a copy of previous `store`, run our functions against it, and replace into next `store`.
- Typecheck helps with minimising mistakes, as long as we are aware of the data shape coming from backend and type them properly in `src/backend`.

Connect
- `store` tree/subtree are mapped into components using hooks: `useStore`.
- `useStore` allows a callback for us to destructure whatever part of the store however we want. However, to keep minimal confusion and data flow integrity, keep this callback minimal and try to not change the naming convention.
- e.g. `const { articlesById } = useStore(store => ({ articlesById: store.articles.byId }))`
- `useStore` wraps `useMemo`/`useEffect` under the hood. Therefore the destructured object given to the component will match `initState` and then later the actual data, when the network request promise is eventually resolved. Take this in consideration when rendering data. Avoid changing type/structure of sub `store` to avoid `undefined` and `null` dereferencing.
- `useActions` allows mapping `actions` and `thunk` to components. Use this when a user should invoke whatever eventually becoming a network request.

## e. Auxilliary functions
- Data transforming, working with types/classes, etc. go under `src/utils/functions.ts`
- These are simple, In -> Out function that do not tie to any effects.

## f. Mocks & Tests
Effect tests
- `easy-peasy` built with dep injection feature in order to test effects, such as network request.
- This is achieved by: actual store is created with our network-tied `src/backend` module. When writing tests, we can hijack store creation with `createStore`, manually inject a fake `src/store/__mocks__/api.ts` into the test, and run it off fake data.
- Use `faker` to mock the response as close and cover as many cases as necessary, put under `__mocks__` or respective folder.
- `__tests__` of respective folder will import mocks and run tests off of pre-defined test cases.

There are no component or browser tests in place.

# 4. Examples
## a. Connecting effects and renders together in auth flow

## b. Eager fetch

## c. Lazy fetch
