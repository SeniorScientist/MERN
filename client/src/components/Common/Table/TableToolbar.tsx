import { Button, Flex, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface TableToolbarProps {
  defaultSearch?: string
  searchable?: boolean
  removable?: boolean
  onSearch?: (keyword: string) => void
  onCreate?: () => void
  onDelete?: () => void
}

const TableToolbar = (props: TableToolbarProps) => {
  const { searchable, defaultSearch, removable = false, onSearch, onCreate, onDelete } = props
  const [value, setValue] = useState(defaultSearch)

  useEffect(() => {
    if (!value) setValue(defaultSearch)
  }, [defaultSearch])

  useEffect(() => {
    if (onSearch) onSearch(String(value).toLowerCase())
  }, [value])

  return (
    <Flex flexDir="row" justifyContent="end" width="100%">
      {searchable && (
        <Input
          placeholder='Search...'
          value={value}
          onChange={e => setValue(e.target.value)}
          width="initial"
        />
      )}
      <Button onClick={onCreate} background="blue.500">Create</Button>
      {
        removable && (
          <Button onClick={onDelete} marginLeft="3" background="red.500">Delete</Button>
        )
      }
    </Flex>
  )
}

export default TableToolbar