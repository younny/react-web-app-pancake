import React from 'react'
import axios from 'axios'
import App, { doIncrement, doDecrement } from './App'
import Counter from './component/Counter'

describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 }
    const newState = doIncrement(state)

    expect(newState.counter).to.equal(1)
  })

  it('should decrement the counter in state', () => {
    const state = { counter: 1 }
    const newState = doDecrement(state)

    expect(newState.counter).to.equal(0)
  })
})

// shallow() : Compnent Test
describe('App Component', () => {
  const result = [3, 5, 9]
  const promise = Promise.resolve(result)

  before(() => {
    sinon.stub(axios, 'get').withArgs('http://').returns(promise)
  })

  after(() => {
    axios.get.restore()
  })

  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Counter)).to.have.length(1)
  })

  it('increments the counter', () => {
    const wrapper = shallow(<App />)

    wrapper.setState({ counter: 0 })
    wrapper.find('button').at(0).simulate('click')

    expect(wrapper.state().counter).to.equal(1)
  })

  it('decrements the counter', () => {
    const wrapper = shallow(<App />)

    wrapper.setState({ counter: 0 })
    wrapper.find('button').at(1).simulate('click')

    expect(wrapper.state().counter).to.equal(-1)
  })

  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount')

    const wrapper = mount(<App />)
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true)
  })

  it('fetches async counters', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.state().asyncCounters).to.equal(null)

    promise.then(() => {
      expect(wrapper.state().asyncCounters).to.equal(result)
    })
  })
})
