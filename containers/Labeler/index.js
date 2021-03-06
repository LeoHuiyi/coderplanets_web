/*
 *
 * Labeler
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import R from 'ramda'

import withGuardian from 'components/HOC/withGuardian'
import Maybe from 'components/Maybe'
import Popover from 'components/Popover'
import { LABEL_POOL } from 'config'

import { makeDebugger, storePlug, uid } from 'utils'
import Options from './Options'
import Selected from './Selected'
import { Wrapper, LabelItem, LabelIcon, Title, PopHint } from './styles'

import * as logic from './logic'
/* eslint-disable-next-line */
const debug = makeDebugger('C:Labeler')

const trans = {
  default: '标签',
  city: '城市',
  salary: '月薪',
  exp: '经验',
  education: '学历',
  finance: '融资',
  scale: '规模',
  field: '领域',
}

class LabelerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { uniqId: uid.gen() }

    const { labeler, label, multi, selected } = props
    const { uniqId } = this.state

    const options = { label, multi, selected }
    logic.init(labeler, uniqId, options)
  }

  componentWillUnmount() {
    const { uniqId } = this.state
    logic.uninit(uniqId)
  }

  onTagSelect(uniqId, item) {
    const { selected, onTagSelect, onTagUnselect } = this.props
    // const { labelsData, labelEntriesData } = labeler
    logic.onOptionSelect(uniqId, item)
    const tagId = logic.getSelectedTagId(item)
    if (R.contains(item, selected)) {
      onTagUnselect(tagId)
    } else {
      onTagSelect(tagId)
    }
  }

  render() {
    const { uniqId } = this.state
    const { labeler, label, readOnly } = this.props
    /* const { tagsData, popVisible, selectedData, labelEntriesData } = labeler */
    const { labelEntriesData } = labeler
    const targetIndex = R.findIndex(R.propEq('uniqId', uniqId))(
      labelEntriesData
    )

    const { tags, popVisible, selected } = labelEntriesData[targetIndex] || {}
    const tagsList = R.reject(t => t.title === 'refined', tags)

    return (
      <Wrapper>
        <Maybe test={readOnly}>
          <Popover
            content={<PopHint>{trans[label]}</PopHint>}
            placement="bottom"
            trigger="hover"
          >
            <LabelItem>
              <LabelIcon src={LABEL_POOL[label].iconSrc} />
              <Title>
                <Selected items={selected} readOnly={readOnly} />
              </Title>
            </LabelItem>
          </Popover>
        </Maybe>
        <Maybe test={!readOnly}>
          {targetIndex >= 0 ? (
            <Popover
              content={
                <Options
                  label={label}
                  items={tagsList}
                  selected={selected}
                  onOptionSelect={this.onTagSelect.bind(this, uniqId)}
                />
              }
              placement="right"
              trigger="click"
              visible={popVisible}
              onVisibleChange={logic.onVisibleChange.bind(this, uniqId)}
            >
              <LabelItem>
                <LabelIcon src={LABEL_POOL[label].iconSrc} />
                <Title>
                  {trans[label]}
                  <Selected items={selected} readOnly={readOnly} />
                </Title>
              </LabelItem>
            </Popover>
          ) : (
            <div />
          )}
        </Maybe>
      </Wrapper>
    )
  }
}

LabelerContainer.propTypes = {
  label: PropTypes.oneOf([
    'default',
    'salary',
    'city',
    'exp',
    'education',
    'finance',
    'scale',
    'field',
  ]),
  labeler: PropTypes.any,
  multi: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.string),

  onTagSelect: PropTypes.func,
  onTagUnselect: PropTypes.func,
  readOnly: PropTypes.bool,
}

LabelerContainer.defaultProps = {
  label: 'default',
  labeler: {},
  multi: false,
  selected: [],
  readOnly: false,
  onTagSelect: debug,
  onTagUnselect: debug,
}

export default withGuardian(
  inject(storePlug('labeler'))(observer(LabelerContainer))
)
