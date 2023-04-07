import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react'

import s from './SuperPagination.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: OptionType[]
  onChangeOption?: (option: number) => void
}

type OptionType = {
  id: number
  value: string
}

export const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map(o => (
        <option id={'option-' + o.id} className={s.option} key={o.id} value={o.id}>
          {o.value}
        </option>
      ))
    : [] // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeOption?.(Number(e.currentTarget.value))
    onChange && onChange(e)
  }

  const finalSelectClassName = s.select + (className ? ' ' + className : '')

  return (
    <div className={s.pagination_select}>
      <select className={finalSelectClassName} onChange={onChangeCallback} {...restProps}>
        {mappedOptions}
      </select>
    </div>
  )
}
