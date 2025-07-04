import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('renders the main title', () => {
    render(<Header />)
    expect(screen.getByText('Lawrence AI')).not.toBeNull()
  })
})
