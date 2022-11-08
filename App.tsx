import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'jotai';

import Loader from './app/Loader';
import Navigator from './app/Navigator';

const App = () => {
  return (
    <Provider>
      <Suspense fallback={<Loader />}>
        <Navigator />
      </Suspense>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
