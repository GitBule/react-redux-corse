import React, { Component } from 'react'
import logo from './logo.svg';
import './css/App.css';
import Stock from './components/stock/Stock';


export class App extends Component {

  constructor(props) {
    super(props)
    this.state = { listaStock: []}
    console.log(`1g) il costruttore crea la prima istanza Genitore`)
  }

  // -------MOUNTING CREAZIONE ----------
  componentDidMount() {
    const stock = [

      {
        nome: 'APPL',
        valore: 200
      },
      {
        nome: 'GOOG',
        valore: 350
      }
    ]
    this.setState({listaStock: stock})
  }

  // --------UPDATE AGGIORNAMENTO--------

  // static getDerivedStaeFromProps(np,ns) {
  //   return null
  // }

  // componentDidUpdate() {
  //   console.log(`4g) DidUpdate padre ${this.state.nome}`)
  // }
  aggiornoStock = (e) => {
    e.preventDefault()
    const stock1 = [

      {
        nome: 'AMZ',
        valore: 250
      },
      {
        nome: 'MICROSOFT',
        valore: 750
      },
      {
        nome: 'APPL',
        valore: 1299
      }
    ]
    this.setState({ listaStock:stock1 })
  }
  render() {
    console.log(`2g) Genitore Render`)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Applicazione Stock Exchange - <a href='/#' onClick={this.aggiornoStock} > Top guadagno Aggiorno</a>
          </p>
          {this.state.listaStock.map(el => <Stock dati = {el}/>)}
        </header>
      </div>

    )
  }
}

export default App

