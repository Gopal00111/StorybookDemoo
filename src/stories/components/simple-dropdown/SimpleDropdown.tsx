import React, { FC, useState, useEffect } from 'react'
import { Select, Form } from 'antd'
import { FormProps } from 'antd/lib/form'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import './SimpleDropdown.module.less'

export interface SimpleDropdownProps extends FormProps {
  label?: string
  value?: string | undefined
  tooltip?: string
  dropdown?: boolean
  placeHolderText?: string
  defaultValue?: string
  size?: SizeType
  dropdownItems: Array<string>
  onSelected(val): void
}

export const SimpleDropdown: FC<SimpleDropdownProps> = ({
  label,
  dropdown,
  value,
  dropdownItems,
  tooltip,
  placeHolderText = '',
  size = 'middle',
  defaultValue,
  onSelected,
  ...props
}) => {
  const [form] = Form.useForm()
  const [selected, setSelected] = useState<string | undefined>('')

  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleClickSelect = (value) => {
    setSelected(value)
    onSelected(value)
  }

  return (
    <div className="simpleDropdownContainer">
      <Form form={form} layout="vertical" {...props}>
        <Form.Item label={label ? label : ''} tooltip={tooltip ? tooltip : ''}>
          <Select
            value={selected === '' ? undefined : selected}
            onSelect={(value) => handleClickSelect(value)}
            size={size}
            defaultValue={defaultValue}
            placeholder={placeHolderText}
          >
            {dropdownItems?.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SimpleDropdown
