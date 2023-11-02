import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react'
import  { AiOutlineBorder, AiFillCheckSquare } from 'react-icons/ai'
import { ColumnConfig } from "@/components/Common/Table"

interface TableRowProps {
  columns: ColumnConfig[]
  selectable?: boolean
  selected?: boolean
  onSelected?: (row: any,) => void
  itemData: any
  handleClick: (row: any) => void
}

const TableRow = (props: TableRowProps) => {
  const { itemData, columns, selectable = true, selected = false, onSelected, handleClick } = props

  return (
    <Flex>
      {selectable && (
        <Center w='50px'>
          <Icon
            cursor='pointer'
            width='30px'
            fontSize='18px'
            as={selected ? AiFillCheckSquare : AiOutlineBorder }
            onClick={() => onSelected && onSelected(itemData)}
          />
        </Center>
      )}
      {columns.map(e => {
        return (
          <Box key={e.key} flex={e.flex || 1} alignItems='center' px='5px' py='10px' cursor='pointer' onClick={e => handleClick(itemData)} overflow='hidden'>
            {e.render
              ? e.render(itemData)
              : <Text wordBreak='normal' textOverflow='ellipsis'>{itemData[e.key]}</Text>
            }
          </Box>
        )
      })}
    </Flex>
  )
}

export default TableRow