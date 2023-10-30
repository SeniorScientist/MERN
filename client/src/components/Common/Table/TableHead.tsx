import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import  { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { ColumnConfig } from "@/components/Common/Table"
import cx from "classnames"
import styles from './styles.module.css'

interface TableHeadProps {
  columns: ColumnConfig[]
  selectable?: boolean
  sortKey?: string
  order?: 'asc' | 'desc' | string
  onChangeSortedBy?: (key: string, order: 'asc' | 'desc') => void
}

const TableHead = (props: TableHeadProps) => {
  const { columns, sortKey = '', order, selectable = true, onChangeSortedBy } = props
  
  const onClickColHead = (e: ColumnConfig) => {
    if (!e.sortable || !onChangeSortedBy) return
    if (sortKey === e.key) {
      onChangeSortedBy(e.key, order === 'asc' ? 'desc' : 'asc')
    } else {
      onChangeSortedBy(e.key, 'asc')
    }
  }

  return (
    <Flex borderTop='1px' borderBottom='1px' borderColor='silver'>
      {selectable && (
        <Box w='50px' />
      )}
      {columns.map(e => {
        const isSorting = sortKey.includes(e.key)
        return (
          <Flex
            key={e.key}
            className={cx(
              styles.colHead,
              isSorting && styles.active,
              e.sortable&& styles.clickable,
            )}
            flex={e.flex || 1}
            alignItems='center'
            px='5px'
            py='10px'
            gap='5px'
            onClick={() => onClickColHead(e)}
          >
            <Text fontSize='14px' fontWeight='semibold'>{e.label}</Text>
            {e.sortable && <Icon color='orange' fontSize='18px' as={isSorting && order === 'asc' ? AiOutlineSortAscending : AiOutlineSortDescending} />}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default TableHead