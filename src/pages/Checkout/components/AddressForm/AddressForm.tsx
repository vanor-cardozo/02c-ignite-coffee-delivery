import React, { useContext } from 'react'
import { MapPinLine } from 'phosphor-react'
import { FormDiv, TextDiv, TitleAndSubtitleLocation } from './styles'
import cep from 'cep-promise'

import { CoffeeContext } from '../../../../context/CoffeeContext'

export function AddressForm() {
  const { customerAddress, setCustomerAddress } = useContext(CoffeeContext)

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepNumber = e.target.value
    setCustomerAddress({ ...customerAddress, customerCep: cepNumber })
    if (cepNumber.length === 8) {
      searchAddress(cepNumber)
    }
  }

  function searchAddress(cepNumber: string) {
    setCustomerAddress({
      ...customerAddress,
      customerCep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
    })
    cep(cepNumber).then((res) => {
      setCustomerAddress({
        ...customerAddress,
        customerCep: res.cep,
        state: res.state,
        city: res.city,
        neighborhood: res.neighborhood,
        street: res.street,
      })
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerAddress({ ...customerAddress, [name]: value })
  }

  return (
    <FormDiv>
      <TitleAndSubtitleLocation>
        <MapPinLine size={22} />
        <TextDiv>
          <h5>Endereço de Entrega</h5>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </TextDiv>
      </TitleAndSubtitleLocation>
      <form>
        <label id="cep">
          <input
            type="text"
            id="cep"
            name="customerCep"
            placeholder="CEP"
            onChange={handleCepChange}
            maxLength={8}
            value={customerAddress.customerCep}
            required
          />
        </label>
        <label id="street">
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Rua"
            onChange={handleInputChange}
            value={customerAddress.street}
            required
          />
        </label>
        <label id="number">
          <input
            type="text"
            id="number"
            name="number"
            placeholder="Número"
            onChange={handleInputChange}
            value={customerAddress.number}
            required
          />
        </label>
        <label id="complement">
          <input
            type="text"
            id="complement"
            name="complement"
            placeholder="Complemento"
            onChange={handleInputChange}
            value={customerAddress.complement}
          />
        </label>
        <label id="neighborhood">
          <input
            type="text"
            id="neighborhood"
            name="neighborhood"
            placeholder="Bairro"
            onChange={handleInputChange}
            value={customerAddress.neighborhood}
            required
          />
        </label>
        <label id="city">
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Cidade"
            onChange={handleInputChange}
            value={customerAddress.city}
            required
          />
        </label>
        <label id="state">
          <input
            type="text"
            id="state"
            name="state"
            placeholder="Estado"
            onChange={handleInputChange}
            value={customerAddress.state}
            required
          />
        </label>
      </form>
    </FormDiv>
  )
}
