import * as React from 'react'
import { hot } from 'react-hot-loader'
import Counter from './Counter'

const App = () => (
  <section className='section'>
    <div className='container'>
      <h1 className='title'>
        Hello World!
      </h1>
      <p className='subtitle'>
        <Counter />
      </p>
    </div>
  </section>
)

export default hot(module)(App)
