import { Flex, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface TableToolbarProps {
  defaultSearch?: string
  searchable?: boolean
  onSearch?: (keyword: string) => void
}

const TableToolbar = (props: TableToolbarProps) => {
  const { searchable, defaultSearch, onSearch } = props
  const [value, setValue] = useState(defaultSearch)

  useEffect(() => {
    if (!value) setValue(defaultSearch)
  }, [defaultSearch])

  useEffect(() => {
    if (onSearch) onSearch(String(value).toLowerCase())
  }, [value])

  return (
    <Flex>
      {searchable && (
        <Input
          placeholder='Search...'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      )}
    </Flex>
  )
}

export default TableToolbar