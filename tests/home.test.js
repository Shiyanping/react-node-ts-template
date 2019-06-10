import React from 'react'
import {
  render,
  cleanup,
  fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { App } from './index'

afterEach(cleanup)

describe(`test the app component`, () => {
  it(`should render a list with 2 items by default`, () => {
    const { getByTestId } = render(<App />)
    const [ul, footer] = [
      getByTestId('todoList'),
      getByTestId('footer')
    ]

    expect(ul.children.length).toBe(2)
    expect(footer.textContent).toContain('1 / 2')
  })

  it(`should change footer text on toggle of list item`, () => {
    const { getByTestId } = render(<App />)
    const [ul, footer] = [
      getByTestId('todoList'),
      getByTestId('footer')
    ]

    fireEvent.click(ul.firstChild)
    expect(footer.textContent).toContain('2 / 2')
    fireEvent.click(ul.children[1])
    expect(footer.textContent).toContain('1 / 2')
  })
})
