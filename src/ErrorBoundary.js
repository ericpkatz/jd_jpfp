import React from 'react'
import ErrorComponent from './Error Component'

class ErrorBoundary extends React.Component{
  state = {hasError: false}

  static getDerivedStateFromError(error){
    return {hasError:true}
  }

  componentDidCatch(error, info){
    console.log(error, info)
  }

  render() {
    if(this.state.hasError){
      this.state.hasError = false
      return <ErrorComponent/>
    }
    return this.props.children
  }
}

export default ErrorBoundary