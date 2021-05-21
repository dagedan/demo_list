import React from 'react'
import {createGate} from 'effector-react'

export const Gate = createGate('gate with props')

const GateTest = () => {
  return <section>
    <Gate foo="bar" />
  </section>
}
export default GateTest
