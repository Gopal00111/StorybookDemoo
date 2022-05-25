import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Input as AntInput } from 'antd'
import {
  FrownOutlined,
  CheckOutlined,
  SearchOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import  './SearchTags.module.less'

export interface SearchTagsProps {
  title?: string
  description?: string
  items: Array<string>
  selectedItems?: Array<string>
  itemType?: string
  noItemText?: string
  selectAllText?: string
  onChange?: (items: Array<string>) => void
}

export interface SearchTag {
  title: string
  selected: boolean
}

export const SearchTags: FC<SearchTagsProps> = ({
  title,
  description,
  items,
  itemType,
  selectedItems = [],
  noItemText,
  selectAllText,
  onChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTagItems, setSearchTagItems] = useState<SearchTag[]>([])
  const [showSelectAll, setShowSelectAll] = useState(true)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const handleSelectAll = () => {
    setSearchTagItems(
      searchTagItems.map((item) => ({ ...item, selected: true }))
    )
    setShowSelectAll(false)
    onChange?.(searchTagItems.map((item) => item.title))
  }
  const handleSelectItem = (tag:any) => {
    const items = [...searchTagItems]
    let showAll = true
    for (const item of items) {
      if (item.title === tag.title) {
        item.selected = !item.selected
      }
      showAll = showAll && item.selected
    }
    setSearchTagItems([...items])
    setShowSelectAll(!showAll)
    onChange?.(
      items.filter((item) => item.selected === true).map((item) => item.title)
    )
  }
  const handleSearch = (e:any) => {
    const query = e.target.value
    setSearchTagItems(
      items
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .map((tag) => ({ title: tag, selected: false }))
    )
    setShowSearchInput(false)
  }
  useEffect(() => {
    setSearchTagItems(
      items.map((item) => ({
        title: item,
        selected: selectedItems?.includes(item),
      }))
    )
  }, [items, selectedItems])
  return (
    <div className={"searchTags"}>
      {title && <h2>{title}</h2>}
      {description && <h3>{description}</h3>}
      {items.length > 0 && !showSearchInput && (
        <SearchOutlined
          style={{
            cursor: 'pointer',
            color: 'var(--light-grey-color)',
            fontSize: '16px',
            position: 'absolute',
            top: '4px',
            right: '0',
          }}
          onMouseOver={() => setShowSearchInput(true)}
        />
      )}
      {items.length > 0 && showSearchInput && (
        <div className={"searchInput"}>
          <AntInput
            prefix={<SearchOutlined style={{ fontSize: '16px' }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={(e) => handleSearch(e)}
            addonAfter={
              <CloseOutlined
                style={{ fontSize: '16px', cursor: 'pointer' }}
                onClick={() => setShowSearchInput(false)}
              />
            }
          />
        </div>
      )}
      <div className={"searchTagItems"}>
        {items.length === 0 && (
          <div className={"noItems"}>
            <FrownOutlined
              style={{
                color: 'var(--light-grey-color)',
                fontSize: '24px',
                marginBottom: '1rem',
              }}
            />
            <p>{noItemText || 'No item found'}</p>
          </div>
        )}
        {items.length > 0 && (
          <div className={"searchTagItemsContainer"}>
            {showSelectAll && (
              <span
                className={"searchTagItem"}
                onClick={() => handleSelectAll()}
              >
                {selectAllText || 'Select All'}
              </span>
            )}
            {searchTagItems.map((item) => (
              <span
                className={
                  item.selected
                    ? classNames("selectedTagItem", "searchTagItem")
                    : item.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      searchQuery !== ''
                    ? classNames("possibleItem", "searchTagItem")
                    : "searchTagItem"
                }
                key={item.title}
                onClick={() => handleSelectItem(item)}
              >
                {item.selected && <CheckOutlined />} {item.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchTags
