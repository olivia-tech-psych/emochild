import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('should render the title', () => {
    render(<Home />)
    expect(screen.getByText('Emotionagotchi')).toBeInTheDocument()
  })

  it('should render the description', () => {
    render(<Home />)
    expect(screen.getByText('Your emotional wellness companion')).toBeInTheDocument()
  })
})
