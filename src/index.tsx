import * as React from "react"
import { render } from "react-dom"
import { Checkbox, TableCell, TableHead, TableRow } from '@material-ui/core';
import TestGraphQL from "./CardComponent"

interface ContentProps {
  boxes: Array<boolean>
}

interface FormProps {
  value: String
  showResults: boolean
  tickers: Array<String>
}

//Form component will allow a user to add a new ticker
class Form extends React.Component <{},FormProps> {

    constructor(props: any) {
      super(props);
      this.state = {
        value: '',
        showResults: false,
        tickers: [],
      }
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
      this.setState((state) => ({
        value: event.target.value,
        showResults: false
      }));
    }

    handleClick(event: boolean) {
      this.setState((state) => ({
        tickers: event ? this.state.tickers.concat(this.state.value) : [],
      }));
    }

    handleSearchExecution() {
      this.setState({showResults: true})
    }

    stageTickers() {
      const rows: Array<JSX.Element> = []
      this.state.tickers.map((ticker) => {
          rows.push(<TableRow>
            <TableCell> {ticker} </TableCell>
            <TableCell> <Checkbox/> </TableCell>
          </TableRow>)
          
      })
      return rows
    }

    render() {
      return(
        <div>
        <form>
          <label>
            {"Ticker: "} 
            <input type="text" onChange= {this.handleChange}/>
          </label>
        </form>
        <button onClick={() => this.handleClick(true)} > {"Stage Ticker"} </button>
        <TableHead>
          <TableRow>
            <TableCell> Ticker </TableCell>
            <TableCell> Current Price </TableCell>  
          </TableRow>
            {this.stageTickers()}  
        </TableHead>
        <button onClick={() => this.handleSearchExecution()} > {"Execute Results"} </button>
        <button onClick={() => this.handleClick(false)} > {"Clear Results"} </button>
        {this.state.showResults ? <TestGraphQL tickers={this.state.tickers}/> : null}

        
        </div>
      )
    }

}

//Content prop has the list of properties a user wants to see for a ticker.
// This does not share state with the form component
class Content extends React.Component <{},ContentProps>  {

  constructor(props: ContentProps) {
    super(props)
    this.state = {
      boxes: [],
    }
  }

  handleClick(i: number) {
    const opposite = !this.state.boxes[i]
    const first = this.state.boxes.slice(0,i)
    first.push(opposite)
    const updated = first.concat(this.state.boxes.slice(i+1))
    this.setState((state) => ({
      boxes: updated
    }));
  }

  createBox() {
    this.setState((state) => ({
      boxes: this.state.boxes.concat(false)
    }));

  }

  deleteSelected() {
    this.setState((state) => ({
      boxes: this.state.boxes.filter((checked) => !checked)
    }))
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.createBox()}> {"Add CheckBox"} </button> 
          {
            this.state.boxes.map((box,i) => {
              return (<p> {"Test"} <Checkbox key={i.toString()} 
              checked ={box} onClick={() => this.handleClick(i)} /> </p>)
            })
          }
        </div>
        <div>
          <button onClick={() => this.deleteSelected()}> {"Delete Selected Checkboxes"} </button>

        </div>


        </div>      
    )
  }

}

const rootElement = document.getElementById("root")
render(<Form/>, rootElement)