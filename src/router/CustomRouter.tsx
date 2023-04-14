import React from 'react'
import { Route } from 'react-router-dom'
import ErrorBoundary from '../screens/ErrorBoundary'

export default function CustomRoute({ children, component, render, ...props }: any) {
  return (
    <ErrorBoundary>
      <Route {...props}>
        {(routeProps: string) => {
          if (typeof children === 'function') {
            return children(routeProps)
          }

          if (!routeProps.match) {
            return null
          }

          if (children) {
            return children
          }
          if (component) {
            return React.createElement(component, routeProps)
          }

          if (render) {
            return render(routeProps)
          }

          return null
        }}
      </Route>
    </ErrorBoundary>
  )
}
