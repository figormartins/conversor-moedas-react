import React, { Component } from 'react'
import './Conversor.css'

export default class Conversor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      moedaA_valor: "",
      moedaB_valor: 0,
    }

    this.converter = this.converter.bind(this);
  }

  converter() {
   if (!isNaN(this.state.moedaA_valor) && (this.state.moedaA_valor.length > 0)) {
    let de_para = `${this.props.moedaA}_${this.props.moedaB}`
    let url     = `https://free.currencyconverterapi.com/api/v6/convert?q=${de_para}&compact=ultra&apiKey=a0401889414c183f721a`
  
     fetch(url)
       .then(res => {
         return res.json()
       })
       .then(json=>{
         let cotacao      = parseFloat(json[de_para])
         let moedaB_valor = parseInt((parseFloat(this.state.moedaA_valor) * cotacao) * 100) / 100
         this.setState({moedaB_valor})
       })
   }
   else
     alert("Digite um valor numérico!")


  }

  render() {
    return(
      <div className="conversor">
        <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
        <input type="text" placeholder="Digite um valor" className="entrada" onChange={(event) => {this.setState({moedaA_valor:event.target.value})} } ></input>
        <input type="button" className="botao"value="Converter" onClick={this.converter}></input>
        <h2 className="valor-convertido">Valor convertido: {this.state.moedaB_valor}</h2>
      </div>
    )
  }
}