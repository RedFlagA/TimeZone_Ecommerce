import React from 'react'
export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo)
  }
  goToHome = () => {
    this.props.children.props.history.push('/')
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>Error</div>
      )
    }
    return this.props.children
  }
}
