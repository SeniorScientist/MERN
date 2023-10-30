import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface TablePaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChanged: (page: number) => void
}

const TablePagination = (props: TablePaginationProps) => {
  const { page, total, pageSize, onPageChanged } = props

  const totalPage = useMemo(() => Math.ceil(total/pageSize), [total])

  return (
    <Flex alignItems='center' gap='10px'>
      <Text fontSize='14px' fontWeight='medium'>Page {page} of {totalPage}</Text>
      <IconButton
        aria-label='prev'
        variant='outline'
        onClick={() => onPageChanged(page - 1)}
        disabled={page <= 1}
        icon={<Icon as={MdChevronLeft} />}
      />
      <IconButton
        aria-label='next'
        variant='outline'
        onClick={() => onPageChanged(page + 1)}
        disabled={page >= totalPage}
        icon={<Icon as={MdChevronRight}
      />}
      />
    </Flex>
  )
}

export default TablePagination