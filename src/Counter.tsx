import * as React from 'react'

class Counter extends React.Component<{}, { count: number }> {
  private interval: number

  constructor(props: any) {
    super(props)
    this.state = { count: 0 }
  }

  public componentDidMount() {
    this.interval = window.setInterval(
      () => this.setState((prevState) => ({ count: prevState.count + 1 })),
      200,
    )
  }

  public componentWillUnmount() {
    clearInterval(this.interval)
  }

  public render() {
    return <span>{this.state.count} - {this.generateString1()} - {this.generateString2()}</span>
  }

  private generateString1() {
    return '1'
  }

  private generateString2 = ()  => {
    return '1'
  }
}

export default Counter
