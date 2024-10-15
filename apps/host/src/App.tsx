import './App.css';
import './index.css';
import { Suspense, lazy } from 'react';

const RemoteList = lazy(() => import('@remote_1/Remote'));
const RemoteView = lazy(() => import('@remote_2/Remote'));

const App = () => {
  return (
    <div className="content">
      <h1>Host of Module Federation!</h1>
      <div
        className="
          flex flex-col items-center justify-center p-2 m-5
          border-x-neutral-50 border-8 border-solid rounded-xl"
      >
        <Suspense fallback="Loading...">
          <RemoteList />
        </Suspense>
        <Suspense fallback="Loading...">
          <RemoteView />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
