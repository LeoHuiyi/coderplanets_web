import styled from 'styled-components'
import { setLightness, setSaturation, opacify } from 'polished'

import { theme } from '../../../utils'

// visibility: ${props => (props.active === props.name ? 'visible' : 'hidden')};

export const Hidder = styled.div`
  display: ${props => (props.active === props.name ? 'block' : 'none')};
`

export const Wrapper = styled.div`
  margin: 30px;
  width: 95.5%;
  height: 70%;
  min-height: 70vh;
  background: ${theme('content.bg')};
  color: ${theme('font')};
  border-radius: 6px;
  padding: 1em 6em;
  padding-top: 1.5em;
  @media (max-width: 1400px) {
    padding: 1em 2em;
  }
  @media (max-width: 1200px) {
    padding: 1em 1em;
  }
`

export const CategoryWrapper = styled.div`
  display: flex;
  width: 100%;
`

export const Category = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  margin-right: 3em;
  margin-bottom: 3em;
  background: ${props => props.bg};
`

export const CheatsheetItem = styled.div`
  width: 100px;
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  height: 30px;
  justify-content: center;
  border-radius: 4px;
  background-color: ${props => opacify(0.01, setSaturation(0.1, props.fg))};
`
export const Entry = styled.div`
  font-size: 1.2em;
  text-align: center;
  color: ${props => setLightness(0.52, setSaturation(0.2, props.fg))};

  &:hover {
    cursor: pointer;
    color: ${props => setLightness(0.6, setSaturation(0.3, props.fg))};
  }
`

export const Divider = styled.div`
  border-bottom: 1px solid grey;
  margin: 2em 0;
`
