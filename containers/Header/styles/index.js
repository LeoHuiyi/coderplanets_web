import styled from 'styled-components'
import ReactSVG from 'react-svg'
import { Button } from 'antd'

import { theme } from '../../../utils'

export const Header = styled.div`
  height: 33px;
  display: flex;
  flex-direction: row;
  background: ${props =>
    props.fixed ? theme('header.fixed') : theme('header.bg')};

  border-bottom: ${theme('header.spliter')};
  align-items: center;
  padding: 0 4vw;
  margin-left: ${props => props.leftOffset};
  transition: all 0.2s;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(234, 234, 234, 0.28);
`
// margin-left: ${props => (props.offsetLeft ? '180px' : '0')};

export const RouterWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
  margin-top: 1px;
`

export const MiniMapWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 4vw;
`

export const CommunityLogo = styled(ReactSVG)`
  width: 26px;
  height: 26px;
  margin-right: 25px;
  display: block;
  margin-bottom: 2px;
`

/*
border-bottom: 2px solid;
border-bottom-color: ${props =>
  props.active ? theme('paper.article_title') : theme('header.fixed')};
*/

// ${theme('paper.article_title', props)}
// border-bottom: ${props => (props.active ? '2px solid tomato' : '')};

export const MiniTab = styled.div`
  border-bottom: ${props => (props.active ? '3px solid' : '')};
  border-bottom-color: ${props =>
    props.active ? theme('paper.article_title') : ''};
  padding-bottom: ${props => (props.active ? '2px' : '5px')};
  padding-right: 5px;
  padding-left: 5px;
  margin-right: 6px;
  color: ${props =>
    props.active ? theme('header.tab_active') : theme('header.tab_others')};
  cursor: pointer;
`
// color: ${theme('paper.article_brief')};

// color: ${theme('header.fg')};
// margin-right: 25px;
export const Admin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const DividerIcon = styled(ReactSVG)`
  fill: ${theme('header.fg')};
  width: 18px;
  height: 20px;
  margin-top: 2px;
  margin-left: 3px;
  margin-right: 3px;
`

export const StateButton = styled(Button)`
  width: 80px;
  display: flex;
`
export const StateIcon = styled(ReactSVG)`
  width: 12px;
  height: 100%;
  cursor: pointer;
  margin-right: 8px;
  margin-top: 2px;
`

export const HeaderIcon = styled(ReactSVG)`
  fill: ${theme('header.fg')};
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-top: 2px;
  margin-right: 12px;
`

export const Operations = styled.div`
  display: flex;
`

export const Search = styled.div`
  color: ${theme('header.fg')};
`

export const Notification = styled.div``
export const User = styled.div`
  margin-right: 20px;
`
